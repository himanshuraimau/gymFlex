document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Update UI with user information
    document.getElementById('userName').textContent = user.fullName;
    document.getElementById('userNameDisplay').textContent = user.fullName;
    document.getElementById('membershipType').textContent = user.membershipType;
    
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });
});
