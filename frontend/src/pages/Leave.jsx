import { useEffect, useState } from "react";

import LeaveForm from "../components/LeaveForm";
import LeaveTable from "../components/LeaveTable";

import {
  getLeaves,
  updateLeave,
  deleteLeave,
} from "../services/leaveApi";

function Leave() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const data = await getLeaves();
      setLeaves(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateLeave(id, status);

      alert(`Leave ${status} successfully.`);

      loadLeaves();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this leave request?"
    );

    if (!confirmDelete) return;

    try {
      await deleteLeave(id);

      alert("Leave deleted successfully.");

      loadLeaves();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  return (
    <div className="container-fluid">

      <h2 className="mb-4">
        Leave Management
      </h2>

      <LeaveForm
        loadLeaves={loadLeaves}
      />

      <LeaveTable
        leaves={leaves}
        handleStatus={handleStatus}
        handleDelete={handleDelete}
      />

    </div>
  );
}

export default Leave;