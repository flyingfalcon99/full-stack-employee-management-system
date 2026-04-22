# Employee Management System Walkthrough

The Full-Stack Employee Management System (EMS) has been completely implemented according to the project specifications.

## Overview of Changes

- **Backend Foundation**: Set up a Node.js project powered by **Express.js**.
- **Data Storage**: Created a file-based JSON storage mechanism (`fs` module) via `utils/fileHandler.js` eliminating the need for a database. Data is stored in `data/employees.json` and `data/users.json`.
- **Views**: Developed responsive frontend templates using **EJS** and **Tailwind CSS**.
  - User and Admin Login portals
  - Account Sign Up portal
  - User Dashboard (read-only employee directory)
  - Admin Dashboard (full CRUD interface with Modals)
- **Authentication**: Implemented session-based cookie management using `cookie-parser`.
- **Testing**:
  - Wrote **Cypress** E2E test suites (`cypress/e2e/auth.cy.js` and `cypress/e2e/employees.cy.js`) covering login flows and UI CRUD functionality.
  - Exported a comprehensive **Postman Collection** (`postman_collection.json`) containing API tests for all the Employee CRUD endpoints.

## How to Run the Application

> [!TIP]
> **Getting Started**
> 1. Open your terminal and navigate to the project directory.
> 2. Start the server using: `node server.js`
> 3. Visit **http://localhost:3000** in your web browser.

### Application Workflows

- **Initial Access**: You will be redirected to the `/login` page. From here, you can click **Sign up** to create a standard user account.
- **Admin Access**: To access the Admin Dashboard, click the **Admin Login** link from the login page, or visit `/admin-login` directly.
  - *Default Credentials*: Username: `admin`, Password: `admin`.
- **User Dashboard**: Standard users will see the Employee Directory.
- **Admin Dashboard**: Admins can use the "Add Employee", "Edit", and "Delete" buttons to manage records directly on the page without reloading.

### Running Cypress Tests

To execute the automated UI tests:
1. Ensure the Node server is running (`node server.js`).
2. In a separate terminal, run Cypress in interactive mode:
   ```bash
   npx cypress open
   ```
   *Select "E2E Testing" and run the `auth.cy.js` and `employees.cy.js` specs.*

### Running Postman Tests

1. Open the Postman application.
2. Click **Import** and select the `postman_collection.json` file located in the root of the project.
3. You can execute the collection manually to verify API endpoint responses for CRUD operations.
