# Employee Tracker

## Description
A command-line content management system (CMS) for managing a company's departments, roles, and employees using PostgreSQL. This Node.js application uses Inquirer for user input and the `pg` package for querying a relational database. Easily add, view, and update organizational data right from your terminal.

**Walkthrough Video:** [https://drive.google.com/file/d/1zptUoS4S4VUrJtlkQpoRzEOx8iMpBdUW/view]

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Schema](#schema)
- [Credits](#credits)
- [License](#license)

## Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/employee-tracker.git
   cd employee-tracker

2. **Install dependencies:**
    npm install

3. **Create your PostgreSQL database:**
    Ensure PostgreSQL is installed and running. Then:
    psql -U your_user -d your_database -f schema.sql
    psql -U your_user -d your_database -f seeds.sql

4. **Configure your .env file:**
    Create a .env file in the root directory with the following:
    DB_USER=your_postgres_username
    DB_PASSWORD=your_postgres_password
    DB_NAME=your_database_name
    DB_HOST=localhost
    DB_PORT=5432

5. **Start the application:**
    npm start

## Usage

Navigate through the CLI menu to manage your database. You can:
	•	View all departments, roles, or employees
	•	Add a department, role, or employee
	•	Update an employee’s role

The application is fully CLI-based and intended to be operated through the terminal. No front-end is provided.

## Features
	•	PostgreSQL relational database with normalized schema
	•	Asynchronous queries using async/await and the pg library
	•	TypeScript support for better development safety
	•	Uses Inquirer v8.2.4 for consistent and robust CLI prompts
	•	Modular file structure with separate files for queries and DB connection
	•	.env support for secure database credentials

## Schema

The app uses three core tables:

Department
	•	id (SERIAL PRIMARY KEY)
	•	name (VARCHAR(30) UNIQUE NOT NULL)

Role
	•	id (SERIAL PRIMARY KEY)
	•	title (VARCHAR(30) UNIQUE NOT NULL)
	•	salary (DECIMAL NOT NULL)
	•	department_id (INTEGER NOT NULL REFERENCES department(id))

Employee
	•	id (SERIAL PRIMARY KEY)
	•	first_name (VARCHAR(30) NOT NULL)
	•	last_name (VARCHAR(30) NOT NULL)
	•	role_id (INTEGER NOT NULL REFERENCES role(id))
	•	manager_id (INTEGER REFERENCES employee(id))

## Credits
	•	Node.js
	•	PostgreSQL
	•	pg (node-postgres)
	•	Inquirer
	•	dotenv

## License

MIT © 2025 Stephen Schier