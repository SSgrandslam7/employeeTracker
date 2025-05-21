import pool from './connection';

    export const getAllDepartments = async (): Promise<any[]> => {
        const res = await pool.query('SELECT * FROM department');
        return res.rows;
    };

    export const getAllRoles = async (): Promise<any[]> => {
        const res = await pool.query(`
            SELECT role.id, role.title, department.name AS department, role.salary
            FROM role
            JOIN department ON role.department_id = department.id
            `);
            return res.rows;
    };

    export const getAllEmployees = async (): Promise<any[]> => {
        const res = await pool.query(`
            SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id
            `);
            return res.rows;
    };

    export const addDepartment = async (name: string): Promise<void> => {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    };

    export const addRole = async (title: string, salary: number, department_id: number): Promise<void> => {
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    };

    export const addEmployee = async (first: string, last: string, role_id: number, manager_id: number | null): Promise<void> => {
        await pool.query('INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first, last, role_id, manager_id]);
    };

    export const updateEmployeeRole = async (employee_id: number, role_id: number): Promise<void> => {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
    };