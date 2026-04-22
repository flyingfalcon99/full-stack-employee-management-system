const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const employeesFilePath = path.join(__dirname, '../data/employees.json');

const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
        return [];
    }
};

const writeData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error(`Error writing to ${filePath}:`, err);
    }
};

module.exports = {
    getUsers: () => readData(usersFilePath),
    saveUsers: (data) => writeData(usersFilePath, data),
    getEmployees: () => readData(employeesFilePath),
    saveEmployees: (data) => writeData(employeesFilePath, data)
};
