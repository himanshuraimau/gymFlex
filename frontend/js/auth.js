const API_URL = 'http://localhost:8080/api/auth';

function showNotification(message, type) {
    // Create toast container if it doesn't exist
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Add icon
    const icon = document.createElement('span');
    icon.className = 'toast-icon';
    
    // Add message
    const messageElement = document.createElement('span');
    messageElement.className = 'toast-message';
    messageElement.textContent = message;

    // Add progress bar
    const progress = document.createElement('div');
    progress.className = 'toast-progress';

    // Assemble toast
    toast.appendChild(icon);
    toast.appendChild(messageElement);
    toast.appendChild(progress);
    container.appendChild(toast);

    // Custom messages for success
    if (type === 'success') {
        const successMessages = [
            "You're awesome! 🌟",
            "Great job! 💪",
            "Success looks good on you! ✨",
            "Nailed it! 🎯",
            "You rock! 🚀"
        ];
        messageElement.textContent = `${successMessages[Math.floor(Math.random() * successMessages.length)]} ${message}`;
    }

    // Remove toast after animation
    setTimeout(() => {
        toast.style.animation = 'slide-out 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

async function handleSignup(event) {
    event.preventDefault();
    
    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        fullName: document.getElementById('fullName').value,
        membershipType: document.getElementById('membershipType').value
    };

    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (response.ok) {
            showNotification('Signup successful!', 'success');
            window.location.href = 'login.html';
        } else {
            showNotification(data || 'Signup failed', 'error');
        }
    } catch (error) {
        showNotification('Error during signup', 'error');
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:8080/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log('Login response:', data); // Debug log

                if (response.ok && data.user) {
                    // Store the complete user object
                    const userData = {
                        id: data.user.id,
                        email: data.user.email,
                        fullName: data.user.fullName,
                        membershipType: data.user.membershipType
                    };

                    console.log('Storing user data:', userData); // Debug log
                    localStorage.setItem('user', JSON.stringify(userData));

                    // Verify storage
                    const storedUser = localStorage.getItem('user');
                    console.log('Stored user data:', storedUser); // Debug log

                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    console.error('Login failed:', data.message);
                    alert(data.message || 'Login failed');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred during login');
            }
        });
    }

    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // ...existing signup code...
});
