import { NavLink } from "react-router-dom";

import {
    FaTachometerAlt,
    FaUsers,
    FaBuilding,
    FaClipboardCheck,
    FaCalendarAlt,
    FaMoneyCheckAlt,
    FaUserCircle,
    FaUserShield
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {

    const employee = JSON.parse(localStorage.getItem("employee"));

    const role = employee?.role;

    return (

        <aside className="sidebar">

            <div className="sidebar-header">

                <div className="logo">

                    <FaUserShield />

                </div>

                <div>

                    <h4>HRMS</h4>

                    <small>Employee Portal</small>

                </div>

            </div>

            <ul className="sidebar-menu">

                <li>

                    <NavLink to="/" end>

                        <FaTachometerAlt />

                        Dashboard

                    </NavLink>

                </li>

                {(role === "Admin" || role === "HR") && (

                    <>

                        <li>

                            <NavLink to="/employees">

                                <FaUsers />

                                Employees

                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/attendance">

                                <FaClipboardCheck />

                                Attendance

                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/leave">

                                <FaCalendarAlt />

                                Leave

                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/payroll">

                                <FaMoneyCheckAlt />

                                Payroll

                            </NavLink>

                        </li>

                    </>

                )}

                {role === "Admin" && (

                    <li>

                        <NavLink to="/departments">

                            <FaBuilding />

                            Departments

                        </NavLink>

                    </li>

                )}

                {role === "Employee" && (

                    <>

                        <li>

                            <NavLink to="/profile">

                                <FaUserCircle />

                                My Profile

                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/attendance">

                                <FaClipboardCheck />

                                My Attendance

                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/leave">

                                <FaCalendarAlt />

                                My Leave

                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/payroll">

                                <FaMoneyCheckAlt />

                                My Payroll

                            </NavLink>

                        </li>

                    </>

                )}

            </ul>

            <div className="sidebar-footer">

                <div className="profile-box">

                    <div className="avatar">

                        {employee?.name?.charAt(0).toUpperCase()}

                    </div>

                    <div>

                        <strong>{employee?.name}</strong>

                        <small>{employee?.role}</small>

                    </div>

                </div>

            </div>

        </aside>

    );

}

export default Sidebar;