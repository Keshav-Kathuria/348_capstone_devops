import { FaTrash, FaDownload } from "react-icons/fa";

import {
    deletePayroll,
    downloadPayslip
} from "../services/payrollApi";

function PayrollTable({ payrolls, loadPayrolls }) {

    const handleDelete = async (id) => {

        if (!window.confirm("Delete payroll?")) return;

        try {

            await deletePayroll(id);

            loadPayrolls();

        } catch (error) {

            console.log(error);

            alert("Unable to delete payroll.");

        }

    };

    const handleDownload = async (id) => {

        try {

            await downloadPayslip(id);

        } catch (error) {

            console.log(error);

            alert("Unable to download payslip.");

        }

    };

    return (

        <div className="card shadow">

            <div className="card-header bg-dark text-white">

                <h4 className="mb-0">

                    Payroll History

                </h4>

            </div>

            <div className="card-body">

                <div className="table-responsive">

                    <table className="table table-bordered table-hover">

                        <thead className="table-primary">

                            <tr>

                                <th>ID</th>
                                <th>Employee</th>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Basic</th>
                                <th>Bonus</th>
                                <th>Deductions</th>
                                <th>Net Salary</th>
                                <th width="180">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {payrolls.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="text-center"
                                    >

                                        No Payroll Found

                                    </td>

                                </tr>

                            ) : (

                                payrolls.map((payroll) => (

                                    <tr key={payroll.id}>

                                        <td>{payroll.id}</td>

                                        <td>{payroll.employee}</td>

                                        <td>{payroll.month}</td>

                                        <td>{payroll.year}</td>

                                        <td>₹ {payroll.basic_salary}</td>

                                        <td>₹ {payroll.bonus}</td>

                                        <td>₹ {payroll.deductions}</td>

                                        <td className="fw-bold text-success">

                                            ₹ {payroll.net_salary}

                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-primary btn-sm me-2"
                                                onClick={() =>
                                                    handleDownload(payroll.id)
                                                }
                                            >

                                                <FaDownload className="me-1" />

                                                PDF

                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleDelete(payroll.id)
                                                }
                                            >

                                                <FaTrash />

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default PayrollTable;