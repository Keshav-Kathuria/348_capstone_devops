import { useEffect, useState } from "react";
import api from "../services/api";

function DepartmentForm({
  fetchDepartments,
  selectedDepartment,
  setSelectedDepartment,
}) {
  const [departmentName, setDepartmentName] = useState("");

  useEffect(() => {
    if (selectedDepartment) {
      setDepartmentName(selectedDepartment.department_name);
    }
  }, [selectedDepartment]);

  const resetForm = () => {
    setDepartmentName("");
    setSelectedDepartment(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedDepartment) {
        await api.put(
          `/departments/${selectedDepartment.id}`,
          {
            department_name: departmentName,
          }
        );

        alert("Department Updated Successfully");
      } else {
        await api.post("/departments", {
          department_name: departmentName,
        });

        alert("Department Added Successfully");
      }

      fetchDepartments();

      resetForm();
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
          {selectedDepartment
            ? "Edit Department"
            : "Add Department"}
        </h4>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">

            <label className="form-label">
              Department Name
            </label>

            <input
              className="form-control"
              type="text"
              value={departmentName}
              onChange={(e) =>
                setDepartmentName(e.target.value)
              }
              required
            />

          </div>

          <button className="btn btn-success me-2">
            {selectedDepartment
              ? "Update Department"
              : "Save Department"}
          </button>

          {selectedDepartment && (
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

export default DepartmentForm;