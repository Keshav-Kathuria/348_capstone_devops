import { useEffect, useState } from "react";

import {
  applyLeave,
  getEmployees,
} from "../services/leaveApi";

function LeaveForm({ loadLeaves }) {
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employee_id: "",
    leave_type: "Sick Leave",
    start_date: "",
    end_date: "",
    reason: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await applyLeave(formData);

      alert("Leave applied successfully.");

      setFormData({
        employee_id: "",
        leave_type: "Sick Leave",
        start_date: "",
        end_date: "",
        reason: "",
      });

      loadLeaves();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  return (
    <div className="card shadow mb-4">

      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
          Apply Leave
        </h4>
      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Employee
              </label>

              <select
                className="form-select"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Employee
                </option>

                {employees.map((employee) => (
                  <option
                    key={employee.id}
                    value={employee.id}
                  >
                    {employee.name}
                  </option>
                ))}
              </select>

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Leave Type
              </label>

              <select
                className="form-select"
                name="leave_type"
                value={formData.leave_type}
                onChange={handleChange}
              >
                <option>Sick Leave</option>
                <option>Casual Leave</option>
                <option>Annual Leave</option>
                <option>Emergency Leave</option>
              </select>

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Start Date
              </label>

              <input
                type="date"
                className="form-control"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="row">

            <div className="col-md-4 mb-3">

              <label className="form-label">
                End Date
              </label>

              <input
                type="date"
                className="form-control"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-8 mb-3">

              <label className="form-label">
                Reason
              </label>

              <textarea
                className="form-control"
                rows="3"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <button
            className="btn btn-success"
            type="submit"
          >
            Apply Leave
          </button>

        </form>

      </div>

    </div>
  );
}

export default LeaveForm;