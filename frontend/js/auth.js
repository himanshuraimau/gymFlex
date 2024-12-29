const API_URL = 'http://localhost:8080/api/auth';

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
            alert('Signup successful!');
            window.location.href = 'login.html';
        } else {
            alert(data || 'Signup failed');
        }
    } catch (error) {
        alert('Error during signup');
        console.error('Error:', error);
    }
}

async function handleLogin(event) {
    event.preventDefault();
    
    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Login successful!');
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = 'dashboard.html';
        } else {
            alert(data || 'Login failed');
        }
    } catch (error) {
        alert('Error during login');
        console.error('Error:', error);
    }
}
