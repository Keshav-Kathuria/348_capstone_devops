from flask import Blueprint, request, jsonify, send_file
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity

from .. import db
from ..models import Employee, Attendance, Leave, Payroll

from ..exports.export_excel import export_employees_excel
from ..exports.export_csv import export_employees_csv

bcrypt = Bcrypt()

employee_bp = Blueprint("employee_bp", __name__)


# ============================================================
# ADD EMPLOYEE
# ============================================================

@employee_bp.route("/employees", methods=["POST"])
def add_employee():

    data = request.get_json()

    existing = Employee.query.filter_by(
        email=data["email"]
    ).first()

    if existing:
        return jsonify({
            "message": "Email already exists"
        }), 400

    hashed_password = bcrypt.generate_password_hash(
        data["password"]
    ).decode("utf-8")

    employee = Employee(
        name=data["name"],
        email=data["email"],
        phone=data["phone"],
        designation=data["designation"],
        salary=data["salary"],
        department_id=data["department_id"],
        password=hashed_password,
        role=data.get("role", "Employee")
    )

    db.session.add(employee)
    db.session.commit()

    return jsonify({
        "message": "Employee added successfully"
    }), 201


# ============================================================
# GET ALL EMPLOYEES
# ============================================================

@employee_bp.route("/employees", methods=["GET"])
def get_employees():

    employees = Employee.query.all()

    result = []

    for emp in employees:

        result.append({

            "id": emp.id,
            "name": emp.name,
            "email": emp.email,
            "phone": emp.phone,
            "designation": emp.designation,
            "salary": emp.salary,
            "department": emp.department.department_name,
            "department_id": emp.department_id,
            "role": emp.role

        })

    return jsonify(result)


# ============================================================
# PAGINATED EMPLOYEES
# ============================================================

@employee_bp.route("/employees/paginated", methods=["GET"])
def get_paginated_employees():

    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 5, type=int)

    employees = Employee.query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    result = []

    for emp in employees.items:

        result.append({

            "id": emp.id,
            "name": emp.name,
            "email": emp.email,
            "phone": emp.phone,
            "designation": emp.designation,
            "salary": emp.salary,
            "department": emp.department.department_name,
            "department_id": emp.department_id,
            "role": emp.role

        })

    return jsonify({

        "employees": result,
        "page": employees.page,
        "pages": employees.pages,
        "total": employees.total,
        "per_page": employees.per_page

    })


# ============================================================
# GET EMPLOYEE BY ID
# ============================================================

@employee_bp.route("/employees/<int:id>", methods=["GET"])
def get_employee(id):

    employee = db.session.get(Employee, id)

    if employee is None:

        return jsonify({
            "message": "Employee not found"
        }), 404

    return jsonify({

        "id": employee.id,
        "name": employee.name,
        "email": employee.email,
        "phone": employee.phone,
        "designation": employee.designation,
        "salary": employee.salary,
        "department": employee.department.department_name,
        "department_id": employee.department_id,
        "role": employee.role

    })


# ============================================================
# UPDATE EMPLOYEE
# ============================================================

@employee_bp.route("/employees/<int:id>", methods=["PUT"])
def update_employee(id):

    employee = db.session.get(Employee, id)

    if employee is None:

        return jsonify({
            "message": "Employee not found"
        }), 404

    data = request.get_json()

    employee.name = data["name"]
    employee.email = data["email"]
    employee.phone = data["phone"]
    employee.designation = data["designation"]
    employee.salary = data["salary"]
    employee.department_id = data["department_id"]
    employee.role = data.get("role", employee.role)

    if data.get("password"):

        employee.password = bcrypt.generate_password_hash(
            data["password"]
        ).decode("utf-8")

    db.session.commit()

    return jsonify({
        "message": "Employee updated successfully"
    })


# ============================================================
# DELETE EMPLOYEE
# ============================================================

@employee_bp.route("/employees/<int:id>", methods=["DELETE"])
def delete_employee(id):

    employee = db.session.get(Employee, id)

    if employee is None:

        return jsonify({
            "message": "Employee not found"
        }), 404

    db.session.delete(employee)
    db.session.commit()

    return jsonify({
        "message": "Employee deleted successfully"
    })

# ============================================================
# EXPORT EMPLOYEES TO EXCEL
# ============================================================

@employee_bp.route("/employees/export/excel", methods=["GET"])
def export_excel():

    employees = Employee.query.all()

    excel_file = export_employees_excel(employees)

    return send_file(
        excel_file,
        as_attachment=True,
        download_name="employees.xlsx",
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )


# ============================================================
# EXPORT EMPLOYEES TO CSV
# ============================================================

@employee_bp.route("/employees/export/csv", methods=["GET"])
def export_csv():

    employees = Employee.query.all()

    csv_file = export_employees_csv(employees)

    return send_file(
        csv_file,
        as_attachment=True,
        download_name="employees.csv",
        mimetype="text/csv"
    )


