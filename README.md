
# Project Setup

This guide will help you set up the project locally by installing necessary dependencies for both the backend and frontend and running the application.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:
- **Node.js**: Download and install Node.js from [here](https://nodejs.org/). This includes `npm` (Node Package Manager).
- **Git**: Download and install Git from [here](https://git-scm.com/).

### Cloning the Repository

1. Clone the repository to your local machine using Git:
   ```bash
   git clone https://github.com/your-repo/project-name.git
   ```

2. Navigate into the project directory:
   ```bash
   cd project-name
   ```

### Backend Setup

The backend folder contains the API and server-side logic.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install the required Node.js packages:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Rename the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and set the required environment variables such as database connection details, API keys, etc.

4. Start the backend server:
   ```bash
   nodemon
   ```
   The backend server should now be running, typically on `http://localhost:5000`, depending on your `.env` configuration.

### Frontend Setup

The frontend folder contains the client-side application.

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install the required Node.js packages for the frontend:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will typically run on `http://localhost:3000`. You can access the frontend via this URL in your browser.

### Running the Application

- Ensure both the **backend** (running via `nodemon`) and **frontend** (running via `npm run dev`) are running simultaneously.
- The frontend will make API calls to the backend, which is why both must be running at the same time.

---

### Additional Notes

- **Database Setup**: If the project uses a database, ensure that you have it set up and running. Follow the instructions in the backend’s configuration files or `README` for database setup.
- **Environment Variables**: Make sure all required API keys, database credentials, and other environment variables are correctly set in the `.env` files for both frontend and backend.
- **Building for Production**: When you’re ready to deploy the frontend, you can build it by running:
   ```bash
   npm run build
   ```
   This will create a `dist` or `build` directory with optimized production files.

### Useful Commands

- **Frontend**:
  - `npm run dev`: Starts the frontend development server with hot-reloading.
  - `npm run build`: Builds the frontend for production.
  - `npm start`: Runs the production build of the frontend.

- **Backend**:
  - `nodemon`: Automatically restarts the server when file changes in the directory are detected.

---
