import { useEffect, useState } from "react";
import api from "../services/api";
import EditProfileModal from "../components/ProfileModal";

function Profile() {

    const [employee, setEmployee] = useState(null);

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            setLoading(true);

            const response = await api.get("/employee/profile");

            setEmployee(response.data);

        }

        catch (error) {

            console.error(error);

            alert("Unable to load profile.");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "70vh" }}
            >

                <div className="spinner-border text-primary"></div>

            </div>

        );

    }

    if (!employee) {

        return (

            <div className="container mt-5">

                <div className="alert alert-danger">

                    Employee profile not found.

                </div>

            </div>

        );

    }

    return (

        <>
            <div className="container">

                <div className="card shadow-lg border-0">

                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">

                        <h3 className="mb-0">

                            My Profile

                        </h3>

                        <div>

                            <button
                                className="btn btn-warning me-2"
                                onClick={() => setShowModal(true)}
                            >

                                Edit Profile

                            </button>

                            <button
                                className="btn btn-light"
                                onClick={fetchProfile}
                            >

                                Refresh

                            </button>

                        </div>

                    </div>

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-4 text-center">

                                {employee.profile_image ? (

                                    <img
                                        src={`http://127.0.0.1:5000/static/uploads/${employee.profile_image}`}
                                        alt="Profile"
                                        className="rounded-circle border border-3 border-primary shadow"
                                        width="220"
                                        height="220"
                                        style={{
                                            objectFit: "cover"
                                        }}
                                    />

                                ) : (

                                    <img
                                        src="https://via.placeholder.com/220"
                                        alt="Profile"
                                        className="rounded-circle border border-3 border-secondary shadow"
                                    />

                                )}

                                <h3 className="mt-3">

                                    {employee.name}

                                </h3>

                                <span className="badge bg-success fs-6">

                                    {employee.role}

                                </span>

                            </div>

                            <div className="col-md-8">

                                <table className="table table-bordered table-striped">

                                    <tbody>

                                        <tr>

                                            <th width="35%">Employee ID</th>

                                            <td>{employee.id}</td>

                                        </tr>

                                        <tr>

                                            <th>Name</th>

                                            <td>{employee.name}</td>

                                        </tr>

                                        <tr>

                                            <th>Email</th>

                                            <td>{employee.email}</td>

                                        </tr>

                                        <tr>

                                            <th>Phone</th>

                                            <td>{employee.phone}</td>

                                        </tr>

                                        <tr>

                                            <th>Department</th>

                                            <td>{employee.department}</td>

                                        </tr>

                                        <tr>

                                            <th>Designation</th>

                                            <td>{employee.designation}</td>

                                        </tr>

                                        <tr>

                                            <th>Salary</th>

                                            <td>₹ {employee.salary}</td>

                                        </tr>

                                        <tr>

                                            <th>Role</th>

                                            <td>{employee.role}</td>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {showModal && (

                <EditProfileModal

                    employee={employee}

                    refreshProfile={fetchProfile}

                    onClose={() => setShowModal(false)}

                />

            )}

        </>

    );

}

export default Profile;