document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard loading...'); // Debug log
    
    // Check if user is logged in
    const userString = localStorage.getItem('user');
    console.log('Stored user string:', userString); // Debug log
    
    const user = JSON.parse(userString);
    console.log('Parsed user object:', user); // Debug log
    
    if (!user || !user.id || !user.fullName) {
        console.error('Invalid or missing user data');
        localStorage.removeItem('user'); // Clear invalid data
        window.location.href = 'login.html';
        return;
    }

    // Update UI with user information
    try {
        document.getElementById('userName').textContent = user.fullName;
        document.getElementById('userNameDisplay').textContent = user.fullName;
        document.getElementById('membershipType').textContent = user.membershipType || 'Standard';
    } catch (error) {
        console.error('Error updating UI:', error);
    }

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });

    // Workout tracking functionality
    const workoutForm = document.getElementById('workoutForm');
    const workoutList = document.getElementById('workoutList');

    workoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!user.id) {
            alert('User session expired. Please login again.');
            window.location.href = 'login.html';
            return;
        }
        
        const workout = {
            userId: user.id, // No need to parse as integer if backend expects string
            type: document.getElementById('workoutType').value,
            duration: parseInt(document.getElementById('duration').value),
            date: new Date().toISOString()
        };

        try {
            const response = await fetch('http://localhost:8080/api/workouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(workout)
            });

            if (response.ok) {
                loadWorkouts();
                workoutForm.reset();
            } else {
                const error = await response.text();
                console.error('Error:', error);
                alert('Failed to save workout');
            }
        } catch (error) {
            console.error('Error logging workout:', error);
            alert('Failed to save workout');
        }
    });

    async function loadWorkouts() {
        if (!user.id) {
            console.error('No user ID available');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/workouts/${user.id}`);
            if (!response.ok) {
                throw new Error('Failed to load workouts');
            }
            const workouts = await response.json();
            
            workoutList.innerHTML = workouts
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map(workout => `
                    <div class="workout-item">
                        <div class="details">
                            <span>${workout.type}</span>
                            <span>${workout.duration} minutes</span>
                        </div>
                        <span class="date">${new Date(workout.date).toLocaleDateString()}</span>
                    </div>
                `)
                .join('');
        } catch (error) {
            console.error('Error loading workouts:', error);
        }
    }

    // Load workouts when dashboard loads
    loadWorkouts();

    // BMI Calculator
    const bmiForm = document.getElementById('bmiForm');
    const bmiResult = document.getElementById('bmiResult');

    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value) / 100; // convert to meters
        
        const bmi = weight / (height * height);
        let category, className;
        
        if (bmi < 18.5) {
            category = 'Underweight';
            className = 'warning';
        } else if (bmi < 25) {
            category = 'Healthy';
            className = 'healthy';
        } else if (bmi < 30) {
            category = 'Overweight';
            className = 'warning';
        } else {
            category = 'Obese';
            className = 'danger';
        }
        
        bmiResult.innerHTML = `
            <p>Your BMI: ${bmi.toFixed(1)}</p>
            <p>Category: ${category}</p>
        `;
        bmiResult.className = `bmi-result ${className}`;
    });

    // Nutrition Tracking
    const nutritionForm = document.getElementById('nutritionForm');
    const nutritionList = document.getElementById('nutritionList');
    let dailyNutrition = [];

    nutritionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nutrition = {
            userId: user.id,
            mealType: document.getElementById('mealType').value,
            calories: parseInt(document.getElementById('calories').value),
            protein: parseInt(document.getElementById('protein').value),
            date: new Date().toISOString()
        };

        dailyNutrition.push(nutrition);
        updateNutritionList();
        nutritionForm.reset();
    });

    function updateNutritionList() {
        const totalCalories = dailyNutrition.reduce((sum, item) => sum + item.calories, 0);
        const totalProtein = dailyNutrition.reduce((sum, item) => sum + item.protein, 0);
        
        nutritionList.innerHTML = `
            ${dailyNutrition.map(item => `
                <div class="nutrition-item">
                    <div class="meal-info">
                        <span class="meal-type">${item.mealType}</span>
                        <span>${item.calories} kcal</span>
                        <span>${item.protein}g protein</span>
                    </div>
                    <span class="meal-time">${new Date(item.date).toLocaleTimeString()}</span>
                </div>
            `).join('')}
            <div class="nutrition-summary">
                <p>Total Calories: ${totalCalories} kcal</p>
                <p>Total Protein: ${totalProtein}g</p>
            </div>
        `;
    }
});
