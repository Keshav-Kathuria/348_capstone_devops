import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

function Employees() {

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const fetchEmployees = async () => {

    try {

      const response = await api.get("/employees");

      setEmployees(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const fetchDepartments = async () => {

    try {

      const response = await api.get("/departments");

      setDepartments(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchEmployees();

    fetchDepartments();

  }, []);

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this employee?")) return;

    try {

      await api.delete(`/employees/${id}`);

      fetchEmployees();

      if (selectedEmployee?.id === id) {

        setSelectedEmployee(null);

      }

    } catch (error) {

      console.error(error);

    }

  };

  const handleEdit = (employee) => {

    setSelectedEmployee(employee);

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  };

  const filteredEmployees = useMemo(() => {

    return employees.filter((employee) => {

      const matchesSearch = employee.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDepartment =

        departmentFilter === "" ||

        employee.department === departmentFilter;

      return matchesSearch && matchesDepartment;

    });

  }, [employees, search, departmentFilter]);

  // Export Excel
  const exportExcel = async () => {

    try {

      const response = await api.get(

        "/employees/export/excel",

        {

          responseType: "blob"

        }

      );

      const url = window.URL.createObjectURL(

        new Blob([response.data])

      );

      const link = document.createElement("a");

      link.href = url;

      link.download = "employees.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(error);

      alert("Unable to export Excel.");

    }

  };

  // Export CSV
  const exportCSV = async () => {

    try {

      const response = await api.get(

        "/employees/export/csv",

        {

          responseType: "blob"

        }

      );

      const url = window.URL.createObjectURL(

        new Blob([response.data])

      );

      const link = document.createElement("a");

      link.href = url;

      link.download = "employees.csv";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(error);

      alert("Unable to export CSV.");

    }

  };

  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="mb-0">

          Employees

        </h2>

        <div>

          <button

            className="btn btn-success me-2"

            onClick={exportExcel}

          >

            📊 Export Excel

          </button>

          <button

            className="btn btn-secondary"

            onClick={exportCSV}

          >

            📄 Export CSV

          </button>

        </div>

      </div>

      <EmployeeForm
        fetchEmployees={fetchEmployees}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
      />

      <div className="card shadow mb-4">

        <div className="card-body">

          <div className="row">

            <div className="col-md-6">

              <input

                type="text"

                className="form-control"

                placeholder="Search Employee..."

                value={search}

                onChange={(e) =>

                  setSearch(e.target.value)

                }

              />

            </div>

            <div className="col-md-6">

              <select

                className="form-select"

                value={departmentFilter}

                onChange={(e) =>

                  setDepartmentFilter(e.target.value)

                }

              >

                <option value="">

                  All Departments

                </option>

                {departments.map((department) => (

                  <option

                    key={department.id}

                    value={department.department_name}

                  >

                    {department.department_name}

                  </option>

                ))}

              </select>

            </div>

          </div>

        </div>

      </div>

      <EmployeeTable

        employees={filteredEmployees}

        handleDelete={handleDelete}

        handleEdit={handleEdit}

      />

    </div>

  );

}

export default Employees;