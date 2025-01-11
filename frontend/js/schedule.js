const API_URL = 'http://localhost:8080/api';

async function loadUserSchedule() {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
        const response = await fetch(`${API_URL}/schedule/${user.id}`);
        const schedules = await response.json();
        displaySchedules(schedules);
    } catch (error) {
        console.error('Error loading schedule:', error);
        showError('Failed to load schedule');
    }
}

function displaySchedules(schedules) {
    const scheduleList = document.getElementById('scheduleList');
    scheduleList.innerHTML = '';

    schedules.sort((a, b) => {
        const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
        return days.indexOf(a.dayOfWeek) - days.indexOf(b.dayOfWeek);
    });

    schedules.forEach(schedule => {
        const scheduleItem = document.createElement('div');
        scheduleItem.className = 'schedule-item';
        scheduleItem.innerHTML = `
            <div>
                <div class="workout-type">${schedule.workoutType}</div>
                <div class="time">${schedule.dayOfWeek}: ${schedule.startTime} - ${schedule.endTime}</div>
                <div class="notes">${schedule.notes || ''}</div>
            </div>
            <button onclick="deleteSchedule(${schedule.id})" class="delete-schedule">Delete</button>
        `;
        scheduleList.appendChild(scheduleItem);
    });
}

document.getElementById('scheduleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    
    const scheduleData = {
        userId: user.id,
        dayOfWeek: document.getElementById('scheduleDayOfWeek').value,
        startTime: document.getElementById('startTime').value,
        endTime: document.getElementById('endTime').value,
        workoutType: document.getElementById('scheduleWorkoutType').value,
        notes: document.getElementById('scheduleNotes').value
    };

    try {
        const response = await fetch(`${API_URL}/schedule`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scheduleData)
        });

        if (response.ok) {
            loadUserSchedule();
            e.target.reset();
        } else {
            showError('Failed to add schedule');
        }
    } catch (error) {
        console.error('Error adding schedule:', error);
        showError('Failed to add schedule');
    }
});

async function deleteSchedule(scheduleId) {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
        const response = await fetch(`${API_URL}/schedule/${user.id}/${scheduleId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadUserSchedule();
        } else {
            showError('Failed to delete schedule');
        }
    } catch (error) {
        console.error('Error deleting schedule:', error);
        showError('Failed to delete schedule');
    }
}

function showError(message) {
    // Implement error display logic here
    alert(message);
}
