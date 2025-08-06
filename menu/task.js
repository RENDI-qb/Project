document.addEventListener('DOMContentLoaded', function() {
    const tasksContent = document.getElementById('tasks-content');
    const taskPrevBtn = document.getElementById('task-prev');
    const taskNextBtn = document.getElementById('task-next');
    const emptyState = document.getElementById('emptyState');
    
    tasksContent.addEventListener('wheel', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    taskPrevBtn.addEventListener('click', function() {
        tasksContent.scrollBy({ top: -50, behavior: 'smooth' });
    });
    
    taskNextBtn.addEventListener('click', function() {
        tasksContent.scrollBy({ top: 50, behavior: 'smooth' });
    });
    
    function checkEmptyState() {
        const hasTasks = tasksContent.children.length > 1 || 
                        (tasksContent.children.length === 1 && 
                         !tasksContent.children[0].classList.contains('empty-state'));
        
        if (emptyState) {
            emptyState.style.display = hasTasks ? 'none' : 'flex';
        }
    }
    
    function addTask(text) {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.textContent = text;
        tasksContent.insertBefore(taskElement, emptyState);
        checkEmptyState();
    }
    
    function clearTasks() {
        const tasks = document.querySelectorAll('.task-item');
        tasks.forEach(task => task.remove());
        checkEmptyState();
    }
    
    checkEmptyState();
    
});