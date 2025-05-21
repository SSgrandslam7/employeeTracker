import inquirer from 'inquirer';
import * as db from './db/queries';

async function mainMenu(): Promise<void> {
    const { action } = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
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
        case 'View All Departments':
            console.table(await db.getAllDepartments());
            break;
        case 'View All Roles':
            console.table(await db.getAllRoles());
            break;
        case 'View All Employees':
            console.table(await db.getAllEmployees());
            break;
        case 'Add Department': {
            const { name } = await inquirer.prompt({ 
                type: 'input',
                name: 'name', 
                message: 'Department name:',
            });
            await db.addDepartment(name);
            break;
        }
        case 'Add Role': {
            const { title, salary, department_id } = await inquirer.prompt([
                { type: 'input', name: 'title', message: 'Role title:' },
                { type: 'input', name: 'salary', message: 'Salary:' },
                { type: 'input', name: 'department_id', message: 'Department ID:' },
            ]);
            await db.addRole(title, parseFloat(salary), parseInt(department_id));
            break;
        }
        case 'Add Employee': {
            const { first, last, role_id, manager_id } = await inquirer.prompt([
                { type: 'input', name: 'first', message: 'First name' },
                { type: 'input', name: 'last', message: 'Last name:' },
                { type: 'input', name: 'role_id', message: 'Role ID:' },
                { type: 'input', name: 'manager_id', message: 'Manager ID (optional):', default: ' ' },
            ]);
            await db.addEmployee(first, last, parseInt(role_id), manager_id ? parseInt(manager_id) : null);
            break;
        }
        case 'Update Employee Role': {
            const { employee_id, role_id } = await inquirer.prompt([
                { type: 'input', name: 'employee_id', message: 'Employee ID:' },
                { type: 'input', name: 'role_id', message: 'New Role ID:' },
            ]);
            await db.updateEmployeeRole(parseInt(employee_id), parseInt(role_id));
            break;
        }
        case 'Exit':
            process.exit();
    }
    mainMenu();
}
mainMenu();