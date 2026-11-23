import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function EmployeeDetails() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);

  const fetchEmployee = async () => {
    try {
      const response = await api.get(`/employees/${id}`);

      setEmployee(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  if (!employee) {
    return (
      <div className="text-center mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h3 className="mb-0">
            Employee Details
          </h3>

        </div>

        <div className="card-body">

          <div className="row">

            <div className="col-md-6">

              <p>
                <strong>ID:</strong> {employee.id}
              </p>

              <p>
                <strong>Name:</strong> {employee.name}
              </p>

              <p>
                <strong>Email:</strong> {employee.email}
              </p>

              <p>
                <strong>Phone:</strong> {employee.phone}
              </p>

            </div>

            <div className="col-md-6">

              <p>
                <strong>Designation:</strong>{" "}
                {employee.designation}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {employee.department}
              </p>

              <p>
                <strong>Salary:</strong> ₹{" "}
                {employee.salary.toLocaleString()}
              </p>

            </div>

          </div>

          <hr />

          <Link
            to="/employees"
            className="btn btn-secondary"
          >
            ← Back to Employees
          </Link>

        </div>

      </div>

    </div>
  );
}

export default EmployeeDetails;