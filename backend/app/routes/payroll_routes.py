from flask import Blueprint, request, jsonify, send_file

from .. import db
from ..models import Payroll, Employee
from ..utils.pdf_generator import generate_payslip

payroll_bp = Blueprint("payroll_bp", __name__)


# ------------------------------------
# Generate Payroll
# ------------------------------------
@payroll_bp.route("/payroll", methods=["POST"])
def generate_payroll():

    data = request.get_json()

    employee = db.session.get(Employee, data["employee_id"])

    if employee is None:

        return jsonify({
            "message": "Employee not found"
        }), 404

    basic_salary = float(data["basic_salary"])
    bonus = float(data.get("bonus", 0))
    deductions = float(data.get("deductions", 0))

    net_salary = basic_salary + bonus - deductions

    payroll = Payroll(
        employee_id=data["employee_id"],
        month=data["month"],
        year=data["year"],
        basic_salary=basic_salary,
        bonus=bonus,
        deductions=deductions,
        net_salary=net_salary
    )

    db.session.add(payroll)
    db.session.commit()

    return jsonify({
        "message": "Payroll generated successfully"
    }), 201


# ------------------------------------
# Get All Payrolls
# ------------------------------------
@payroll_bp.route("/payroll", methods=["GET"])
def get_payrolls():

    payrolls = Payroll.query.all()

    result = []

    for payroll in payrolls:

        result.append({

            "id": payroll.id,

            "employee": payroll.employee.name,

            "month": payroll.month,

            "year": payroll.year,

            "basic_salary": payroll.basic_salary,

            "bonus": payroll.bonus,

            "deductions": payroll.deductions,

            "net_salary": payroll.net_salary

        })

    return jsonify(result)


# ------------------------------------
# Get Payroll By ID
# ------------------------------------
@payroll_bp.route("/payroll/<int:id>", methods=["GET"])
def get_payroll(id):

    payroll = db.session.get(Payroll, id)

    if payroll is None:

        return jsonify({
            "message": "Payroll not found"
        }), 404

    return jsonify({

        "id": payroll.id,

        "employee": payroll.employee.name,

        "month": payroll.month,

        "year": payroll.year,

        "basic_salary": payroll.basic_salary,

        "bonus": payroll.bonus,

        "deductions": payroll.deductions,

        "net_salary": payroll.net_salary

    })


# ------------------------------------
# Delete Payroll
# ------------------------------------
@payroll_bp.route("/payroll/<int:id>", methods=["DELETE"])
def delete_payroll(id):

    payroll = db.session.get(Payroll, id)

    if payroll is None:

        return jsonify({
            "message": "Payroll not found"
        }), 404

    db.session.delete(payroll)
    db.session.commit()

    return jsonify({
        "message": "Payroll deleted successfully"
    })


# ------------------------------------
# Download Payslip PDF
# ------------------------------------
@payroll_bp.route("/payroll/<int:id>/pdf", methods=["GET"])
def download_payslip(id):

    payroll = db.session.get(Payroll, id)

    if payroll is None:

        return jsonify({
            "message": "Payroll not found"
        }), 404

    pdf = generate_payslip(payroll)

    return send_file(

        pdf,

        as_attachment=True,

        download_name=f"Payslip_{payroll.employee.name}_{payroll.month}.pdf",

        mimetype="application/pdf"

    )