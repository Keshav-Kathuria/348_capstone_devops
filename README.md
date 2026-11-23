# Capstone Project: HRMS - Human Resource Management System

| Name | Roll No | 
|---|---|
| Keshav Kathuria | 2301730348

A full-stack Human Resource Management System (HRMS) built using **React**, **Flask**, **SQLite**, and **REST APIs**.

This application allows organizations to efficiently manage employees, departments, attendance, payroll, leave requests, dashboards, and profile management from a single platform.

---

## Features

### Authentication
- Secure Login
- Protected Routes

### Employee Management
- Add Employee
- Edit Employee
- Delete Employee
- View Employee Details
- Upload Employee Profile Image

### Department Management
- Create Department
- Update Department
- Delete Department

### Attendance Management
- Mark Attendance
- Attendance Records

### Leave Management
- Apply Leave
- Manage Leave Requests

### Payroll Management
- Add Payroll
- Update Payroll
- Delete Payroll

### Dashboard
- Employee Statistics
- Department Statistics
- Charts
- Dashboard Cards

### Reports
- Export Employee Data to CSV
- Export Employee Data to Excel
- Generate Employee PDF Reports

---

## Tech Stack

### Frontend

- React.js
- Vite
- Axios
- React Router
- CSS

### Backend

- Flask
- Flask SQLAlchemy
- Flask Migrate
- SQLite
- REST APIs

---

## Project Structure

```
HRMS/
│
├── backend/
│   ├── app/
│   ├── migrations/
│   ├── requirements.txt
│   └── run.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Keshav-Kathuria/348_capstone_devops.git
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate
# Windows
venv\Scripts\activate

pip install -r requirements.txt

python run.py
```

Backend runs on

```
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## API Features

- Authentication API
- Employee API
- Department API
- Attendance API
- Leave API
- Payroll API
- Dashboard API

---

## Future Improvements

- JWT Authentication
- Email Notifications
- Role-Based Access Control
- Cloud Database (PostgreSQL)
- Docker Deployment
- Unit Testing
- CI/CD Pipeline

---

## Author

Keshav Kathuria

GitHub:
https://github.com/Keshav-Kathuria

---

## License

This project is developed for learning and portfolio purposes.
