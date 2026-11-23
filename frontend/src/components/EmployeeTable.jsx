import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function EmployeeTable({
  employees,
  handleDelete,
  handleEdit,
}) {
  return (
    <div className="card shadow">
      <div className="card-header bg-dark text-white">
        <h4 className="mb-0">
          Employee List
        </h4>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Salary</th>
                <th width="160">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center text-muted py-4"
                  >
                    No employees found.
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>

                    <td>
                      <Link
                        to={`/employees/${employee.id}`}
                        className="text-decoration-none fw-bold"
                      >
                        {employee.name}
                      </Link>
                    </td>

                    <td>{employee.email}</td>

                    <td>{employee.phone}</td>

                    <td>{employee.designation}</td>

                    <td>{employee.department}</td>

                    <td>
                      ₹ {employee.salary.toLocaleString()}
                    </td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(employee)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTable;