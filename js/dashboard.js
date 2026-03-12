
/**
 * Dashboard Logic
 * Handles data fetching and UI updates for the dashboard
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check Authentication
    Auth.requireAuth();

    // Load User Info
    const user = Auth.getCurrentUser();
    if (user) {
        document.getElementById('userName').textContent = user.name;
    }

    // Fetch Real Data from LocalStorage
    const cars = JSON.parse(localStorage.getItem('cars') || '[]');
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');

    const totalCars = cars.length;
    const carsSold = customers.filter(c => c.status === 'Sold').length;
    const totalCustomers = customers.length;

    const dashboardData = {
        totalCars,
        carsSold,
        customers: totalCustomers
    };

    // Populate Dashboard Cards
    updateDashboardCards(dashboardData);

    // Logout Handler
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        Auth.logout();
    });

    // Theme Toggle Handler
    document.getElementById('themeToggle').addEventListener('click', () => {
        Auth.toggleTheme();
    });
});

/**
 * Update dashboard card values
 * @param {object} data 
 */
function updateDashboardCards(data) {
    animateValue(document.getElementById('totalCars'), 0, data.totalCars, 800);
    animateValue(document.getElementById('carsSold'), 0, data.carsSold, 800);
    animateValue(document.getElementById('totalCustomers'), 0, data.customers, 800);
}

/**
 * Animate number counting up
 * @param {HTMLElement} obj 
 * @param {number} start 
 * @param {number} end 
 * @param {number} duration 
 */
function animateValue(obj, start, end, duration) {
    if (!obj) return;
    if (start === end) {
        obj.innerHTML = end;
        return;
    }
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end; // Ensure final value is exact
        }
    };
    window.requestAnimationFrame(step);
}
