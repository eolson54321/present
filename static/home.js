import { NAMES } from './names.js'

document.addEventListener("DOMContentLoaded", () => {
    const firstNameSelector = document.getElementById("firstName");
    const lastNameSelector = document.getElementById("lastName");
    
    const options = NAMES.map((name) => ({
        value: name.toLowerCase(),
        text: name
    }));

    options.forEach(data => {
        firstNameSelector.add(new Option(data.text, data.value));
        lastNameSelector.add(new Option(data.text, data.value));
    })

    document.getElementById('form').addEventListener('submit', function(e) {
        const dobInput = document.getElementById("dobInput");
        const modal = document.getElementById("modalOverlay");

        // Check if the date field is empty
        if (!dobInput.value || dobInput.value.trim() === "") {
            e.preventDefault();
            dobInput.setCustomValidity("Please select your date of birth.");
            dobInput.reportValidity();
            return;
        }

        // Form good to go
        e.preventDefault();
        modal.classList.add('active');

    });
    
    document.getElementById("actionButton").addEventListener("click", () => {
        const factorInput = document.getElementById("2fa");

        const normalized = factorInput.value.replace(/\s+/g, '').toLowerCase();
        const validForms = [
            "(x+2)(x+3)",
            "(x+3)(x+2)",
            "(2+x)(3+x)",
            "(3+x)(2+x)",
            "(x+2)*(x+3)",
            "(x+3)*(x+2)",
            "(2+x)*(3+x)",
            "(3+x)*(2+x)"
        ];

        if (validForms.includes(normalized)) {
            modalOverlay.classList.remove('active');
            window.location.replace('prize.html');
        } else {
            factorInput.classList.add('error');
        }
    });

    document.getElementById("2fa").addEventListener("input", () => {
        document.getElementById("2fa").classList.remove('error');
    });
});
