import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roles = [] }) {

    const token = localStorage.getItem("token");

    const employee = JSON.parse(
        localStorage.getItem("employee")
    );

    if (!token) {

        return <Navigate to="/login" replace />;

    }

    if (
        roles.length > 0 &&
        !roles.includes(employee?.role)
    ) {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default ProtectedRoute;