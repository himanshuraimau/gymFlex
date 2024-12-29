// frontend/js/login.js
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = 'Loading...';
        
        const loginData = {
            email: document.getElementById('loginEmail').value.trim(),
            password: document.getElementById('loginPassword').value
        };
        
        try {
            if (!loginData.email || !loginData.password) {
                throw new Error('Please fill in all fields');
            }

            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                showNotification('Login successful!', 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 1000);
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification(error.message, 'error');
        } finally {
            button.disabled = false;
            button.textContent = originalText;
        }
    });
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// frontend/js/signup.js
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const signupData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        membershipType: document.getElementById('membershipType').value
    };
    
    try {
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Signup successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert(data.message || 'Signup failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Signup failed');
    }
});