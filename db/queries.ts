const pool = require('./connection');

module.exports = {
    getAllDepartments: async () => {
        const res = await pool.query('SELECT * FROM department');
        return res.rows;
    },

    getAllRoles: async () => {
        const res = await pool.query(`
            SELECT role.id, role.title, department.name AS department, role.salary
            FROM role
            JOIN department ON role.department_id = department.id
            `);
            return res.rows;
    },

    getAllEmployees: async () => {
        const res = await pool.query(`
            SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = ,.id
            `);
            return res.rows;
    },

    addDepartment: async (name) => {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    },

    addRole: async (title, salary, department_id) => {
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    },

    addEmployee: async (first, last, role_id, manager_id) => {
        await pool.query('INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first, last, role_id, manager_id]);
    },

    updateEmployeeRole: async (employee_id, role_id) => {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
    },
};