# ============================================================
# EMPLOYEE SELF SERVICE
# ============================================================


# ============================================================
# MY PROFILE
# ============================================================

@employee_bp.route("/employee/profile", methods=["GET"])
@jwt_required()
def my_profile():

    employee_id = int(get_jwt_identity())

    employee = db.session.get(Employee, employee_id)

    if employee is None:
        return jsonify({
            "message": "Employee not found"
        }), 404

    return jsonify({

        "id": employee.id,
        "name": employee.name,
        "email": employee.email,
        "phone": employee.phone,
        "designation": employee.designation,
        "salary": employee.salary,
        "department": employee.department.department_name,
        "department_id": employee.department_id,
        "role": employee.role,
        "profile_image": getattr(employee, "profile_image", None)

    })


# ============================================================
# MY ATTENDANCE
# ============================================================

@employee_bp.route("/employee/attendance", methods=["GET"])
@jwt_required()
def my_attendance():

    employee_id = int(get_jwt_identity())

    attendance = Attendance.query.filter_by(
        employee_id=employee_id
    ).all()

    result = []

    for record in attendance:

        result.append({

            "id": record.id,
            "date": str(record.date),
            "status": record.status

        })

    return jsonify(result)


# ============================================================
# MY LEAVES
# ============================================================

@employee_bp.route("/employee/leaves", methods=["GET"])
@jwt_required()
def my_leaves():

    employee_id = int(get_jwt_identity())

    leaves = Leave.query.filter_by(
        employee_id=employee_id
    ).all()

    result = []

    for leave in leaves:

        result.append({

            "id": leave.id,
            "leave_type": leave.leave_type,
            "start_date": leave.start_date,
            "end_date": leave.end_date,
            "reason": leave.reason,
            "status": leave.status

        })

    return jsonify(result)


# ============================================================
# MY PAYROLL
# ============================================================

@employee_bp.route("/employee/payroll", methods=["GET"])
@jwt_required()
def my_payroll():

    employee_id = int(get_jwt_identity())

    payrolls = Payroll.query.filter_by(
        employee_id=employee_id
    ).all()

    result = []

    for payroll in payrolls:

        result.append({

            "id": payroll.id,
            "month": payroll.month,
            "year": payroll.year,
            "basic_salary": payroll.basic_salary,
            "bonus": payroll.bonus,
            "deductions": payroll.deductions,
            "net_salary": payroll.net_salary

        })

    return jsonify(result)

import os
from werkzeug.utils import secure_filename


# ============================================================
# UPDATE MY PROFILE
# ============================================================

@employee_bp.route("/employee/profile", methods=["PUT"])
@jwt_required()
def update_my_profile():

    employee_id = int(get_jwt_identity())

    employee = db.session.get(Employee, employee_id)

    if employee is None:
        return jsonify({
            "message": "Employee not found"
        }), 404

    data = request.get_json()

    if "name" in data:
        employee.name = data["name"]

    if "phone" in data:
        employee.phone = data["phone"]

    if data.get("password"):

        employee.password = bcrypt.generate_password_hash(
            data["password"]
        ).decode("utf-8")

    db.session.commit()

    return jsonify({

        "message": "Profile updated successfully",

        "employee": {

            "id": employee.id,
            "name": employee.name,
            "email": employee.email,
            "phone": employee.phone,
            "designation": employee.designation,
            "salary": employee.salary,
            "department": employee.department.department_name,
            "department_id": employee.department_id,
            "role": employee.role,
            "profile_image": getattr(employee, "profile_image", None)

        }

    }), 200


# ============================================================
# UPLOAD PROFILE IMAGE
# ============================================================

UPLOAD_FOLDER = "static/uploads"

ALLOWED_EXTENSIONS = {
    "png",
    "jpg",
    "jpeg"
}


def allowed_file(filename):

    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )


@employee_bp.route("/employee/profile/upload", methods=["POST"])
@jwt_required()
def upload_profile_image():

    employee_id = int(get_jwt_identity())

    employee = db.session.get(Employee, employee_id)

    if employee is None:
        return jsonify({
            "message": "Employee not found"
        }), 404

    if "image" not in request.files:

        return jsonify({
            "message": "No image selected"
        }), 400

    image = request.files["image"]

    if image.filename == "":

        return jsonify({
            "message": "No image selected"
        }), 400

    if not allowed_file(image.filename):

        return jsonify({
            "message": "Only PNG, JPG and JPEG files are allowed"
        }), 400

    filename = secure_filename(
        f"{employee.id}_{image.filename}"
    )

    upload_path = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    os.makedirs(
        UPLOAD_FOLDER,
        exist_ok=True
    )

    image.save(upload_path)

    employee.profile_image = filename

    db.session.commit()

    return jsonify({

        "message": "Profile image uploaded successfully",

        "filename": filename

    }), 200