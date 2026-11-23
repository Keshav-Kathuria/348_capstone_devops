import os
import uuid

from werkzeug.utils import secure_filename

UPLOAD_FOLDER = "app/static/uploads"

ALLOWED_EXTENSIONS = {
    "png",
    "jpg",
    "jpeg"
}


def allowed_file(filename):

    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )


def save_image(file):

    if file is None:
        return None

    if file.filename == "":
        return None

    if not allowed_file(file.filename):
        return None

    extension = file.filename.rsplit(".", 1)[1].lower()

    filename = f"{uuid.uuid4()}.{extension}"

    filename = secure_filename(filename)

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    file.save(
        os.path.join(
            UPLOAD_FOLDER,
            filename
        )
    )

    return filename