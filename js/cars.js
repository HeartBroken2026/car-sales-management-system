/* js/cars.js */

// Initialize Data
let cars = JSON.parse(localStorage.getItem("cars")) || [];

// Main Functions
function addCar() {
    // Get values from DOM elements
    const makeInput = document.getElementById('makeInput');
    const modelInput = document.getElementById('modelInput');
    const priceInput = document.getElementById('priceInput');
    const typeInput = document.getElementById('typeInput');

    const make = makeInput.value;
    const model = modelInput.value;
    const price = Number(priceInput.value);
    const type = typeInput.value;

    if (!make || !model || !price) return alert("Fill all fields");

    cars.push({
        id: Date.now(),
        make,
        model,
        year: new Date().getFullYear(),
        price,
        type,
        img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=60"
    });

    saveCars();
    renderCars(cars);

    // Clear Inputs
    makeInput.value = "";
    modelInput.value = "";
    priceInput.value = "";
}

function deleteCar(id) {
    cars = cars.filter(c => c.id !== id);
    saveCars();
    renderCars(cars);
}

function renderCars(filteredList) {
    const grid = document.getElementById('carGrid');
    if(!grid) return; // Guard clause in case function is called on wrong page
    
    grid.innerHTML = '';

    filteredList.forEach((car, index) => {
        const card = document.createElement('div');
        card.className = 'car-card';
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="img-container">
                <span class="badge">${car.year}</span>
                <img src="${car.img}" alt="${car.make} ${car.model}">
            </div>
            <div class="car-details">
                <small>${car.type}</small>
                <h3>${car.make} ${car.model}</h3>
                <p class="price">$${car.price.toLocaleString()}</p>
                <div class="action-group">
                    <button class="btn btn-text">view details</button>

                    <button class="btn btn-icon" onclick="deleteCar(${car.id})" aria-label="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function saveCars() {
    localStorage.setItem("cars", JSON.stringify(cars));
}

function filterCars() {
    const searchBox = document.getElementById('searchBox');
    const typeFilter = document.getElementById('typeFilter');
    
    // Guard clause
    if(!searchBox || !typeFilter) return;

    const search = searchBox.value.toLowerCase();
    const type = typeFilter.value;

    const filtered = cars.filter(car => {
        const matchesSearch = car.make.toLowerCase().includes(search) || car.model.toLowerCase().includes(search);
        const matchesType = type === 'all' || car.type === type;
        return matchesSearch && matchesType;
    });

    renderCars(filtered);
}

// Event Listeners initialization
window.addEventListener('DOMContentLoaded', () => {
    // Only init if we are on the page with these elements
    const searchBox = document.getElementById('searchBox');
    const typeFilter = document.getElementById('typeFilter');
    
    if(searchBox) searchBox.addEventListener('input', filterCars);
    if(typeFilter) typeFilter.addEventListener('change', filterCars);

    renderCars(cars);
});