const API_URL = 'http://localhost:8080/api';

class NutritionTracker {
    constructor() {
        this.nutritionList = document.getElementById('nutritionList');
        this.nutritionForm = document.getElementById('nutritionForm');
        this.setupEventListeners();
        this.loadNutrition();
        this.displayUserName();
    }

    setupEventListeners() {
        this.nutritionForm.addEventListener('submit', (e) => this.handleNutritionSubmit(e));
    }

    async loadNutrition() {
        const user = this.getUser();
        if (!user) return;

        this.showLoading();
        try {
            const response = await fetch(`${API_URL}/nutrition/user/${user.id}`, {
                headers: { 
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) throw new Error('Failed to load nutrition data');
            const nutrition = await response.json();
            this.displayNutrition(nutrition);
        } catch (error) {
            this.showError('Error loading nutrition data');
            console.error('Error:', error);
        } finally {
            this.hideLoading();
        }
    }

    displayNutrition(nutritionData) {
        this.nutritionList.innerHTML = nutritionData.length ? '' : '<p>No nutrition data yet</p>';

        nutritionData.forEach(nutrition => {
            const nutritionItem = this.createNutritionItem(nutrition);
            this.nutritionList.appendChild(nutritionItem);
        });
    }

    createNutritionItem(nutrition) {
        const item = document.createElement('div');
        item.className = 'nutrition-item';
        item.innerHTML = `
            <div class="nutrition-date">${this.formatDate(nutrition.date)}</div>
            <div class="nutrition-details">
                <div class="nutrition-stat">Meal: ${nutrition.mealType}</div>
                <div class="nutrition-stat">Calories: ${nutrition.calories} kcal</div>
                <div class="nutrition-stat">Protein: ${nutrition.protein} g</div>
                <div class="nutrition-stat">Carbs: ${nutrition.carbs} g</div>
                <div class="nutrition-stat">Fats: ${nutrition.fats} g</div>
            </div>
        `;
        return item;
    }

    async handleNutritionSubmit(e) {
        e.preventDefault();
        const user = this.getUser();
        if (!user) return;

        const formData = this.getNutritionFormData();
        try {
            const response = await fetch(`${API_URL}/nutrition/save`, {  // Updated endpoint
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ ...formData, userId: user.id })  // Remove credentials
            });

            if (!response.ok) throw new Error('Failed to save nutrition data');

            const savedData = await response.json();
            await this.loadNutrition();
            this.nutritionForm.reset();
            this.showSuccess('Nutrition data saved successfully');
        } catch (error) {
            this.showError('Error saving nutrition data');
            console.error('Error:', error);
        }
    }

    getNutritionFormData() {
        return {
            date: document.getElementById('mealDate').value,
            mealType: document.getElementById('mealType').value,
            calories: parseFloat(document.getElementById('mealCalories').value),
            protein: parseFloat(document.getElementById('mealProtein').value),
            carbs: parseFloat(document.getElementById('mealCarbs').value),
            fats: parseFloat(document.getElementById('mealFats').value)
        };
    }

    // Helper methods
    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    showLoading() {
        this.nutritionList.innerHTML = '<div class="loading">Loading...</div>';
    }

    hideLoading() {
        const loading = this.nutritionList.querySelector('.loading');
        if (loading) loading.remove();
    }

    showError(message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        this.nutritionList.prepend(error);
        setTimeout(() => error.remove(), 3000);
    }

    showSuccess(message) {
        const success = document.createElement('div');
        success.className = 'success';
        success.textContent = message;
        this.nutritionList.prepend(success);
        setTimeout(() => success.remove(), 3000);
    }

    displayUserName() {
        const user = this.getUser();
        if (user) {
            document.getElementById('userName').textContent = user.fullName;
        }
    }
}

// Initialize the nutrition tracker
new NutritionTracker();
