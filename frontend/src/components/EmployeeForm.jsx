import { useEffect, useState } from "react";
import api from "../services/api";

function EmployeeForm({
  fetchEmployees,
  selectedEmployee,
  setSelectedEmployee,
}) {
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    salary: "",
    department_id: "",
    role: "Employee",
    password: "",
  });

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        name: selectedEmployee.name || "",
        email: selectedEmployee.email || "",
        phone: selectedEmployee.phone || "",
        designation: selectedEmployee.designation || "",
        salary: selectedEmployee.salary || "",
        department_id: selectedEmployee.department_id || "",
        role: selectedEmployee.role || "Employee",
        password: "",
      });
    }
  }, [selectedEmployee]);

  const loadDepartments = async () => {
    try {
      const response = await api.get("/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      designation: "",
      salary: "",
      department_id: "",
      role: "Employee",
      password: "",
    });

    setSelectedEmployee(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedEmployee) {
        await api.put(`/employees/${selectedEmployee.id}`, formData);
        alert("Employee Updated Successfully");
      } else {
        await api.post("/employees", formData);
        alert("Employee Added Successfully");
      }

      fetchEmployees();
      resetForm();
    } catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
          {selectedEmployee ? "Edit Employee" : "Add Employee"}
        </h4>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">Full Name</label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>

              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Designation</label>

              <input
                type="text"
                className="form-control"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Salary</label>

              <input
                type="number"
                className="form-control"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Department</label>

              <select
                className="form-select"
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>

                {departments.map((department) => (
                  <option
                    key={department.id}
                    value={department.id}
                  >
                    {department.department_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Role</label>

              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Employee">Employee</option>
                <option value="HR">HR</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {!selectedEmployee && (
              <div className="col-md-6 mb-3">
                <label className="form-label">Password</label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

          </div>

          <button className="btn btn-success me-2" type="submit">
            {selectedEmployee ? "Update Employee" : "Save Employee"}
          </button>

          {selectedEmployee && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;