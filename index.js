
    document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("registrationForm");
      const tableBody = document.getElementById("userTableBody");
      let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      storedUsers.forEach(user => addUserToTable(user));

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const dob = document.getElementById("dob").value;
        const acceptTerms = document.getElementById("acceptTerms").checked;

        if (!validateEmail(email)) {
          alert("Please enter a valid email address.");
          return;
        }

        const age = getAge(new Date(dob));
        if (age < 18 || age > 55) {
          alert("Age must be between 18 and 55.");
          return;
        }

        const user = { name, email, password, dob, acceptTerms };

        storedUsers.push(user);
        localStorage.setItem("users", JSON.stringify(storedUsers));

        addUserToTable(user);
        form.reset();
      });

      function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      }

      function getAge(dob) {
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        return age;
      }

      function addUserToTable(user) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td>${user.dob}</td>
          <td>${user.acceptTerms}</td>
        `;
        tableBody.appendChild(row);
      }
    });
