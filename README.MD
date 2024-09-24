
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
│   │   ├── __init__.py              # Flask app initialization
│   │   ├── ml_model.py              # Machine learning model integration
│   │   ├── models.py                # SQLAlchemy models for database schema
│   │   ├── routes.py                # API routes for user management, enrollment, etc.
│   ├── migrations/                  # Database migrations
│   ├── .env                         # Environment variables (secret keys, database credentials)
│   ├── app.py                       # Entry point for Flask application
│   ├── requirements.txt             # Python dependencies
│   ├── README.md                    # Backend project documentation
│
├── database/
│   ├── schema.sql                   # SQL file containing database schema creation scripts
│   ├── aspireit_db.sql              # MySQL Database Dump
|
├── frontend/
│  ├── public/                       # Public folder for static assets
├── src/
│   ├── assets/                      # Static resources (images, fonts, etc.)
│   ├── components/                  # React components used in the frontend
│   │   ├── AttendanceCharts.jsx     # Attendance chart component using Chartjs
│   │   ├── AttendanceModal.jsx      # Displays the attendance modal
│   │   ├── AttendanceOverview.jsx   # Displays the attendance overview
│   │   ├── CaregiversCharts.jsx     # Caregiver overview chart component
│   │   ├── CaregiversOverview.jsx   # Displays the caregivers' overview
│   │   ├── ChildrenCharts.jsx       # Children overview doughnut chart
│   │   ├── ChildrenOverview.jsx     # Displays the children's overview
│   │   ├── Dashboard.jsx            # Main dashboard component
│   │   ├── EnrollmentCharts.jsx     # Enrollment chart component
│   │   ├── EnrollmentOverview.jsx   # Displays the enrollment overview
│   │   ├── FinancialOverview.jsx    # Displays the financial overview
│   │   ├── Footer.jsx
│   │   ├── Homepage.jsx
│   │   ├── language-selector.jsx    # Component to select from the available languages (i18n support)
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── Prediction.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Register.jsx
│   ├── context/                     # Context providers for managing DarkMode state
│   ├── App.css                      # Global styles for the frontend
│   ├── App.jsx                      # Root component for the frontend
│   ├── i18n.js                      # Internationalization configuration
│   ├── index.css                    # Main CSS file for the frontend
│   ├── main.jsx                     # Main entry point for React app
├── .eslint.config.js                # ESLint configuration for coding standards
├── index.html                       # Main HTML entry point for the frontend
├── LICENSE                          # Project license (MIT)
├── package.json                     # Project metadata and scripts for frontend
├── package-lock.json                # Dependency lock file for frontend
├── postcss.config.js                # PostCSS configuration for Tailwind and CSS processing
├── README.md                        # Project documentation (this file)
├── tailwind.config.js               # Tailwind CSS configuration
├── vite.config.js                   # Vite.js configuration for bundling and serving frontend code
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
- **Internationalization (i18n)**: Supports multiple languages including English (en), French (fr), and Hindi (hin).
- **Component Modularity**: The large and complex dashboard has been broken down into smaller, manageable components for better maintainability.

### Additional Notes

- The **backend** folder contains the Flask server, models, routes, and machine learning integration.
- The **frontend** folder contains the React components, including various charts and the dashboard UI.
- **Tailwind CSS** is used for styling, and **Chart.js** is used for chart rendering.
- **JWT Authentication** is implemented to secure protected routes, ensuring safe user access.
- The **Dashboard** component has been refactored into smaller modular components, each responsible for rendering specific parts like:
  - **ChildrenOverview**: Displays children's overview chart and statistics.
  - **CaregiversOverview**: Displays caregivers' overview chart and statistics.
  - **FinancialOverview**: Displays financial-related data.
  - **AttendanceOverview**: Displays attendance-related charts.
  - **EnrollmentOverview**: Shows enrollment trends and data.
  - **AttendanceModal**: A modal for detailed attendance statistics.

## Contributing

Feel free to open an issue or submit a pull request for any feature requests or bugs you encounter.

## Contact

Feel free to reach out if you have any questions or want to connect!

✉️ Email: [mohujer90@gmail.com](mailto:mohujer90@gmail.com)

 LinkedIn: [@Mohd-Uzair](https://www.linkedin.com/in/mohd-uzair-33b166204/)
