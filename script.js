function searchCustomer() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("customerTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]; // Index 1 is where name is located
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function addCustomer() {
    var fullName = document.getElementById("fullName").value;
    var customerId = document.getElementById("customerId").value;

    if (fullName === '' || customerId === '') {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    var customer = {
        fullName: fullName,
        customerId: customerId
    };

    // Lưu trữ dữ liệu khách hàng mới vào localStorage
    saveCustomerData(customer);

    // Thêm hàng mới vào bảng
    addRowToTable(customer);

    alert("Khách hàng đã được thêm thành công!");
    document.getElementById("addForm").reset();
}

function addRowToTable(customer) {
    var table = document.getElementById("customerTable").getElementsByTagName('tbody')[0];
    var row = table.insertRow(-1);
    var cellIndex = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3); // Thêm cell mới cho nút "Thêm"
    var cell4 = row.insertCell(4); // Thêm cell mới cho nút "Cập Nhật"

    cellIndex.innerHTML = table.rows.length;
    cell1.innerHTML = customer.fullName;
    cell2.innerHTML = customer.customerId;
    cell3.innerHTML = '<button onclick="editCustomer(this)">Sửa</button>'; // Nút "Sửa"
    cell4.innerHTML = '<button onclick="updateCustomer(this)">Cập Nhật</button>'; // Nút "Cập Nhật"
}

function hideAddForm() {
    document.getElementById("addCustomerForm").style.display = "none";
}

function showAddForm() {
    document.getElementById("addCustomerForm").style.display = "block";
}

function saveCustomerData(customer) {
    var customerData = JSON.parse(localStorage.getItem('customerData')) || [];
    customerData.push(customer);
    localStorage.setItem('customerData', JSON.stringify(customerData));
}

function loadCustomerData() {
    var customerData = JSON.parse(localStorage.getItem('customerData')) || [];
    customerData.forEach(function(customer) {
        addRowToTable(customer);
    });
}

function editCustomer(row) {
    var fullName = row.parentNode.parentNode.cells[1].innerHTML;
    var customerId = row.parentNode.parentNode.cells[2].innerHTML;

    document.getElementById("fullName").value = fullName;
    document.getElementById("customerId").value = customerId;
    showAddForm();
}

function exportToExcel() {
    var table = document.getElementById("customerTable");
    var csv = "";
    for (var i = 0; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            csv += table.rows[i].cells[j].innerHTML + ",";
        }
        csv += "\n";
    }

    var downloadLink = document.createElement("a");
    downloadLink.href = "data:application/csv," + encodeURIComponent(csv);
    downloadLink.download = "customer-data.csv";
    downloadLink.click();
}

window.onload = function() {
    loadCustomerData();
};
