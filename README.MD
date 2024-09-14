# AspireIT Project

## Project Overview

The **AspireIT** project is designed as a full-stack web application with machine learning capabilities. The project is built using **Flask** for the backend and **React** for the frontend, and it utilizes **MySQL** for the database. The app provides features for managing data related to children, caregivers, attendance, finances, and enrollments. The project also includes the integration of a machine learning model (Facebook Prophet) for enrollment and attendance predictions.

## Project Structure

Here’s a breakdown of the folder structure:

```
AspireIT/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask app initialization
│   │   ├── ml_model.py          # Machine learning model integration
│   │   ├── models.py            # SQLAlchemy models for database schema
│   │   ├── routes.py            # API routes for user management, enrollment, etc.
│   ├── migrations/              # Database migrations
│   ├── .env                     # Environment variables (secret keys, database credentials)
│   ├── app.py                   # Entry point for Flask application
│   ├── requirements.txt         # Python dependencies
│   ├── README.md                # Project documentation (this file)
│
├── database/
│   ├── schema.sql               # SQL file containing database schema creation scripts
│
├── frontend/
│   ├── public/                  # Static assets (index.html, icons, etc.)
│   ├── src/
│   │   ├── component/
│   │   │   ├── AttendanceCharts.jsx      # Attendance chart component using Chart.js
│   │   │   ├── CaregiverCharts.jsx       # Caregiver overview chart component
│   │   │   ├── ChildrenCharts.jsx        # Children overview doughnut chart
│   │   │   ├── Dashboard.jsx             # Main dashboard component
│   │   │   ├── EnrollmentCharts.jsx      # Enrollment chart component
│   │   ├── App.jsx                # Main app component
│   │   ├── App.css                # Global CSS file for the app
│   │   ├── index.css              # Global styles
│   │   ├── main.jsx               # React application entry point
│   ├── node_modules/              # JavaScript dependencies
│   ├── package.json               # Node.js project configuration and dependencies
│   ├── vite.config.js             # Vite development server configuration
│   ├── tailwind.config.js         # Tailwind CSS configuration
│
```

## Setup Instructions

### Backend Setup

1. **Install Dependencies**:
   Navigate to the `backend` folder and install the required Python packages using pip:

   ```bash
   pip install -r requirements.txt
   ```

2. **Set Up the Database**:
   - Ensure that MySQL is installed and running on your machine.
   - Open MySQL Workbench and connect to your MySQL instance.
   - Go to `Server` > `Data Import`.
   - Select the `aspireit_db.sql` file from the `/database` folder.
   - Import the file into a new or existing database.

3. **Environment Variables**:
   - Create a `.env` file in the `backend` directory and add the following configuration:

     ```env
     DATABASE_URL=mysql+mysqlconnector://root:<password>@localhost/aspireit_db
     JWT_SECRET_KEY=<your-jwt-secret>
     ```

4. **Run Flask Application**:
   Start the Flask server by running:

   ```bash
   python app.py
   ```

   The API will be available at `http://localhost:5000`.

### Frontend Setup

1. **Install Node.js Dependencies**:
   Navigate to the `frontend` folder and install the required Node.js packages:

   ```bash
   npm install
   ```

2. **Run the React Application**:
   Start the development server by running:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

### Features

- **User Management**: Allows for user registration and login with JWT-based authentication.
- **Dashboard**: Displays data visualizations such as enrollment trends, attendance statuses, and caregiver overviews.
- **Machine Learning**: Integrates Facebook Prophet for future enrollment and attendance predictions.
- **Charts**: Uses `Chart.js` and `Material-UI` components for rendering visualizations.
- **Responsive Design**: The app uses Tailwind CSS to ensure responsiveness on different screen sizes.

## Additional Notes

- The **backend** folder contains the Flask server, models, routes, and machine learning integration.
- The **frontend** folder contains the React components, including various charts and the dashboard UI.
- Tailwind CSS is used for styling, and Chart.js is used for chart rendering.
- The project uses JWT for authentication, ensuring secure access to protected routes.
