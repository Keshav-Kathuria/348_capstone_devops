import { useEffect, useState } from "react";
import api from "../services/api";

import DepartmentForm from "../components/DepartmentForm";
import DepartmentTable from "../components/DepartmentTable";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Fetch Departments
  const fetchDepartments = async () => {
    try {
      const response = await api.get("/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Delete Department
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/departments/${id}`);

      alert("Department deleted successfully!");

      fetchDepartments();

      if (
        selectedDepartment &&
        selectedDepartment.id === id
      ) {
        setSelectedDepartment(null);
      }
    } catch (error) {
      console.error(error);

      alert(
        "Unable to delete department. It may have employees assigned."
      );
    }
  };

  // Edit Department
  const handleEdit = (department) => {
    setSelectedDepartment(department);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Departments
      </h2>

      <DepartmentForm
        fetchDepartments={fetchDepartments}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
      />

      <DepartmentTable
        departments={departments}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

    </div>
  );
}

export default Departments;