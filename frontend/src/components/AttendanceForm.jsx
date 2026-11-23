import { useEffect, useState } from "react";
import {
    markAttendance,
    getEmployees,
} from "../services/attendanceApi";

function AttendanceForm({ loadAttendance }) {

    const [employees, setEmployees] = useState([]);

    const [formData, setFormData] = useState({

        employee_id: "",

        date: "",

        status: "Present"

    });

    useEffect(() => {

        fetchEmployees();

    }, []);

    const fetchEmployees = async () => {
        try {
    
            const data = await getEmployees();
    
            console.log("Employees:", data);
            console.log("Is Array:", Array.isArray(data));
            console.log("Length:", data.length);
    
            setEmployees(data);
    
        } catch (error) {
    
            console.log("Attendance Error:", error);
    
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

            await markAttendance(formData);

            alert("Attendance marked successfully.");

            setFormData({

                employee_id: "",

                date: "",

                status: "Present"

            });

            loadAttendance();

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

                    Mark Attendance

                </h4>

            </div>

            <div className="card-body">

                <form onSubmit={handleSubmit}>

                    <div className="row">

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

                                Date

                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-4">

                            <label className="form-label">

                                Status

                            </label>

                            <select
                                className="form-select"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >

                                <option>

                                    Present

                                </option>

                                <option>

                                    Absent

                                </option>

                            </select>

                        </div>

                    </div>

                    <button
                        className="btn btn-success mt-4"
                    >

                        Mark Attendance

                    </button>

                </form>

            </div>

        </div>

    );

}

export default AttendanceForm;