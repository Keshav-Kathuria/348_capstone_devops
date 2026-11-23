import {
    FaCheck,
    FaTimes,
    FaTrash,
  } from "react-icons/fa";
  
  function LeaveTable({
    leaves,
    handleStatus,
    handleDelete,
  }) {
    return (
      <div className="card shadow">
  
        <div className="card-header bg-dark text-white">
  
          <h4 className="mb-0">
            Leave Requests
          </h4>
  
        </div>
  
        <div className="card-body">
  
          <div className="table-responsive">
  
            <table className="table table-bordered table-hover align-middle">
  
              <thead className="table-primary">
  
                <tr>
  
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th width="180">Actions</th>
  
                </tr>
  
              </thead>
  
              <tbody>
  
                {leaves.length === 0 ? (
  
                  <tr>
  
                    <td
                      colSpan="8"
                      className="text-center text-muted py-4"
                    >
  
                      No Leave Requests Found
  
                    </td>
  
                  </tr>
  
                ) : (
  
                  leaves.map((leave) => (
  
                    <tr key={leave.id}>
  
                      <td>{leave.id}</td>
  
                      <td>{leave.employee}</td>
  
                      <td>{leave.leave_type}</td>
  
                      <td>{leave.start_date}</td>
  
                      <td>{leave.end_date}</td>
  
                      <td>{leave.reason}</td>
  
                      <td>
  
                        <span
                          className={
                            leave.status === "Approved"
                              ? "badge bg-success"
                              : leave.status === "Rejected"
                              ? "badge bg-danger"
                              : "badge bg-warning text-dark"
                          }
                        >
  
                          {leave.status}
  
                        </span>
  
                      </td>
  
                      <td>
  
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            handleStatus(
                              leave.id,
                              "Approved"
                            )
                          }
                          title="Approve"
                        >
  
                          <FaCheck />
  
                        </button>
  
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            handleStatus(
                              leave.id,
                              "Rejected"
                            )
                          }
                          title="Reject"
                        >
  
                          <FaTimes />
  
                        </button>
  
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(
                              leave.id
                            )
                          }
                          title="Delete"
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
  
  export default LeaveTable;