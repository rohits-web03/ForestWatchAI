import os
import jwt
import datetime
from functools import wraps
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from logger_utils import get_logger
from sqlalchemy.exc import IntegrityError
from dotenv import load_dotenv

load_dotenv("../.env")

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True, origins=["https://forestwatchai.vercel.app/"])
logger = get_logger('app')

# Configure the PostgreSQL database connection
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')  # Secret for JWT

db = SQLAlchemy(app)

# Define User model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

# Create the database tables
with app.app_context():
    db.create_all()

@app.route('/home', methods=['GET'])
def home():
    return "Welcome to ForestWatchAI"

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Validate inputs
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters long"}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User with this email already exists"}), 409

    try:
        # Create and save the new user
        new_user = User(name=name, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Database error"}), 500

# JWT Token creation using PyJWT
def create_jwt_token(user_id, email):
    payload = {
        'id': user_id,
        'email': email,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)

    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm="HS256")
    return token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')

        if not token:
            return jsonify({"message": "Token is missing!"}), 403

        try:
            # Decode the token
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({"message": "Token is invalid!"}), 403

        return f(current_user, *args, **kwargs)

    return decorated


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Find the user in the database
    user = User.query.filter_by(email=email).first()

    # Check if user exists and password is correct
    if user and user.check_password(password):
        # Generate a JWT token
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, app.config['SECRET_KEY'], algorithm="HS256")

        # Set the token in a secure HTTP-only cookie
        response = make_response(jsonify({"message": "Login successful"}))
        response.set_cookie('token', token, httponly=True, secure=True, samesite='Lax')

        return response
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    
@app.route('/auth-check', methods=['GET'])
@token_required 
def auth_check(current_user):
    return jsonify({"isAuthenticated": True}), 200

@app.route('/logout', methods=['POST'])
def logout():
    response = make_response(jsonify({"message": "Logged out successfully"}), 200)
    response.set_cookie('token', '', expires=0, httponly=True, secure=True, samesite='Lax')
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
