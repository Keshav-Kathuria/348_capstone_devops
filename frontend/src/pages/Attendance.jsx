import { useEffect, useState } from "react";

import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

import { getAttendance } from "../services/attendanceApi";

function Attendance() {

    const [attendance, setAttendance] = useState([]);

    useEffect(() => {

        loadAttendance();

    }, []);

    const loadAttendance = async () => {

        try {

            const data = await getAttendance();

            setAttendance(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">

                Attendance Management

            </h2>

            <AttendanceForm
                loadAttendance={loadAttendance}
            />

            <AttendanceTable
                attendance={attendance}
            />

        </div>

    );

}

export default Attendance;