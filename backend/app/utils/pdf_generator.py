from io import BytesIO
from reportlab.lib.colors import black, grey
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


def generate_payslip(payroll):

    buffer = BytesIO()

    pdf = canvas.Canvas(buffer, pagesize=A4)

    width, height = A4

    # Company Header
    pdf.setFont("Helvetica-Bold", 22)
    pdf.drawString(170, 800, "HRMS PRIVATE LIMITED")

    pdf.setFont("Helvetica", 12)
    pdf.drawString(180, 780, "Employee Salary Payslip")

    # Divider
    pdf.setStrokeColor(grey)
    pdf.line(40, 765, 550, 765)

    y = 730

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, "Employee Name :")

    pdf.setFont("Helvetica", 12)
    pdf.drawString(180, y, payroll.employee.name)

    y -= 30

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, "Email :")

    pdf.setFont("Helvetica", 12)
    pdf.drawString(180, y, payroll.employee.email)

    y -= 30

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, "Department :")

    pdf.setFont("Helvetica", 12)
    pdf.drawString(
        180,
        y,
        payroll.employee.department.department_name
    )

    y -= 30

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, "Designation :")

    pdf.setFont("Helvetica", 12)
    pdf.drawString(
        180,
        y,
        payroll.employee.designation
    )

    y -= 50

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, y, "Payroll Details")

    pdf.line(50, y - 5, 250, y - 5)

    y -= 40

    details = [

        ("Month", payroll.month),

        ("Year", payroll.year),

        ("Basic Salary", f"₹ {payroll.basic_salary}"),

        ("Bonus", f"₹ {payroll.bonus}"),

        ("Deductions", f"₹ {payroll.deductions}"),

        ("Net Salary", f"₹ {payroll.net_salary}")

    ]

    for key, value in details:

        pdf.setFont("Helvetica-Bold", 12)
        pdf.drawString(60, y, f"{key} :")

        pdf.setFont("Helvetica", 12)
        pdf.drawString(220, y, str(value))

        y -= 30

    y -= 20

    pdf.setStrokeColor(black)
    pdf.line(50, y, 550, y)

    y -= 40

    pdf.setFont("Helvetica-Oblique", 11)
    pdf.drawString(
        50,
        y,
        "This is a computer-generated payslip. No signature is required."
    )

    pdf.showPage()

    pdf.save()

    buffer.seek(0)

    return buffer