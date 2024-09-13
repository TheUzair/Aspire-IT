import pandas as pd
from sqlalchemy import case, func
from prophet import Prophet
from .models import Enrollment, Attendance
from . import db  # Use the db instance from __init__.py

def get_enrollment_data():
    # Query to fetch enrollment data from the database
    data = db.session.query(Enrollment.date, db.func.count(Enrollment.id)).group_by(Enrollment.date).all()
    df = pd.DataFrame(data, columns=['ds', 'y'])  # Prophet expects 'ds' for dates and 'y' for values
    return df

def predict_enrollments():
    # Fetch and preprocess data
    data = get_enrollment_data()

    # Initialize and train the Prophet model
    model = Prophet()
    model.fit(data)

    # Make predictions for the next 6 months
    future = model.make_future_dataframe(periods=6, freq='M')
    forecast = model.predict(future)

    return forecast[['ds', 'yhat']].tail(6)  # Returning the next 6 months' predictions

def preprocess_attendance_data():
    # Query to get the number of absences per date (status 0 represents absence)
    attendance = db.session.query(
        Attendance.date,
        func.sum(1 - Attendance.status).label('absences')
    ).group_by(Attendance.date).all()
    
    # Print raw data from the query
    print("Raw attendance data:", attendance)
    
    # Convert to a DataFrame for Prophet
    data = pd.DataFrame(attendance, columns=['ds', 'y'])  # 'ds' for date, 'y' for absences
    print("Processed DataFrame:", data)
    
    # Check for NaN values and handle them
    data.dropna(inplace=True)  # Remove any rows with NaN values
    print("Cleaned DataFrame:", data)
    
    return data


# Train a model to forecast absences
def predict_attendance_trends():
    # Fetch preprocessed attendance data
    data = preprocess_attendance_data()

    # Create and train the Prophet model
    model = Prophet()
    model.fit(data)

    # Make future predictions (e.g., next 6 months)
    future = model.make_future_dataframe(periods=6, freq='M')
    forecast = model.predict(future)

    # Return the forecasted absences
    return forecast[['ds', 'yhat']].tail(6)  # 'ds' is the date, 'yhat' is the predicted number of absences

