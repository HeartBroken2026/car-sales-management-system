let customers = JSON.parse(localStorage.getItem("customers")) || [];
let cars = JSON.parse(localStorage.getItem("cars")) || [];

const salesTable = document.getElementById("salesTable");
const carSelect = document.getElementById("carSelect");

/* Populate available cars */
function loadCars() {
  carSelect.innerHTML = "";
  cars.filter(c => c.type && c.price).forEach(car => {
    const option = document.createElement("option");
    option.value = car.id;
    option.textContent = `${car.make} ${car.model}`;
    carSelect.appendChild(option);
  });
}

/* Save customers */
function saveCustomers() {
  localStorage.setItem("customers", JSON.stringify(customers));
}

/* Render table */
function renderSales() {
  salesTable.innerHTML = "";

  customers.forEach((cust, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${cust.name}</td>
      <td>${cust.phone}</td>
      <td>${cust.car}</td>
      <td>${cust.status}</td>
      <td>
        ${
          cust.status === "Pending"
            ? `<button class="btn" onclick="markSold(${index})">Mark Sold</button>`
            : `—`
        }
      </td>
    `;

    salesTable.appendChild(row);
  });
}

/* Add customer */
function addCustomer() {
  const name = customerName.value.trim();
  const phone = customerPhone.value.trim();
  const carId = carSelect.value;

  if (!name || !phone || !carId) {
    alert("Fill all fields");
    return;
  }

  const car = cars.find(c => c.id == carId);

  customers.push({
    name,
    phone,
    car: `${car.make} ${car.model}`,
    status: "Pending"
  });

  saveCustomers();
  renderSales();

  customerName.value = customerPhone.value = "";
}

/* Mark sale complete */
function markSold(index) {
  customers[index].status = "Sold";
  saveCustomers();
  renderSales();
}

/* Init */
loadCars();
renderSales();
