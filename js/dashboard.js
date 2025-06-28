document.addEventListener('DOMContentLoaded', function() {
    // Pay Dues logic
    const payBtn = document.getElementById('payDueBtn');
    const overlay = document.getElementById('paymentSuccessOverlay');
    // Select the charge rows (all except the last li)
    const chargeRows = document.querySelectorAll('.suggestion ul li:not(:last-child)');
    const totalDueSpan = document.querySelector('.suggestion ul li:last-child span');

    if (payBtn && overlay && chargeRows.length && totalDueSpan) {
        payBtn.addEventListener('click', function() {
            // Show the checkmark overlay
            overlay.classList.add('active');
            // Hide all charge rows except Total Due
            chargeRows.forEach(row => row.style.display = 'none');
            // Set Total Due to $0.00
            totalDueSpan.textContent = ' $0.00';
            setTimeout(() => {
                overlay.classList.remove('active');
            }, 1200); // Show for 1.2 seconds
        });
    }

    // Next Appointment calendar interactivity
    const appointmentText = document.getElementById('appointmentText');
    const calendar = document.getElementById('miniCalendar');
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Helper to get the day of week for June 2025
    function getDayOfWeek(day) {
        const date = new Date(2025, 5, day); // Month is 0-indexed, so 5 = June
        return daysOfWeek[date.getDay()];
    }

    // Helper to get ordinal suffix
    function getOrdinal(n) {
        if (n > 3 && n < 21) return n + "th";
        switch (n % 10) {
            case 1: return n + "st";
            case 2: return n + "nd";
            case 3: return n + "rd";
            default: return n + "th";
        }
    }

    // Reset to 16th on load
    function resetCalendarHighlight() {
        document.querySelectorAll('.calendar-day').forEach(el => {
            el.classList.remove('highlight');
        });
        const day16 = document.querySelector('.calendar-day[data-day="16"]');
        if (day16) day16.classList.add('highlight');
        if (appointmentText) appointmentText.textContent = "Monday, June 16th, 2025 at 1:00 PM";
    }

    resetCalendarHighlight();

    // Add click listeners to all days with data-day
    if (calendar) {
        calendar.querySelectorAll('.calendar-day').forEach(function(cell) {
            cell.style.cursor = "pointer";
            cell.addEventListener('click', function() {
                // Remove highlight from all
                calendar.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('highlight'));
                // Add highlight to clicked
                cell.classList.add('highlight');
                // Update appointment text
                const day = parseInt(cell.getAttribute('data-day'));
                if (!isNaN(day)) {
                    const dow = getDayOfWeek(day);
                    const ord = getOrdinal(day);
                    appointmentText.textContent = `${dow}, June ${ord}, 2025 at 1:00 PM`;
                }
                // Show the checkmark overlay for appointment change
                if (overlay) {
                    overlay.classList.add('active');
                    setTimeout(() => {
                        overlay.classList.remove('active');
                    }, 1200);
                }
            });
        });
    }
});