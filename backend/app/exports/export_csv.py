from io import StringIO, BytesIO
import csv


def export_employees_csv(employees):

    output = StringIO()

    writer = csv.writer(output)

    writer.writerow([
        "ID",
        "Name",
        "Email",
        "Phone",
        "Department",
        "Designation",
        "Salary"
    ])

    for employee in employees:

        writer.writerow([
            employee.id,
            employee.name,
            employee.email,
            employee.phone,
            employee.department.department_name,
            employee.designation,
            employee.salary
        ])

    csv_bytes = BytesIO()

    csv_bytes.write(output.getvalue().encode("utf-8"))

    csv_bytes.seek(0)

    return csv_bytes