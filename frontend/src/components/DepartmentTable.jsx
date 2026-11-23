import { FaEdit, FaTrash } from "react-icons/fa";

function DepartmentTable({
  departments,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="card shadow">

      <div className="card-header bg-dark text-white">
        <h4 className="mb-0">
          Department List
        </h4>
      </div>

      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-hover table-bordered align-middle">

            <thead className="table-primary">

              <tr>

                <th>ID</th>
                <th>Department Name</th>
                <th width="150">Actions</th>

              </tr>

            </thead>

            <tbody>

              {departments.length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
                    className="text-center text-muted py-4"
                  >
                    No Departments Found.
                  </td>

                </tr>

              ) : (

                departments.map((department) => (

                  <tr key={department.id}>

                    <td>{department.id}</td>

                    <td>{department.department_name}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          handleEdit(department)
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(department.id)
                        }
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

export default DepartmentTable;