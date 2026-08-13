document.addEventListener('DOMContentLoaded', () => {
    // Set the date we're counting down to (10 days from now)
    const countDownDate = new Date().getTime() + (10 * 24 * 60 * 60 * 1000);

    // Update the count down every 1 second
    const x = setInterval(function() {

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the elements
        document.getElementById("days").innerHTML = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerHTML = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? '0' + seconds : seconds;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.querySelector(".countdown-container").innerHTML = "<h2 style='color: var(--primary-color)'>We are live!</h2>";
        }
    }, 1000);

    // Notify Form Submission
    const notifyForm = document.getElementById('notifyForm');
    const successMsg = document.getElementById('successMsg');

    if (notifyForm) {
        notifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = notifyForm.querySelector('input[type="email"]');
            if(emailInput.value) {
                successMsg.classList.add('show');
                emailInput.value = '';
                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 5000);
            }
        });
    }
});
