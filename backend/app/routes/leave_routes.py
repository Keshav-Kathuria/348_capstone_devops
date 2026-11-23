from flask import Blueprint, request, jsonify
from .. import db
from ..models import Leave, Employee

leave_bp = Blueprint("leave_bp", __name__)


# ----------------------------
# Apply Leave
# ----------------------------
@leave_bp.route("/leave", methods=["POST"])
def apply_leave():

    data = request.get_json()

    employee = db.session.get(Employee, data["employee_id"])

    if employee is None:
        return jsonify({
            "message": "Employee not found"
        }), 404

    leave = Leave(
        employee_id=data["employee_id"],
        leave_type=data["leave_type"],
        start_date=data["start_date"],
        end_date=data["end_date"],
        reason=data["reason"],
        status="Pending"
    )

    db.session.add(leave)
    db.session.commit()

    return jsonify({
        "message": "Leave applied successfully"
    }), 201


# ----------------------------
# Get All Leave Requests
# ----------------------------
@leave_bp.route("/leave", methods=["GET"])
def get_leave():

    leaves = Leave.query.all()

    result = []

    for leave in leaves:

        result.append({

            "id": leave.id,
            "employee": leave.employee.name,
            "leave_type": leave.leave_type,
            "start_date": leave.start_date,
            "end_date": leave.end_date,
            "reason": leave.reason,
            "status": leave.status

        })

    return jsonify(result)


# ----------------------------
# Update Leave Status
# ----------------------------
@leave_bp.route("/leave/<int:id>", methods=["PUT"])
def update_leave(id):

    leave = db.session.get(Leave, id)

    if leave is None:
        return jsonify({
            "message": "Leave request not found"
        }), 404

    data = request.get_json()

    leave.status = data["status"]

    db.session.commit()

    return jsonify({
        "message": "Leave status updated successfully"
    })


# ----------------------------
# Delete Leave
# ----------------------------
@leave_bp.route("/leave/<int:id>", methods=["DELETE"])
def delete_leave(id):

    leave = db.session.get(Leave, id)

    if leave is None:
        return jsonify({
            "message": "Leave request not found"
        }), 404

    db.session.delete(leave)
    db.session.commit()

    return jsonify({
        "message": "Leave deleted successfully"
    })