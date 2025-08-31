function selectRole(role) {
        if (role === 'patient') {
            document.getElementById('roleModal').style.display = 'none';
            document.getElementById('patientContent').style.display = 'block';
        } else if (role === 'doctor') {
            window.location.href = 'doctor.html';
        }
    }