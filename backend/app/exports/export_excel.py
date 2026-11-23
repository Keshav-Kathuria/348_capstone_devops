from io import BytesIO
from openpyxl import Workbook


def export_employees_excel(employees):

    workbook = Workbook()

    sheet = workbook.active

    sheet.title = "Employees"

    headers = [
        "ID",
        "Name",
        "Email",
        "Phone",
        "Department",
        "Designation",
        "Salary"
    ]

    sheet.append(headers)

    for employee in employees:

        sheet.append([
            employee.id,
            employee.name,
            employee.email,
            employee.phone,
            employee.department.department_name,
            employee.designation,
            employee.salary
        ])

    output = BytesIO()

    workbook.save(output)

    output.seek(0)

    return output