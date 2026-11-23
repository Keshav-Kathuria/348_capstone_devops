import { useEffect, useState } from "react";
import {
    generatePayroll,
    getEmployees
} from "../services/payrollApi";

function PayrollForm({ loadPayrolls }) {

    const [employees, setEmployees] = useState([]);

    const [formData, setFormData] = useState({
        employee_id: "",
        month: "",
        year: new Date().getFullYear(),
        basic_salary: "",
        bonus: 0,
        deductions: 0
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
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await generatePayroll(formData);

            alert("Payroll generated successfully");

            setFormData({
                employee_id: "",
                month: "",
                year: new Date().getFullYear(),
                basic_salary: "",
                bonus: 0,
                deductions: 0
            });

            loadPayrolls();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Something went wrong."
            );

        }
    };

    return (

        <div className="card shadow mb-4">

            <div className="card-header bg-success text-white">

                <h4 className="mb-0">

                    Generate Payroll

                </h4>

            </div>

            <div className="card-body">

                <form onSubmit={handleSubmit}>

                    <div className="row g-3">

                        <div className="col-md-4">

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

                        <div className="col-md-4">

                            <label className="form-label">

                                Month

                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="month"
                                value={formData.month}
                                onChange={handleChange}
                                placeholder="July"
                                required
                            />

                        </div>

                        <div className="col-md-4">

                            <label className="form-label">

                                Year

                            </label>

                            <input
                                type="number"
                                className="form-control"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-4">

                            <label className="form-label">

                                Basic Salary

                            </label>

                            <input
                                type="number"
                                className="form-control"
                                name="basic_salary"
                                value={formData.basic_salary}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-4">

                            <label className="form-label">

                                Bonus

                            </label>

                            <input
                                type="number"
                                className="form-control"
                                name="bonus"
                                value={formData.bonus}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-md-4">

                            <label className="form-label">

                                Deductions

                            </label>

                            <input
                                type="number"
                                className="form-control"
                                name="deductions"
                                value={formData.deductions}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <button
                        className="btn btn-success mt-4"
                    >

                        Generate Payroll

                    </button>

                </form>

            </div>

        </div>

    );

}

export default PayrollForm;