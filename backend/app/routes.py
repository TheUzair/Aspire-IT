from flask import Blueprint, jsonify, request
from .models import Child, Caregiver, Attendance, Financial, Enrollment, User
from .ml_model import predict_enrollments, predict_attendance_trends
from . import db, cache
from datetime import datetime, timedelta, timezone
from sqlalchemy import func
from flask_jwt_extended import jwt_required, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
import pandas as pd

api_bp = Blueprint('api', __name__)

# Cached by Redis
@api_bp.route('/children', methods=['GET'])
def manage_children():
    children_list = cache.get('children_list')
    if not children_list:
        children = Child.query.all()
        children_list = [{"id": child.id, "name": child.name, "age": child.age, "status": child.status} for child in children]
        cache.set('children_list', children_list, timeout=600)
    
    return jsonify(children_list)

@api_bp.route('/children', methods=['POST'])
def add_child():
    data = request.json
    new_child = Child(name=data['name'], age=data['age'], status=data['status'])
    db.session.add(new_child)
    db.session.commit()
    cache.delete('children_list')  # Invalidate cache
    return jsonify({"message": "Child added successfully"}), 201

@api_bp.route('/caregivers', methods=['GET'])
def manage_caregivers():
    caregivers_list = cache.get('caregivers_list')
    if not caregivers_list:
        caregivers = Caregiver.query.all()
        caregivers_list = [{"id": caregiver.id, "name": caregiver.name, "status": caregiver.status} for caregiver in caregivers]
        cache.set('caregivers_list', caregivers_list, timeout=600)
    
    return jsonify(caregivers_list)
   

@api_bp.route('/caregivers', methods=['POST'])
def add_caregiver():
    data = request.json
    new_caregiver = Caregiver(name=data['name'])
    db.session.add(new_caregiver)
    db.session.commit()
    cache.delete('caregivers_list')  # Invalidate cache
    return jsonify({"message": "Caregiver added successfully"}), 201

@api_bp.route('/attendance', methods=['GET'])
def manage_attendance():
    attendance_list = cache.get('attendance_list')
    if not attendance_list:
        attendance_records = Attendance.query.all()
        attendance_list = [{"id": record.id, "child_id": record.child_id, "date": record.date.isoformat(), "status": record.status} for record in attendance_records]
        cache.set('attendance_list', attendance_list, timeout=600)
    
    return jsonify(attendance_list)

@api_bp.route('/attendance', methods=['POST'])
def add_attendance():
    data = request.json
    new_record = Attendance(child_id=data['child_id'], date=data['date'], status=data['status'])
    db.session.add(new_record)
    db.session.commit()
    cache.delete('attendance_list')  # Invalidate cache
    return jsonify({"message": "Attendance record added successfully"}), 201

@api_bp.route('/financial', methods=['GET'])
def manage_financial():
    financial_list = cache.get('financial_list')
    if not financial_list:
        financial_records = Financial.query.all()
        financial_list = [
            {
                "id": record.id,
                "child_id": record.child_id,
                "amount": record.amount,
                "date": record.date.isoformat(),
                "description": record.description
            } for record in financial_records
        ]
        cache.set('financial_list', financial_list, timeout=600)
    
    return jsonify(financial_list)

@api_bp.route('/financial', methods=['POST'])
def add_financial_record():
    data = request.json
    new_record = Financial(
        child_id=data['child_id'],
        amount=data['amount'],
        date=data['date'],
        description=data.get('description')
    )
    db.session.add(new_record)
    db.session.commit()
    cache.delete('financial_list')  # Invalidate cache
    return jsonify({"message": "Financial record added successfully"}), 201

@api_bp.route('/financial-summary', methods=['GET'])
def financial_summary():
    try:
        # Get the date range (last 30 days)
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=30)
        
        # Query the Financial table for records in the last 30 days
        financial_data = Financial.query.filter(Financial.date.between(start_date, end_date)).all()
        
        # Convert the query result to a list of dictionaries
        financial_data_list = [
            {
                'date': f.date,
                'amount': float(f.amount),
                'description': f.description
            }
            for f in financial_data
        ]
        
        # Convert the list of dictionaries to a Pandas DataFrame
        df = pd.DataFrame(financial_data_list)
        
        # Ensure the DataFrame is not empty
        if df.empty:
            return jsonify({"message": "No financial data found in the last 30 days"}), 404
        
        # Calculate total revenue
        total_revenue = df['amount'].sum()
        
        # Calculate total expenses (based on description)
        expense_categories = ['Medical expenses', 'Sports activities', 'Extra classes', 'Monthly fee', 'Field trip']
        df_expenses = df[df['description'].isin(expense_categories)]
        total_expenses = df_expenses['amount'].sum()
        
        # Calculate net income
        net_income = total_revenue - total_expenses
        
        # Calculate profit margin
        profit_margin = (net_income / total_revenue) * 100 if total_revenue != 0 else 0
        
        # Return the result as JSON
        return jsonify({
            "totalRevenue": int(total_revenue),
            "totalExpenses": int(total_expenses),
            "netIncome": int(net_income),
            "profitMargin": int(profit_margin)
        })

    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Routes without caching
