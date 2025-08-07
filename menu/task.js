document.addEventListener('DOMContentLoaded', function() {
    const tasksContent = document.getElementById('tasks-content');
    const taskPrevBtn = document.getElementById('task-prev');
    const taskNextBtn = document.getElementById('task-next');
    const taskAddBtn = document.getElementById('task-add');
    const emptyState = document.getElementById('emptyState');
    const taskMenu = document.getElementById('task-menu');
    const taskDescriptionInput = document.querySelector('.task-description-input');
    const charCounter = document.querySelector('.char-counter');
    const errorMessage = document.querySelector('.error-message');
    const taskCloseBtn = document.querySelector('.task-menu .nav-button.round.close');
    const MAX_CHARS = 20;

    const reminderToggle = document.getElementById('reminder-toggle');
    const reminderOptions = document.getElementById('reminder-options');
    const reminderTime = document.getElementById('reminder-time');
    const repeatOption = document.querySelector('.reminder-option:last-child .option-value');

    const reminderTimeMenu = document.getElementById('reminder-time-menu');
    const repeatMenu = document.getElementById('repeat-menu');
    
    const cancelTimeBtn = reminderTimeMenu.querySelector('.reminder-action-btn.cancel');
    const continueTimeBtn = reminderTimeMenu.querySelector('.reminder-action-btn.continue');
    const repeatOptions = repeatMenu.querySelectorAll('.repeat-option');
    const repeatOptionsContainer = repeatMenu.querySelector('.repeat-options');
    const repeatCloseBtn = repeatMenu.querySelector('.nav-button.round.close');
    
    let selectedRepeatOption = 'once';
    updateRepeatOptionText();

    // Prevent scrolling on these elements
    tasksContent.addEventListener('wheel', function(e) {
        e.preventDefault();
    });

    if (repeatOptionsContainer) {
        repeatOptionsContainer.addEventListener('wheel', function(e) {
            e.preventDefault();
        });
    }
    
    // Task navigation buttons
    taskPrevBtn.addEventListener('click', function() {
        tasksContent.scrollBy({ top: -50, behavior: 'smooth' });
    });
    
    taskNextBtn.addEventListener('click', function() {
        tasksContent.scrollBy({ top: 50, behavior: 'smooth' });
    });
    
    // Task menu toggle
    taskAddBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (taskMenu.classList.contains('show')) {
            closeTaskMenu();
        } else {
            openTaskMenu();
        }
    });
    
    taskCloseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeTaskMenu();
    });
    
    function openTaskMenu() {
        taskMenu.style.display = 'block';
        setTimeout(() => {
            taskMenu.classList.add('show');
            taskDescriptionInput.focus();
        }, 10);
    }
    
    function closeTaskMenu() {
        taskMenu.classList.remove('show');
        setTimeout(() => {
            taskMenu.style.display = 'none';
            resetTaskInput();
        }, 300);
    }
    
    function resetTaskInput() {
        taskDescriptionInput.value = '';
        charCounter.textContent = `0/${MAX_CHARS}`;
        charCounter.classList.remove('limit-exceeded');
        if (errorMessage) errorMessage.classList.remove('show');
        taskDescriptionInput.classList.remove('error');
        reminderToggle.checked = false;
        reminderOptions.style.display = 'none';
    }

    // Task input validation
    taskDescriptionInput.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCounter.textContent = `${currentLength}/${MAX_CHARS}`;
        
        if (currentLength > MAX_CHARS) {
            charCounter.classList.add('limit-exceeded');
            this.classList.add('error');
            if (errorMessage) errorMessage.classList.add('show');
        } else {
            charCounter.classList.remove('limit-exceeded');
            this.classList.remove('error');
            if (errorMessage) errorMessage.classList.remove('show');
        }
    });

    taskDescriptionInput.addEventListener('keydown', function(e) {
        if (this.value.length >= MAX_CHARS && 
            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key) &&
            !e.ctrlKey && 
            !e.metaKey) {
            e.preventDefault();
            this.classList.add('error');
            charCounter.classList.add('limit-exceeded');
            if (errorMessage) errorMessage.classList.add('show');
        }
    });

    taskDescriptionInput.addEventListener('focus', function() {
        if (this.value.length <= MAX_CHARS) {
            this.classList.remove('error');
            if (errorMessage) errorMessage.classList.remove('show');
            charCounter.classList.remove('limit-exceeded');
        }
    });

    // Reminder toggle
    reminderToggle.addEventListener('change', function() {
        if (this.checked) {
            reminderOptions.style.display = 'block';
            updateReminderTime();
        } else {
            reminderOptions.style.display = 'none';
        }
    });

    function updateReminderTime() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        reminderTime.textContent = `${day}.${month} ${hours}:${minutes}`;
    }

    // Reminder time menu
    reminderTime.addEventListener('click', function(e) {
        e.stopPropagation();
        if (reminderToggle.checked) {
            reminderTimeMenu.style.display = 'block';
            setTimeout(() => {
                reminderTimeMenu.classList.add('show');
            }, 10);
        }
    });

    // Repeat option click handler
    repeatOption.addEventListener('click', function(e) {
        e.stopPropagation();
        if (reminderToggle.checked) {
            openRepeatMenu();
        }
    });

    function openRepeatMenu() {
        repeatMenu.style.display = 'block';
        setTimeout(() => {
            repeatMenu.classList.add('show');
        }, 10);
        
        // Highlight selected option
        repeatOptions.forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.value === selectedRepeatOption) {
                option.classList.add('selected');
            }
        });
    }

    function closeReminderTimeMenu() {
        reminderTimeMenu.classList.remove('show');
        setTimeout(() => {
            reminderTimeMenu.style.display = 'none';
        }, 300);
    }

    function closeRepeatMenu() {
        repeatMenu.classList.remove('show');
        setTimeout(() => {
            repeatMenu.style.display = 'none';
        }, 300);
    }

    // Reminder time menu buttons
    cancelTimeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeReminderTimeMenu();
    });

    continueTimeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeReminderTimeMenu();
    });

    // New repeat menu close button
    repeatCloseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeRepeatMenu();
    });

    // Repeat options selection - now applies immediately on click
    repeatOptions.forEach(option => {
        option.addEventListener('click', function() {
            repeatOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedRepeatOption = this.dataset.value;
            updateRepeatOptionText();
            closeRepeatMenu(); // Close menu after selection
        });
    });

    function updateRepeatOptionText() {
        let text = 'One time';
        switch(selectedRepeatOption) {
            case 'daily':
                text = 'Every day';
                break;
            case 'weekly':
                text = 'Every week';
                break;
            case 'monthly':
                text = 'Every month';
                break;
            case 'yearly':
                text = 'Every year';
                break;
        }
        repeatOption.textContent = text;
    }

    // Repeat options scroll buttons (if needed)
    const repeatPrevBtn = repeatMenu.querySelector('.nav-button.round.prev');
    const repeatNextBtn = repeatMenu.querySelector('.nav-button.round.next');

    if (repeatPrevBtn && repeatNextBtn && repeatOptionsContainer) {
        repeatPrevBtn.addEventListener('click', function() {
            repeatOptionsContainer.scrollBy({ top: -50, behavior: 'smooth' });
        });

        repeatNextBtn.addEventListener('click', function() {
            repeatOptionsContainer.scrollBy({ top: 50, behavior: 'smooth' });
        });
    }
    
    // Show empty state if no tasks
    emptyState.style.display = tasksContent.children.length > 1 ? 'none' : 'flex';
    
});
