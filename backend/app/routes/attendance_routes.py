from flask import Blueprint, request, jsonify
from datetime import datetime

from .. import db
from ..models import Attendance, Employee

attendance_bp = Blueprint("attendance_bp", __name__)


@attendance_bp.route("/attendance", methods=["POST"])
def mark_attendance():

    data = request.get_json()

    employee_id = data["employee_id"]

    date = datetime.strptime(
        data["date"],
        "%Y-%m-%d"
    ).date()

    status = data["status"]

    employee = Employee.query.get(employee_id)

    if not employee:
        return jsonify({
            "message": "Employee not found"
        }), 404

    existing = Attendance.query.filter_by(
        employee_id=employee_id,
        date=date
    ).first()

    if existing:
        return jsonify({
            "message": "Attendance already marked"
        }), 400

    attendance = Attendance(
        employee_id=employee_id,
        date=date,
        status=status
    )

    db.session.add(attendance)
    db.session.commit()

    return jsonify({
        "message": "Attendance marked successfully"
    }), 201


@attendance_bp.route("/attendance", methods=["GET"])
def get_attendance():

    records = Attendance.query.all()

    result = []

    for record in records:

        result.append({

            "id": record.id,

            "employee": record.employee.name,

            "date": record.date.strftime("%Y-%m-%d"),

            "status": record.status

        })

    return jsonify(result)