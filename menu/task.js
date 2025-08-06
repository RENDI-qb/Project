document.addEventListener('DOMContentLoaded', function() {
    const tasksContent = document.getElementById('tasks-content');
    const taskPrevBtn = document.getElementById('task-prev');
    const taskNextBtn = document.getElementById('task-next');
    const taskAddBtn = document.getElementById('task-add');
    const emptyState = document.getElementById('emptyState');
    const taskMenu = document.getElementById('task-menu');
    
    // Prevent wheel scrolling
    tasksContent.addEventListener('wheel', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Scroll up button
    taskPrevBtn.addEventListener('click', function() {
        tasksContent.scrollBy({ top: -50, behavior: 'smooth' });
    });
    
    // Scroll down button
    taskNextBtn.addEventListener('click', function() {
        tasksContent.scrollBy({ top: 50, behavior: 'smooth' });
    });
    
    // Toggle task menu with fade animation
    taskAddBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (taskMenu.classList.contains('show')) {
            // Fade out animation
            taskMenu.classList.remove('show');
            setTimeout(() => {
                taskMenu.style.display = 'none';
            }, 300); // Match this with CSS transition duration
        } else {
            // Fade in animation
            taskMenu.style.display = 'block';
            setTimeout(() => {
                taskMenu.classList.add('show');
            }, 10);
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!taskMenu.contains(event.target) && event.target !== taskAddBtn && taskMenu.classList.contains('show')) {
            taskMenu.classList.remove('show');
            setTimeout(() => {
                taskMenu.style.display = 'none';
            }, 300);
        }
    });
    
    // Check if tasks list is empty
    function checkEmptyState() {
        const hasTasks = tasksContent.children.length > 1 || 
                        (tasksContent.children.length === 1 && 
                         !tasksContent.children[0].classList.contains('empty-state'));
        
        if (emptyState) {
            emptyState.style.display = hasTasks ? 'none' : 'flex';
        }
    }
    
    // Close menu when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && taskMenu.classList.contains('show')) {
            taskMenu.classList.remove('show');
            setTimeout(() => {
                taskMenu.style.display = 'none';
            }, 300);
        }
    });
    
    // Initial check
    checkEmptyState();
});