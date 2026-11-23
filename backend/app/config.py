import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:

    # SQLite Database
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(
        BASE_DIR,
        "..",
        "instance",
        "hrms.db"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT
    JWT_SECRET_KEY = "hrms_super_secret_key_2026"

    # Flask Secret Key
    SECRET_KEY = "hrms_flask_secret_key_2026"