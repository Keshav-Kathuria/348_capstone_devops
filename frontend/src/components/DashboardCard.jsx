import React from "react";

function DashboardCard({
  title,
  value,
  icon,
  gradient,
  footer,
}) {
  return (
    <div className="col-xl-3 col-lg-6 col-md-6">

      <div className={`dashboard-card ${gradient}`}>

        {/* Background Glow */}
        <div className="dashboard-card-glow"></div>

        {/* Floating Icon */}
        <div className="dashboard-card-icon">
          {icon}
        </div>

        {/* Card Content */}
        <div className="dashboard-card-content">

          <span className="dashboard-card-title">
            {title}
          </span>

          <h2 className="dashboard-card-value">
            {value}
          </h2>

          <div className="dashboard-card-footer">
            {footer}
          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardCard;