from flask import Blueprint, request, jsonify
from .. import db
from ..models import Department

department_bp = Blueprint("department_bp", __name__)


# ---------------------------
# Add Department
# ---------------------------
@department_bp.route("/departments", methods=["POST"])
def add_department():

    data = request.get_json()

    department = Department(
        department_name=data["department_name"]
    )

    db.session.add(department)
    db.session.commit()

    return jsonify({
        "message": "Department added successfully"
    }), 201


# ---------------------------
# Get All Departments
# ---------------------------
@department_bp.route("/departments", methods=["GET"])
def get_departments():

    departments = Department.query.all()

    result = []

    for dept in departments:

        result.append({
            "id": dept.id,
            "department_name": dept.department_name
        })

    return jsonify(result)


# ---------------------------
# Get Single Department
# ---------------------------
@department_bp.route("/departments/<int:id>", methods=["GET"])
def get_department(id):

    department = Department.query.get_or_404(id)

    return jsonify({
        "id": department.id,
        "department_name": department.department_name
    })


# ---------------------------
# Update Department
# ---------------------------
@department_bp.route("/departments/<int:id>", methods=["PUT"])
def update_department(id):

    department = Department.query.get_or_404(id)

    data = request.get_json()

    department.department_name = data["department_name"]

    db.session.commit()

    return jsonify({
        "message": "Department updated successfully"
    })


# ---------------------------
# Delete Department
# ---------------------------
@department_bp.route("/departments/<int:id>", methods=["DELETE"])
def delete_department(id):

    department = Department.query.get_or_404(id)

    if len(department.employees) > 0:

        return jsonify({
            "message": "Cannot delete department because employees are assigned."
        }), 400

    db.session.delete(department)

    db.session.commit()

    return jsonify({
        "message": "Department deleted successfully"
    })