from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_caching import Cache
from dotenv import load_dotenv
import os
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
cache = Cache()

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes

    # Load configuration from environment variables
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

    # Cache configuration (Redis used here)
    app.config['CACHE_TYPE'] = 'RedisCache'
    app.config['CACHE_REDIS_URL'] = os.getenv('REDIS_URL')
    app.config['CACHE_DEFAULT_TIMEOUT'] = 300

    # Define the home route
    @app.route('/')
    def home():
        return 'Welcome to AspireIT!'

    # Initialize the extensions
    db.init_app(app)
    migrate.init_app(app, db)
    JWTManager(app)
    cache.init_app(app)

    # Register blueprints (API routes)
    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app
