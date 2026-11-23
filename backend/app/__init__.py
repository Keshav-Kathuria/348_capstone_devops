from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from .config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()


def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    # JWT Secret Key
    app.config["JWT_SECRET_KEY"] = "hrms_super_secret_key_2026_production"

    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # =====================================================
    # JWT Error Handlers
    # =====================================================

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        print("\n========== INVALID TOKEN ==========")
        print(error)
        print("===================================\n")

        return jsonify({
            "message": error
        }), 422


    @jwt.unauthorized_loader
    def unauthorized_callback(error):
        print("\n========== UNAUTHORIZED ==========")
        print(error)
        print("==================================\n")

        return jsonify({
            "message": error
        }), 401


    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        print("\n========== TOKEN EXPIRED ==========\n")

        return jsonify({
            "message": "Token has expired"
        }), 401


    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        print("\n========== TOKEN REVOKED ==========\n")

        return jsonify({
            "message": "Token has been revoked"
        }), 401


    @jwt.needs_fresh_token_loader
    def fresh_token_callback(jwt_header, jwt_payload):
        print("\n========== FRESH TOKEN REQUIRED ==========\n")

        return jsonify({
            "message": "Fresh token required"
        }), 401


    # =====================================================
    # Import Models
    # =====================================================

    from . import models

    # =====================================================
    # Import Blueprints
    # =====================================================

    from .routes.home_routes import home_bp
    from .routes.department_routes import department_bp
    from .routes.employee_routes import employee_bp
    from .routes.dashboard_routes import dashboard_bp
    from .routes.attendance_routes import attendance_bp
    from .routes.leave_routes import leave_bp
    from .routes.auth_routes import auth_bp
    from .routes.payroll_routes import payroll_bp

    # =====================================================
    # Register Blueprints
    # =====================================================

    app.register_blueprint(home_bp)
    app.register_blueprint(department_bp)
    app.register_blueprint(employee_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(attendance_bp)
    app.register_blueprint(leave_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(payroll_bp)

    return app