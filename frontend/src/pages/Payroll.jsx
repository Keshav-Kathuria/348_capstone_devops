import { useEffect, useState } from "react";

import PayrollForm from "../components/PayrollForm";
import PayrollTable from "../components/PayrollTable";

import { getPayrolls } from "../services/payrollApi";

function Payroll() {

    const [payrolls, setPayrolls] = useState([]);

    useEffect(() => {

        loadPayrolls();

    }, []);

    const loadPayrolls = async () => {

        try {

            const data = await getPayrolls();

            setPayrolls(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">

                Payroll Management

            </h2>

            <PayrollForm
                loadPayrolls={loadPayrolls}
            />

            <PayrollTable
                payrolls={payrolls}
                loadPayrolls={loadPayrolls}
            />

        </div>

    );

}

export default Payroll;