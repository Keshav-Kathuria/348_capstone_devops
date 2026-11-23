import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaChartLine,
  FaArrowUp,
  FaUserPlus,
  FaPlusCircle,
  FaCalendarCheck,
  FaMoneyCheckAlt,
} from "react-icons/fa";

import DashboardCard from "../components/DashboardCard";
import EmployeeBarChart from "../components/charts/EmployeeBarChart";
import DepartmentPieChart from "../components/charts/DepartmentPieChart";

import { getDashboardData } from "../services/dashboardApi";
import { getChartData } from "../services/chartApi";

function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    departments: 0,
    total_salary: 0,
    average_salary: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadDashboard();
    loadCharts();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardData();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCharts = async () => {
    try {
      const data = await getChartData();
      setChartData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-page">

      {/* Hero */}

      <div className="dashboard-hero">

        <div>

          <h1>👋 Welcome Back, Admin</h1>

          <p>
            Monitor employees, payroll, departments, attendance and
            organization performance from one centralized dashboard.
          </p>

        </div>

        <div className="dashboard-date">

          <span>Today</span>

          <h5>{today}</h5>

        </div>

      </div>

      {/* Statistics */}

      <div className="row g-4 mt-1">

        <DashboardCard
          title="Employees"
          value={stats.employees}
          icon={<FaUsers />}
          gradient="primary-gradient"
          footer="+12% This Month"
        />

        <DashboardCard
          title="Departments"
          value={stats.departments}
          icon={<FaBuilding />}
          gradient="success-gradient"
          footer="Updated Today"
        />

        <DashboardCard
          title="Total Salary"
          value={`₹ ${stats.total_salary.toLocaleString()}`}
          icon={<FaMoneyBillWave />}
          gradient="danger-gradient"
          footer="Current Payroll"
        />

        <DashboardCard
          title="Average Salary"
          value={`₹ ${stats.average_salary.toLocaleString()}`}
          icon={<FaChartLine />}
          gradient="warning-gradient"
          footer="Average Employee"
        />

      </div>

      {/* Quick Actions */}

      <div className="dashboard-actions mt-4">

        <button className="action-btn">

          <FaUserPlus />

          <span>Add Employee</span>

        </button>

        <button className="action-btn">

          <FaPlusCircle />

          <span>Add Department</span>

        </button>

        <button className="action-btn">

          <FaCalendarCheck />

          <span>Attendance</span>

        </button>

        <button className="action-btn">

          <FaMoneyCheckAlt />

          <span>Payroll</span>

        </button>

      </div>

      {/* Charts */}

      <div className="row mt-4 g-4">

        <div className="col-lg-8">

          <div className="dashboard-panel">

            <div className="panel-header">

              <div>

                <h4>Employee Analytics</h4>

                <small>Employees per department</small>

              </div>

              <FaArrowUp className="panel-icon" />

            </div>

            <EmployeeBarChart chartData={chartData} />

          </div>

        </div>

        <div className="col-lg-4">

          <div className="dashboard-panel">

            <div className="panel-header">

              <div>

                <h4>Department Distribution</h4>

                <small>Organization overview</small>

              </div>

              <FaBuilding className="panel-icon" />

            </div>

            <DepartmentPieChart chartData={chartData} />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;