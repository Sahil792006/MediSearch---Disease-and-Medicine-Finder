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
