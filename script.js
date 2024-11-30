// script.js

// Validate the "Create Capsule" form
capsuleForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const letter = document.getElementById("letter").value;
    const files = document.getElementById("file").files;
    const password = document.getElementById("password").value;
    const openDate = document.getElementById("openDate").value;

    if (new Date(openDate) <= new Date()) {
        alert("Open date must be in the future!");
        return;
    }

    // Generate a unique Capsule ID
    const capsuleId = `capsule-${Date.now()}`;

    // Simulate saving the capsule
    const capsule = {
        id: capsuleId,
        letter,
        files: [...files].map(file => file.name), // Save file names for simplicity
        password,
        openDate,
    };

    // Save the capsule in localStorage
    localStorage.setItem(capsuleId, JSON.stringify(capsule));

    // Log for debugging
    console.log("Capsule saved to localStorage:", capsule);
    alert(`Capsule created! Your Capsule ID is: ${capsuleId}`);
    capsuleForm.reset();
});

// Validate the "View Capsule" form
unlockForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const capsuleId = document.getElementById("capsuleId").value;
    const password = document.getElementById("password").value;

    // Retrieve the capsule from localStorage
    const capsuleData = localStorage.getItem(capsuleId);
    console.log("Retrieved capsule data:", capsuleData);

    if (!capsuleData) {
        alert("Invalid Capsule ID!");
        return;
    }

    const capsule = JSON.parse(capsuleData);

    // Check password
    if (capsule.password !== password) {
        alert("Incorrect password!");
        return;
    }

    // Check if the capsule can be opened
    if (new Date(capsule.openDate) > new Date()) {
        alert("This capsule is not ready to be opened yet!");
        return;
    }

    // Display the capsule content
    document.getElementById("capsuleContent").innerHTML = `
        <h2>Capsule Content</h2>
        <p>${capsule.letter}</p>
        <h3>Uploaded Files:</h3>
        <ul>
            ${capsule.files.map(file => `<li>${file}</li>`).join("")}
        </ul>
    `;
});

        
       
    
