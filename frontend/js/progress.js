const API_URL = 'http://localhost:8080/api';

class ProgressTracker {
    constructor() {
        this.progressList = document.getElementById('progressList');
        this.progressForm = document.getElementById('progressForm');
        this.setupEventListeners();
        this.loadProgress();
        this.displayUserName();
    }

    setupEventListeners() {
        this.progressForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async loadProgress() {
        const user = this.getUser();
        if (!user) return;

        this.showLoading();
        try {
            const response = await fetch(`${API_URL}/progress/${user.id}`);
            if (!response.ok) throw new Error('Failed to load progress');
            
            const progress = await response.json();
            this.displayProgress(progress);
        } catch (error) {
            this.showError('Error loading progress data');
            console.error('Error:', error);
        } finally {
            this.hideLoading();
        }
    }

    displayProgress(progressData) {
        this.progressList.innerHTML = progressData.length ? '' : '<p>No progress data yet</p>';

        progressData.forEach(progress => {
            const progressItem = this.createProgressItem(progress);
            this.progressList.appendChild(progressItem);
        });
    }

    createProgressItem(progress) {
        const item = document.createElement('div');
        item.className = 'progress-item';
        item.innerHTML = `
            <div class="progress-date">${this.formatDate(progress.date)}</div>
            <div class="progress-details">
                <div class="progress-stat">Weight: ${progress.weight} kg</div>
                ${progress.bodyFat ? `<div class="progress-stat">Body Fat: ${progress.bodyFat}%</div>` : ''}
                ${progress.muscleGain ? `<div class="progress-stat">Muscle Gain: ${progress.muscleGain}kg</div>` : ''}
                ${progress.notes ? `<div class="progress-notes">${progress.notes}</div>` : ''}
            </div>
        `;
        return item;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const user = this.getUser();
        if (!user) return;

        const formData = this.getFormData();
        try {
            const response = await fetch(`${API_URL}/progress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, userId: user.id })
            });

            if (!response.ok) throw new Error('Failed to save progress');

            await this.loadProgress();
            this.progressForm.reset();
            this.showSuccess('Progress saved successfully');
        } catch (error) {
            this.showError('Error saving progress');
            console.error('Error:', error);
        }
    }

    // Helper methods
    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getFormData() {
        return {
            date: document.getElementById('progressDate').value,
            weight: parseFloat(document.getElementById('progressWeight').value),
            bodyFat: parseFloat(document.getElementById('progressBodyFat').value) || null,
            muscleGain: parseFloat(document.getElementById('progressMuscleGain').value) || null,
            notes: document.getElementById('progressNotes').value
        };
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    showLoading() {
        this.progressList.innerHTML = '<div class="loading">Loading...</div>';
    }

    hideLoading() {
        const loading = this.progressList.querySelector('.loading');
        if (loading) loading.remove();
    }

    showError(message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        this.progressList.prepend(error);
        setTimeout(() => error.remove(), 3000);
    }

    showSuccess(message) {
        const success = document.createElement('div');
        success.className = 'success';
        success.textContent = message;
        this.progressList.prepend(success);
        setTimeout(() => success.remove(), 3000);
    }

    displayUserName() {
        const user = this.getUser();
        if (user) {
            document.getElementById('userName').textContent = user.fullName;
        }
    }
}

// Initialize the progress tracker
new ProgressTracker();
