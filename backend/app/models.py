from . import db


class Department(db.Model):
    __tablename__ = "departments"

    id = db.Column(db.Integer, primary_key=True)

    department_name = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    employees = db.relationship(
        "Employee",
        backref="department",
        lazy=True
    )


class Employee(db.Model):
    __tablename__ = "employees"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    phone = db.Column(
        db.String(20),
        nullable=False
    )

    designation = db.Column(
        db.String(100),
        nullable=False
    )

    salary = db.Column(
        db.Float,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    role = db.Column(
        db.String(30),
        default="Employee"
    )

    # NEW FIELD
    profile_image = db.Column(
        db.String(255),
        nullable=True
    )

    department_id = db.Column(
        db.Integer,
        db.ForeignKey("departments.id"),
        nullable=False
    )


class Attendance(db.Model):
    __tablename__ = "attendance"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    employee_id = db.Column(
        db.Integer,
        db.ForeignKey("employees.id"),
        nullable=False
    )

    date = db.Column(
        db.Date,
        nullable=False
    )

    status = db.Column(
        db.String(20),
        nullable=False
    )

    employee = db.relationship(
        "Employee",
        backref="attendance_records"
    )


class Leave(db.Model):
    __tablename__ = "leaves"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    employee_id = db.Column(
        db.Integer,
        db.ForeignKey("employees.id"),
        nullable=False
    )

    leave_type = db.Column(
        db.String(50),
        nullable=False
    )

    start_date = db.Column(
        db.String(20),
        nullable=False
    )

    end_date = db.Column(
        db.String(20),
        nullable=False
    )

    reason = db.Column(
        db.Text,
        nullable=False
    )

    status = db.Column(
        db.String(20),
        default="Pending"
    )

    employee = db.relationship(
        "Employee",
        backref="leave_records"
    )


class Payroll(db.Model):
    __tablename__ = "payroll"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    employee_id = db.Column(
        db.Integer,
        db.ForeignKey("employees.id"),
        nullable=False
    )

    month = db.Column(
        db.String(20),
        nullable=False
    )

    year = db.Column(
        db.Integer,
        nullable=False
    )

    basic_salary = db.Column(
        db.Float,
        nullable=False
    )

    bonus = db.Column(
        db.Float,
        default=0
    )

    deductions = db.Column(
        db.Float,
        default=0
    )

    net_salary = db.Column(
        db.Float,
        nullable=False
    )

    employee = db.relationship(
        "Employee",
        backref="payrolls",
        lazy=True
    )


class Admin(db.Model):
    __tablename__ = "admins"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )