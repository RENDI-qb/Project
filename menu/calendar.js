document.addEventListener('DOMContentLoaded', function() {
    const daysContainer = document.getElementById('days');
    const monthYearElement = document.querySelector('.month-year');
    const [prevButton, nextButton] = document.querySelectorAll('.nav-button.round');
    
    let currentDate = new Date();
    currentDate.setDate(1);
    
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const today = new Date();
        
        monthYearElement.textContent = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric'
        }).format(currentDate);
        
        daysContainer.innerHTML = '';
        
        let firstDay = new Date(year, month, 1).getDay() - 1;
        if (firstDay < 0) firstDay = 6;
        
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        let dayCount = 1;
        let nextMonthDayCount = 1;
        
        for (let i = 0; i < 42; i++) {
            const dayElement = document.createElement('div');
            
            if (i < firstDay) {
                const prevDay = daysInPrevMonth - (firstDay - 1 - i);
                dayElement.textContent = prevDay;
                dayElement.classList.add('other-month');
            } else if (dayCount > daysInMonth) {
                dayElement.textContent = nextMonthDayCount;
                dayElement.classList.add('other-month');
                nextMonthDayCount++;
            } else {
                dayElement.textContent = dayCount;
                
                if (dayCount === today.getDate() && 
                    month === today.getMonth() && 
                    year === today.getFullYear()) {
                    dayElement.classList.add('today');
                }
                
                dayCount++;
            }
            
            daysContainer.appendChild(dayElement);
        }
    }
    
    prevButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    renderCalendar();
});