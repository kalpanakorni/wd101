<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Registration</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, button {
            padding: 8px;
            width: 100%;
            box-sizing: border-box;
        }
        button {
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
            margin-top: 10px;
        }
        button:hover {
            background-color: #45a049;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .error {
            color: red;
            font-size: 0.9em;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <h1>User Registration</h1>
    <form id="registrationForm">
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <div id="emailError" class="error"></div>
        </div>
        
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
        </div>
        
        <div class="form-group">
            <label for="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob" required>
            <div id="dobError" class="error"></div>
        </div>
        
        <div class="form-group">
            <input type="checkbox" id="acceptTerms" name="acceptTerms" required>
            <label for="acceptTerms" style="display: inline;">I accept the terms and conditions</label>
        </div>
        
        <button type="submit">Register</button>
    </form>
    
    <h2>Registered Users</h2>
    <table id="usersTable">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Date of Birth</th>
                <th>Accepted Terms</th>
            </tr>
        </thead>
        <tbody id="usersTableBody">
            <!-- Users will be added here -->
        </tbody>
    </table>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registrationForm');
            const emailInput = document.getElementById('email');
            const dobInput = document.getElementById('dob');
            const emailError = document.getElementById('emailError');
            const dobError = document.getElementById('dobError');
            const tableBody = document.getElementById('usersTableBody');
            
            // Load existing users from localStorage
            loadUsers();
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Reset error messages
                emailError.textContent = '';
                dobError.textContent = '';
                
                // Validate email
                if (!validateEmail(emailInput.value)) {
                    emailError.textContent = 'Please enter a valid email address';
                    return;
                }
                
                // Validate age (18-55 years)
                const dob = new Date(dobInput.value);
                const today = new Date();
                let age = today.getFullYear() - dob.getFullYear();
                const monthDiff = today.getMonth() - dob.getMonth();
                
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                    age--;
                }
                
                if (age < 18 || age > 55) {
                    dobError.textContent = 'You must be between 18 and 55 years old';
                    return;
                }
                
                // Get form values
                const name = document.getElementById('name').value;
                const email = emailInput.value;
                const password = document.getElementById('password').value;
                const acceptedTerms = document.getElementById('acceptTerms').checked ? 'Yes' : 'No';
                const formattedDob = formatDate(dobInput.value);
                
                // Create user object
                const user = {
                    name,
                    email,
                    password,
                    dob: formattedDob,
                    acceptedTerms
                };
                
                // Add user to table
                addUserToTable(user);
                
                // Save to localStorage
                saveUser(user);
                
                // Reset form
                form.reset();
            });
            
            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
            
            function formatDate(dateString) {
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
            
            function addUserToTable(user) {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td>
                    <td>${user.dob}</td>
                    <td>${user.acceptedTerms}</td>
                `;
                
                tableBody.appendChild(row);
            }
            
            function saveUser(user) {
                let users = JSON.parse(localStorage.getItem('users')) || [];
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            function loadUsers() {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                users.forEach(user => addUserToTable(user));
            }
        });
    </script>
</body>
</html>
