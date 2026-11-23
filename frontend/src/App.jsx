import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import EmployeeDetails from "./pages/EmployeeDetails";
import Departments from "./pages/Departments";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Payroll from "./pages/Payroll";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {

    const token = localStorage.getItem("token");

    return (

        <BrowserRouter>

            {token && <Navbar />}

            <div className="app-wrapper">

                {token && <Sidebar />}

                <main
                    className={`main-content ${
                        token ? "with-sidebar" : ""
                    }`}
                >

                    <Routes>

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/"
                            element={
                                <ProtectedRoute
                                    roles={["Admin", "HR", "Employee"]}
                                >
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/employees"
                            element={
                                <ProtectedRoute
                                    roles={["Admin", "HR"]}
                                >
                                    <Employees />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/employees/:id"
                            element={
                                <ProtectedRoute
                                    roles={["Admin", "HR", "Employee"]}
                                >
                                    <EmployeeDetails />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute
                                    roles={["Admin", "HR", "Employee"]}
                                >
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/departments"
                            element={
                                <ProtectedRoute
                                    roles={["Admin"]}
                                >
                                    <Departments />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/attendance"
                            element={
                                <ProtectedRoute
                                    roles={["Admin", "HR", "Employee"]}
                                >
                                    <Attendance />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/leave"
                            element={
                                <ProtectedRoute
                                    roles={["Admin", "HR", "Employee"]}
                                >
                                    <Leave />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/payroll"
                            element={
                                <ProtectedRoute
                                    roles={["Admin", "HR", "Employee"]}
                                >
                                    <Payroll />
                                </ProtectedRoute>
                            }
                        />

                    </Routes>

                </main>

            </div>

        </BrowserRouter>

    );

}

export default App;