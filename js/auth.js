
/**
 * Authentication Service
 * Handles user login and session management using localStorage
 * Admin System Version
 */

const Auth = {
    /**
     * Initialize default admin if not exists
     */
    init: () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const adminEmail = 'admin@stellar.com';

        if (!users.find(u => u.email === adminEmail)) {
            const adminUser = {
                id: 'admin_001',
                name: 'System Admin',
                email: adminEmail,
                password: 'admin123', // Hardcoded for demo/local usage
                type: 'admin',
                createdAt: new Date().toISOString()
            };
            users.push(adminUser);
            localStorage.setItem('users', JSON.stringify(users));
            console.log('Default admin initialized');
        }
    },

    /**
     * Login user
     * @param {string} email 
     * @param {string} password 
     * @returns {object} result { success, message, user }
     */
    login: (email, password) => {
        Auth.init(); // Ensure admin exists

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, message: 'Invalid credentials' };
        }

        // Save current user to session
        const sessionUser = { ...user };
        delete sessionUser.password;
        localStorage.setItem('currentUser', JSON.stringify(sessionUser));

        return { success: true, user: sessionUser };
    },

    /**
     * Logout user
     */
    logout: () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    },

    /**
     * Get current logged in user
     * @returns {object|null}
     */
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('currentUser'));
    },

    /**
     * Check if user is authenticated
     * @returns {boolean}
     */
    isAuthenticated: () => {
        return !!localStorage.getItem('currentUser');
    },

    /**
     * Enforce authentication on protected pages
     */
    requireAuth: () => {
        if (!Auth.isAuthenticated()) {
            window.location.href = 'login.html';
        }
    },

    /**
     * Initialize Theme
     */
    initTheme: () => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
    },

    /**
     * Toggle Theme
     */
    toggleTheme: () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        return newTheme;
    }
};

// Initialize on load
Auth.init();
Auth.initTheme();

// Export to window for global access
window.Auth = Auth;
