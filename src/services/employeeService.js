const KEYS = {
    employees: 'employees',
    employeeId: 'employeeId'
}

let data = {
    city: "dfgdsfhtrjrjf",
    email: "sdfsdgdfherhe@dsfgdfg",
    fullName: "dfgdfgdf",
    gender: "male",
    hireDate: "2021-01-20T19:08:16.404Z",
    id: 12,
    isPermanent: false,
    mobile: "3453453542",
  };
  
  let json = JSON.stringify(data);
  let arr = [];

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
])

export function insertEmployee(data) {
    let employees = getAllEmployees();
    data['id'] = generateEmployeeId()
    employees.push(data)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export function updateEmployee(data) {
    let employees = getAllEmployees();
    let recordIndex = employees.findIndex(x => x.id == data.id);
    employees[recordIndex] = { ...data }
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function deleteEmployee(id) {
    let employees = getAllEmployees();
    employees = employees.filter(x => x.id != id)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId, (++id).toString())
    return id;
}

export function getAllEmployees() {
    if (localStorage.getItem(KEYS.employees) == null)
        localStorage.setItem(KEYS.employees, JSON.stringify([]))
    let employees = JSON.parse(localStorage.getItem(KEYS.employees));
    // let employees = JSON.parse(json)
    //map departmentID to department title
    let departments = getDepartmentCollection();
    arr.push(data)
    // console.log(employees)
    // console.log(arr)


    // return employees.map(x => ({
    //     ...x,
    //     department: departments[x.departmentId - 1].title
    // }))
}