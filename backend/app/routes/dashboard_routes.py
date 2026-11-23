from flask import Blueprint, jsonify
from sqlalchemy import func

from .. import db
from ..models import Employee, Department

dashboard_bp = Blueprint("dashboard_bp", __name__)


@dashboard_bp.route("/dashboard", methods=["GET"])
def dashboard():

    total_employees = Employee.query.count()

    total_departments = Department.query.count()

    total_salary = db.session.query(
        func.sum(Employee.salary)
    ).scalar() or 0

    average_salary = db.session.query(
        func.avg(Employee.salary)
    ).scalar() or 0

    return jsonify({
        "employees": total_employees,
        "departments": total_departments,
        "total_salary": total_salary,
        "average_salary": round(average_salary)
    })


@dashboard_bp.route("/dashboard/charts", methods=["GET"])
def dashboard_charts():

    department_data = (
        db.session.query(
            Department.department_name,
            func.count(Employee.id)
        )
        .outerjoin(Employee)
        .group_by(Department.id)
        .all()
    )

    chart_data = []

    for department, count in department_data:
        chart_data.append({
            "department": department,
            "employees": count
        })

    return jsonify(chart_data)