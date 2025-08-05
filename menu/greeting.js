document.addEventListener('DOMContentLoaded', function() {
    const greetingElement = document.getElementById('greeting');
    const hour = new Date().getHours();
    let greeting;
    
    if (hour >= 5 && hour < 12) {
        greeting = "Good morning";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Good afternoon";
    } else if (hour >= 18 && hour < 23) {
        greeting = "Good evening";
    } else {
        greeting = "Good night";
    }
    
    greetingElement.textContent = greeting;
});