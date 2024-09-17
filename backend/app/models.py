from . import db
from wtforms import Form, StringField, PasswordField, validators

class User(db.Model):
    __table_args__ = {'extend_existing': True}  # Allow modifications to the existing table
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

class RegisterForm(Form):
    username = StringField('Username', [validators.InputRequired()])
    password = PasswordField('Password', [validators.InputRequired()])

class LoginForm(Form):
    username = StringField('Username', [validators.InputRequired()])
    password = PasswordField('Password', [validators.InputRequired()])

# Association Table
caregiver_child = db.Table('caregiver_child',
    db.Column('caregiver_id', db.Integer, db.ForeignKey('caregiver.id'), primary_key=True),
    db.Column('child_id', db.Integer, db.ForeignKey('child.id'), primary_key=True)
) 

class Child(db.Model):
    __tablename__ = 'child'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=True)  
    year = db.Column(db.Integer, nullable=False)

    # Relationships
    enrollments = db.relationship('Enrollment', backref='child_enrollment', lazy=True)
    attendance_records = db.relationship('Attendance', backref='child_attendance', lazy=True, overlaps="child,attendance_records")
    financials = db.relationship('Financial', backref='child_financial', lazy=True)
    caregivers = db.relationship('Caregiver', secondary='caregiver_child', backref='child_caregivers', lazy=True, overlaps="caregivers,child_caregivers")

class Caregiver(db.Model):
    __tablename__ = 'caregiver'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)  # A caregiver can be associated with multiple children
    status = db.Column(db.String(20), nullable=False)

    # Relationships
    children = db.relationship('Child', secondary='caregiver_child', backref='caregiver_children', lazy=True, overlaps="children,child_caregivers")

class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('child.id'))
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), nullable=False)

    # Relationships
    child = db.relationship('Child', backref='attendance', lazy=True, overlaps="child_attendance,attendance_records")

class Financial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('child.id'), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(255))

    # Relationships
    child = db.relationship('Child', backref='financial', lazy=True)

class Enrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('child.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    program = db.Column(db.String(50), nullable=False)

    # Relationships
    child = db.relationship('Child', backref='enrollment', lazy=True)
