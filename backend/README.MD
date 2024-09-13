# AspireIT Backend Setup

This guide explains how to set up and run the backend of the AspireIT project locally. The backend uses Flask for handling RESTful APIs and SQLAlchemy for database operations.

### Prerequisites

Before setting up the project, ensure you have the following installed:
- **Python 3.x**: Make sure you have Python 3 installed. You can download it from [here](https://www.python.org/downloads/).
- [pip (Python package manager)](https://pip.pypa.io/en/stable/installation/)
- **MySQL**: You will need a MySQL database server running locally or access to a remote one.
- **MySQL Workbench** (optional): For database management, you can download it [here](https://dev.mysql.com/downloads/workbench/).
- **Postman** (optional): For testing API routes, you can use [Postman](https://www.postman.com/).
  

## Installation
### Step 1: Clone the Repository

First, clone the project repository to your local machine. If using Git:

```bash
git clone <repository-url>
cd aspireit-backend
```

### Step 2: Set up a Virtual Environment
It’s recommended to run the project in a virtual environment to manage dependencies. Run the following commands:

#### For Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

#### For Linux/macOS:

```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

Once the virtual environment is activated, install all necessary packages using `pip`:

```bash
pip install -r requirements.txt
```

This will install Flask, SQLAlchemy, and any other dependencies listed in the `requirements.txt` file.

### Step 4: Configure Environment Variables

Create a `.env` file in the root of the backend directory with the following content:

```
Create a `.env` file in the root directory of the project. This file will contain sensitive configuration data. Here’s a sample template:

```bash
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
DATABASE_URL=mysql+mysqlconnector://root:yourpassword@localhost/aspireit_db
```

Replace `your-secret-key`, `your-jwt-secret-key`, and `yourpassword` with appropriate values. Make sure that the `DATABASE_URL` matches your local MySQL credentials.


### Step 5: Set Up the Database

1. Open MySQL Workbench or use the MySQL command line to create the database:
   
   ```sql
   CREATE DATABASE aspireit_db;
   ```

2. Run the database migrations to set up the schema:

   ```bash
   flask db upgrade
   ```

This command will create the necessary tables in the `aspireit_db` database.

### Step 6: Run the Backend

Start the Flask server by running:

```bash
flask run
```

You should now see the application running at `http://127.0.0.1:5000/`.

### Step 7: Testing API Endpoints

You can test the backend routes by using tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/).
Here are some example routes:

- **User Registration**: `POST /register`
- **User Login**: `POST /login`
- **Protected Route**: Use a JWT token in the `Authorization` header to access any protected routes.
---

With these steps, you should be able to run the backend locally and start interacting with it!

## Project Structure

```
aspireit-backend/
│
├── app/
│   ├── __init__.py          # Application factory and configurations
│   ├── models.py            # SQLAlchemy models (Child, Caregiver, etc.)
│   ├── routes.py            # API routes for handling requests
│   ├── ml_model.py          # ML model integration (e.g., Prophet)
│
├── migrations/              # Database migration files
├── .env                     # Environment variables
├── app.py                   # Entry point of the Flask app
├── requirements.txt         # Python dependencies
├── README.md                # This file
```

---

## Troubleshooting

- **MySQL Connection Error**: Ensure that MySQL is running and the credentials in `.env` are correct. Check the `DATABASE_URL` in the `.env` file and verify that the MySQL server is running.

- **Port Issues**: If the default Flask port `5000` is busy, you can run the server on a different port by modifying the command like this:
  
  ```bash
  flask run --port=5001
  ```

- **Virtual Environment Activation Issues**: If you're having trouble activating the virtual environment, ensure that your shell's PATH is configured correctly and that you have permissions to execute the `activate` script.

---