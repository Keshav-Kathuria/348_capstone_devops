import { FaMoon, FaSun, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <nav className="top-navbar">

            <div className="navbar-left">
                <h4>HRMS Dashboard</h4>
            </div>

            <div className="navbar-right">

                <button
                    className="theme-btn"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>

                <div className="user-info">
                    <FaUserCircle className="avatar" />

                    <div>
                        <h6>{user.name}</h6>
                        <small>{user.role}</small>
                    </div>
                </div>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </nav>
    );
}