@api_bp.route('/enrollment', methods=['GET'])
def manage_enrollment():
    enrollments = Enrollment.query.all()
    return jsonify([{"id": enrollment.id, "child_id": enrollment.child_id, "date": enrollment.date, "program": enrollment.program} for enrollment in enrollments])


@api_bp.route('/enrollment', methods=['POST'])
def add_enrollment():
    data = request.json
    new_enrollment = Enrollment(child_id=data['child_id'], date=data['date'], program=data['program'])
    db.session.add(new_enrollment)
    db.session.commit()
    return jsonify({"message": "Enrollment added successfully"}), 201


@api_bp.route('/enrollments-summary', methods=['GET'])
def enrollment_records():
    now = datetime.now(timezone.utc)
    start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    start_of_last_month = (start_of_month - timedelta(days=1)).replace(day=1)

    monthly_enrollments = db.session.query(
        func.DATE_FORMAT(Enrollment.date, '%Y-%m').label('month'),
        func.count().label('total_enrollments')
    ).group_by('month').all()

    new_enrollments_current_month = Enrollment.query.filter(
        Enrollment.date >= start_of_month
    ).count()

    new_enrollments_last_month = Enrollment.query.filter(
        Enrollment.date >= start_of_last_month,
        Enrollment.date < start_of_month
    ).count()

    formatted_enrollments = []
    for month, total_enrollments in monthly_enrollments:
        month_name = datetime.strptime(month, '%Y-%m').strftime('%B %Y')
        formatted_enrollments.append({
            "month": month_name,
            "total_enrollments": total_enrollments
        })

    return jsonify({
        "monthly_enrollments": formatted_enrollments,
        "new_enrollments_current_month": new_enrollments_current_month,
        "new_enrollments_last_month": new_enrollments_last_month
    })

# Helper function to get start and end of a week 
def get_week_range(date):
    start_of_week = date - timedelta(days=date.weekday())  # Monday
    end_of_week = start_of_week + timedelta(days=6)  # Sunday
    return start_of_week, end_of_week

def get_attendance_count(start_date, end_date):
    print(f"Fetching attendance between {start_date} and {end_date}")
    # Log the query result
    attendance_count = db.session.query(func.count(Attendance.id)).filter(
        Attendance.date >= start_date,
        Attendance.date <= end_date,
        Attendance.status.in_(['on-time', 'late attendance'])
    ).scalar()
    print(f"Attendance count: {attendance_count}")
    return attendance_count

@api_bp.route('/predict-attendance', methods=['GET'])
@cache.cached(timeout=600)  # Cache the result for 10 minutes
def predict_attendance_route():
    today = datetime.today()
    
    # Get current and last week's date ranges
    current_week_start, current_week_end = get_week_range(today)
    last_week_start, last_week_end = get_week_range(today - timedelta(weeks=1))
    
    # Get attendance counts
    current_week_attendance = get_attendance_count(current_week_start, current_week_end)
    last_week_attendance = get_attendance_count(last_week_start, last_week_end)
    
    ## Calculate increase or decrease in attendance
    if last_week_attendance == 0:
        change_percentage = "No data for last week"
    else:
        # Calculate percentage change and round it
        percentage_change = ((current_week_attendance - last_week_attendance) / last_week_attendance) * 100
        change_percentage = int(percentage_change)  # Round the percentage change to the nearest integer
    
    result = {
        "current_week_attendance": current_week_attendance,
        "last_week_attendance": last_week_attendance,
        "change_percentage": change_percentage
    }

    
    return jsonify(result)

@api_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "User already exists"}), 400
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully"}), 201

@api_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Bad credentials"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)

@api_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({"msg": "You are viewing a protected route!"})
