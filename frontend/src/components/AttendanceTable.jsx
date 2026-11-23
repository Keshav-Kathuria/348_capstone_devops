function AttendanceTable({ attendance }) {
    return (
      <div className="card shadow">
  
        <div className="card-header bg-dark text-white">
  
          <h4 className="mb-0">
            Attendance History
          </h4>
  
        </div>
  
        <div className="card-body">
  
          <div className="table-responsive">
  
            <table className="table table-bordered table-hover">
  
              <thead className="table-primary">
  
                <tr>
  
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Status</th>
  
                </tr>
  
              </thead>
  
              <tbody>
  
                {attendance.length === 0 ? (
  
                  <tr>
  
                    <td
                      colSpan="4"
                      className="text-center"
                    >
  
                      No Attendance Found
  
                    </td>
  
                  </tr>
  
                ) : (
  
                  attendance.map((record) => (
  
                    <tr key={record.id}>
  
                      <td>{record.id}</td>
  
                      <td>{record.employee}</td>
  
                      <td>{record.date}</td>
  
                      <td>
  
                        <span
                          className={
                            record.status === "Present"
                              ? "badge bg-success"
                              : "badge bg-danger"
                          }
                        >
  
                          {record.status}
  
                        </span>
  
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
  
  export default AttendanceTable;