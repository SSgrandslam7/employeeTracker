const inquirer = require('inquirer');
const db = require('./db/queries');

async function mainMenu() {
    const { action } = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Department',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Exit'
        ]
    });

    switch (action) {
        case 'View All Department':
            console.table(await db.getAllDepartment());
            break;
        case 'View All Roles':
            console.table(await db.getAllRoles());
            break;
        case 'View All Employees':
            console.table(await db.getAllEmployees());
            break;
        case 'Add Department': {
            const { name } = await inquirer.prompt({ name: 'name', message: 'Department name:' });
            await db.addDepartment(name);
            break;
        }
        case 'Add Role': {
            const { title, salary, department_id } = await inquirer.prompt([
                { name: 'title', message: 'Role title:' },
                { name: 'salary', message: 'Salary:' },
                { name: 'department_id', message: 'Department ID:' },
            ]);
            await db.addRole(title, salary, department_id);
            break;
        }
        case 'Add Employee': {
            const { first, last, role_id, manager_id } = await inquirer.prompt([
                { name: 'first', message: 'First name' },
                { name: 'last', message: 'Last name:' },
                { name: 'role_id', message: 'Role ID:' },
                { name: 'manager_id', message: 'Manager ID (optional):', default: null },
            ]);
            await db.addEmployee(first, last, role_id, manager_id);
            break;
        }
        case 'Update Employee Role': {
            const { employee_id, role_id } = await inquirer.prompt([
                { name: 'employee_id', message: 'Employee ID:' },
                { name: 'role_id', message: 'New Role ID:' },
            ]);
            await db.updateEmployeeRole(employee_id, role_id);
            break;
        }
        case 'Exit':
            process.exit();
    }
    mainMenu();
}
mainMenu();