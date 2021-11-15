
const url = "http://localhost/company/company/public/index.php/";
const url2 = "http://localhost:4000/office";

const fill = list => {
    let table = "";
    $('#table > tbody').empty();

    if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            table += `
    <tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td>${list[i].address}</td>
        <td>${list[i].salary}</td>
        <td>${JSON.stringify(list[i].registered.date)}</td>
        <td>${JSON.stringify(list[i].updated.date)}</td>
        <td>${list[i].status ? "Activo" : "Inactivo"}</td>
        
        <td>
            <button title="Detalles" onclick="getInfoEmployee(${list[i].id});" type="button" class="btn btn-info" data-toggle="modal" data-target="#detailsEmployee"> <i class="fas fa-info"></i> </button>
        </td>
        <td>
            <button title="Editar" onclick="getInfoUpdateEmployee(${list[i].id});" type="button" class="btn btn-warning"  style="color: white;" data-toggle="modal" data-target="#updateEmployee"><i class="far fa-edit"></i></button>
        </td>
        <td>
            <button title="Eliminar" onclick="getEmployeeId(${list[i].id});" type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteEmployee" ><i class="fas fa-trash"></i></button>
        </td>

    </tr>
    `;
        }
    } else {
        table = `
<tr class="text-center">
    <td colspan="5">No hay registros para mostrar</td>
</tr>
`;
    }
    $(`#table > tbody`).html(table);
};

const fill2 = list => {
    let table = "";
    $('#table2 > tbody').empty();

    if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            table += `
    <tr>
        <td>${i + 1}</td>
        <td>${list[i].office_code}</td>
        <td>${list[i].address}</td>
        
        <td>
            <button title="Detalles" onclick="getInfoOffice(${list[i].id});" type="button" class="btn btn-info" data-toggle="modal" data-target="#detailsOffice"> <i class="fas fa-info"></i> </button>
        </td>
        <td>
            <button title="Editar" onclick="getInfoUpdateOffice(${list[i].id});" type="button" class="btn btn-warning"  style="color: white;" data-toggle="modal" data-target="#updateOffice"><i class="far fa-edit"></i></button>
        </td>
        <td>
            <button title="Eliminar" onclick="getOfficeId(${list[i].id});" type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteOffice" ><i class="fas fa-trash"></i></button>
        </td>

    </tr>
    `;
        }
    } else {
        table = `
<tr class="text-center">
    <td colspan="5">No hay registros para mostrar</td>
</tr>
`;
    }
    $(`#table2 > tbody`).html(table);
};

const getEmployees = async () => {
    return await $.ajax({
        type: 'GET',
        url: url + 'employees'
    }).done(res => {
        fill(res.listEmployee);
        body: JSON.stringify(res.listEmployee);
        console.log(res.listEmployee);
    });
}

const getOffices = async () => {
    return await $.ajax({
        type: 'GET',
        url: url2
    }).done(res => {
        fill2(res.listOffices);
        body: JSON.stringify(res.listOffices);
        console.log(res.listOffices);
    });
}

const getEmployeeById = async (id) => {
    return await $.ajax ({
        type: 'GET',
        url: url+'employee/'+id
    }).done (res => res);
}

const getOfficeById = async (id) => {
    return await $.ajax ({
        type: 'GET',
        url: url2+'/'+id
    }).done (res => res);
}

const getInfoEmployee = async (id) => {
    let employee = await getEmployeeById(id);

    document.getElementById('nameDetails').value = employee.employee[0].name;
    document.getElementById('addressDetails').value = employee.employee[0].address;
    document.getElementById('salaryDetails').value = employee.employee[0].salary;
    document.getElementById('registeredDetails').value = employee.employee[0].registered.date;
    document.getElementById('statusDetails').value = employee.employee[0].status? "Activo" : "Inactivo";

    console.log (employee);
}

const getInfoOffice = async (id) => {
    let office = await getOfficeById(id);

    document.getElementById('officeNameDetails').value = office.office[0].office_code;
    document.getElementById('officeStreetDetails').value = office.office[0].address;
   

    console.log (office);
}

const getInfoUpdateEmployee = async (id) => {
    let employee = await getEmployeeById(id);
    document.getElementById('idEmployeeUpdate').value = id;
    document.getElementById('nameUpdate').value = employee.employee[0].name;
    document.getElementById('addresstUpdate').value = employee.employee[0].address;
    document.getElementById('salaryUpdate').value = employee.employee[0].salary;

    console.log (employee);
}

const getInfoUpdateOffice = async (id) => {
    let office = await getOfficeById(id);
    document.getElementById('idOfficeUpdate').value = id;
    document.getElementById('officeNameUpdate').value = office.office[0].office_code;
    document.getElementById('officeStreetUpdate').value = office.office[0].address;

    console.log (office);
}

const getEmployeeId = async (id) => { 
    document.getElementById("idDeleteEmployee").value = id;
}

const getOfficeId = async (id) => { 
    document.getElementById("idDeleteOffice").value = id;
}

const registerEmployee = async () => {
    let name = document.getElementById('nameCreate').value;
    let address = document.getElementById('addressCreate').value;
    let salary = document.getElementById('salaryCreate').value;
    let idoffice = document.getElementById('idOfficeCreate').value;

    let object = {name,address,salary,idoffice};
    console.log(object);

    await $.ajax({
        type: 'POST',
        url: url+'employees/create',
        data: object
    }).done (function(res){
        console.log(res);
        
    });
}

const registerOffice = async () => {
    let office_code = document.getElementById('officeNameCreate').value;
    let address = document.getElementById('officeStreetCreate').value;
    

    let object = {office_code,address};
    console.log(object);

    await $.ajax({
        type: 'POST',
        url: url2+'/create',
        data: object
    }).done (function(res){
        console.log(res);
        
    });
}

const updateEmployee = async () => {
    let id = document.getElementById('idEmployeeUpdate').value
    let name = document.getElementById('nameUpdate').value;
    let address = document.getElementById('addresstUpdate').value;
    let salary = document.getElementById('salaryUpdate').value;

    let object = {name, address, salary};
    console.log(object);
    
    await $.ajax({
        type: 'POST',
        url: url+'employees/update/'+id,
        data: object
    }).done(function(res){
        console.log(res);
        
    });
    
}

const updateOffice = async () => {
    let id = document.getElementById('idOfficeUpdate').value
    let office_code = document.getElementById('officeNameUpdate').value;
    let address = document.getElementById('officeStreetUpdate').value;

    let object = {office_code, address};
    console.log(object);
    
    await $.ajax({
        type: 'POST',
        url: url2+'/update/'+id,
        data: object
    }).done(function(res){
        console.log(res);
        
    });  
}

const deleteEmployee = async () => {
    let id = document.getElementById('idDeleteEmployee').value;
    await $.ajax({
        type: 'POST',
        url: url+'employees/delete/'+id
    }).done(res => {
        console.log(res);
        getSchools();
    })
}

const deleteOffice = async () => {
    let id = document.getElementById('idDeleteOffice').value;
    await $.ajax({
        type: 'POST',
        url: url2+'/delete/'+id
    }).done(res => {
        console.log(res);
        getSchools();
    })
}


getEmployees();
getOffices();