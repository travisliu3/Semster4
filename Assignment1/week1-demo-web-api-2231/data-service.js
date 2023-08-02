let data = require('./data/employees-data.json');

module.exports = {
    // CRUD methods for Employees 
    // Get All Employee
    getAllEmployees: function(page) {
        var c = data.map(p => p); // shalowcopy of the employee data array

        // c.sort(function (a, b) {
        //     return a.lastName.localeCompare(b.lastName) ||
        //         a.firstName.localeCompare(b.firstName) || 0
        // });
        
        return page==0? c : c.slice((page-1)*10, page*10) ;
    },

    // Get one Employee
    getEmployeeById: function(id) {
        console.log("id in get one: " , id);
        
        // return data.find(i => i.employeeId == id);
        return new Promise(function (resolve, reject) {
            resolve(data.find(i => i.employeeId == id));
        });
    },

    // Add new Employee
    AddNewEmployee: function(newItem) {
        newItem.employeeId = data.length+1;
        // Add to the array
        data.push(newItem);
        return newItem;
    },

    // Edit existing Employee
    // EditEmployee: function(newItem) {
    EditEmployee: function(newItem, id) {
        // Get the matching array index
        let index = data.findIndex(emp => emp.employeeId == id); 

        newItem.employeeId = id;
        
        // If found, replace, otherwise return undefined
        if (data[index]) {
            data[index] = newItem; 
            return newItem; 
        }
        
        return data[index]; 
    },

    // Delete Employee
    deleteEmployee: function(id) {
        // Get the matching array index
        let index = data.findIndex(i => i.employeeId == id);
        // If found, delete, otherwise return undefined
        if (data[index]) {
            data.splice(index, 1);
        }        
    }
}