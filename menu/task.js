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
    const MAX_CHARS = 20;

    // Prevent wheel scrolling
    tasksContent.addEventListener('wheel', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Scroll buttons
    taskPrevBtn.addEventListener('click', function() {
        tasksContent.scrollBy({ top: -50, behavior: 'smooth' });
    });
    
    taskNextBtn.addEventListener('click', function() {
        tasksContent.scrollBy({ top: 50, behavior: 'smooth' });
    });
    
    // Toggle task menu
    taskAddBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (taskMenu.classList.contains('show')) {
            closeTaskMenu();
        } else {
            taskMenu.style.display = 'block';
            setTimeout(() => {
                taskMenu.classList.add('show');
                taskDescriptionInput.focus();
            }, 10);
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!taskMenu.contains(event.target) && event.target !== taskAddBtn && taskMenu.classList.contains('show')) {
            closeTaskMenu();
        }
    });
    
    // Close menu function
    function closeTaskMenu() {
        taskMenu.classList.remove('show');
        setTimeout(() => {
            taskMenu.style.display = 'none';
            taskDescriptionInput.value = '';
            charCounter.textContent = `0/${MAX_CHARS}`;
            charCounter.classList.remove('limit-exceeded');
            errorMessage.classList.remove('show');
            taskDescriptionInput.classList.remove('error');
        }, 300);
    }
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && taskMenu.classList.contains('show')) {
            closeTaskMenu();
        }
    });

    // Character counter and validation
    taskDescriptionInput.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCounter.textContent = `${currentLength}/${MAX_CHARS}`;
        
        if (currentLength > MAX_CHARS) {
            charCounter.classList.add('limit-exceeded');
            this.classList.add('error');
            errorMessage.classList.add('show');
        } else {
            charCounter.classList.remove('limit-exceeded');
            this.classList.remove('error');
            errorMessage.classList.remove('show');
        }
    });

    // Prevent typing beyond the limit
    taskDescriptionInput.addEventListener('keydown', function(e) {
        if (this.value.length >= MAX_CHARS && 
            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key) &&
            !e.ctrlKey && 
            !e.metaKey) {
            e.preventDefault();
            this.classList.add('error');
            charCounter.classList.add('limit-exceeded');
            errorMessage.classList.add('show');
        }
    });

    // Clear error state on focus
    taskDescriptionInput.addEventListener('focus', function() {
        if (this.value.length <= MAX_CHARS) {
            this.classList.remove('error');
            errorMessage.classList.remove('show');
            charCounter.classList.remove('limit-exceeded');
        }
    });

    // Initial empty state check
    emptyState.style.display = tasksContent.children.length > 1 ? 'none' : 'flex';
});