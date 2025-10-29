function showResult() {
    const symptom = document.getElementById("symptomInput").value.trim().toLowerCase();
    const resultBox = document.getElementById("resultBox");

    if (symptom === "") {
        resultBox.innerHTML = "<strong>Please enter symptoms to search.</strong>";
        return;
    }

    if (symptom === "fever") {
        resultBox.innerHTML = `
            <h3>Results for: "Fever"</h3>
            <p><strong>Possible Causes:</strong> Viral Infection, Flu, Malaria</p>
            <p><strong>Suggested Medicines:</strong> Paracetamol, Ibuprofen</p>
            <p><em>*Consult a doctor before taking any medication.</em></p>
        `;
    } else if (symptom === "cough") {
        resultBox.innerHTML = `
            <h3>Results for: "Cough"</h3>
            <p><strong>Possible Causes:</strong> Cold, Flu, Bronchitis</p>
            <p><strong>Suggested Medicines:</strong> Cough Syrup, Lozenges</p>
            <p><em>*Consult a doctor before taking any medication.</em></p>
        `;
    } else {
        resultBox.innerHTML = "<strong>Sorry! We are working on it.</strong>";
    }
}

// This function is now async to allow for 'await fetch'
async function showResult() {
    const symptom = document.getElementById("symptomInput").value.trim().toLowerCase();
    const resultBox = document.getElementById("resultBox");

    if (symptom === "") {
        resultBox.innerHTML = "<strong>Please enter a symptom to search.</strong>";
        return;
    }

    // 1. Show a loading message while fetching
    resultBox.innerHTML = "<strong>Searching...</strong>";

    try {
        // 2. THIS IS THE REST API CALL
        // We query the 'symptoms' collection where the name matches the user's input
        const res = await fetch(`http://localhost:5000/symptoms?name=${symptom}`);
        const data = await res.json();

        // 3. Check if the API returned any results
        if (data.length > 0) {
            const symptomData = data[0]; // Get the first match

            // 4. Build the result HTML from the API data
            resultBox.innerHTML = `
                <h3>Results for: "${symptomData.name}"</h3>
                <p><strong>Possible Causes:</strong> ${symptomData.possible_causes.join(', ')}</p>
                <p><strong>Suggested Medicines:</strong> ${symptomData.suggested_medicines.join(', ')}</p>
                <p><em>*Consult a doctor before taking any medication.</em></p>
            `;
        } else {
            // No results found in the database
            resultBox.innerHTML = `<strong>Sorry, no results found for "${symptom}". We are working on it.</strong>`;
        }
    } catch (error) {
        // Handle errors like the API not running
        console.error("Symptom fetch error:", error);
        resultBox.innerHTML = "<strong>Error connecting to the API. Please try again later.</strong>";
    }
}

