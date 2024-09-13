# Frontend Setup for AspireIT

This project is the frontend of the AspireIT application. It is built using **React.js** with **Vite** for a fast development environment and **Tailwind CSS** for styling. The project also includes various components for handling different aspects of the app, such as charts for attendance, enrollments, and more.

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: You can download it from [here](https://nodejs.org/).
- **npm** (comes with Node.js) or **Yarn**: If you prefer using Yarn, install it from [here](https://yarnpkg.com/).

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate into the project directory:

```bash
cd frontend
```

3. Install dependencies:

```bash
npm install
```

or, if you're using **Yarn**:

```bash
yarn install
```

## Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

or for Yarn users:

```bash
yarn dev
```

This will start a local development server (usually running at `http://localhost:5173/` by default).

## Folder Structure

The important files and directories in the project are:

- **src/**: Contains all the source code.
  - **component/**: This folder contains all the React components used in the application, such as:
    - `AttendanceCharts.jsx`: Handles attendance-related charts.
    - `CaregiversCharts.jsx`: Displays caregiver-related statistics.
    - `ChildrenCharts.jsx`: Shows data related to children's statuses.
    - `Dashboard.jsx`: The main dashboard component.
    - `EnrollmentCharts.jsx`: Displays enrollment data.
    - `Navbar.jsx`: The navigation bar component.
    - `Footer.jsx`: The footer component for the site.
    - `Prediction.jsx`: Component for displaying predictions using ML models.
    - `ProtectedRoute.jsx`: Handles protected routes for authenticated users.
  - **context/**: Contains global context providers like `DarkModeContext.jsx` for handling dark mode settings.
- **index.html**: The main entry HTML file.
- **tailwind.config.js**: Configuration file for Tailwind CSS.
- **vite.config.js**: Configuration for Vite.js, which powers the development server and build process.
- **App.jsx**: The root component of the app.
- **App.css**: General styles for the app.
- **package.json**: Contains project metadata and scripts.
- **README.md**: Project documentation (this file).

## Styling

This project uses **Tailwind CSS** for utility-first styling. If you want to add custom styles, modify the **App.css** or use Tailwind classes in your JSX files.

## Linting

The project uses **ESLint** for code linting. To run the linter:

```bash
npm run lint
```

## Build for Production

To build the project for production, run:

```bash
npm run build
```

or with Yarn:

```bash
yarn build
```

This will output the production-ready files into the `dist` directory.

## Contributing

Feel free to open an issue or submit a pull request for any feature requests or bugs you encounter.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
```

This `README.md` file covers the basic setup, instructions, and folder structure for the frontend of the project. 