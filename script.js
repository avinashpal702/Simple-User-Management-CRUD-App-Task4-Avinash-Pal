const API_URL = "http://localhost:5000/api/users";

const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");
const message  = document.getElementById("message");

// ------- GET all users -------
async function getUsers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch users");
        const users = await response.json();
        displayUsers(users);
    } catch (err) {
        console.error(err);
        message.textContent = "Unable to load users.";
    }
}

// ------- DISPLAY USERS -------
function displayUsers(users) {
    userList.innerHTML = "";
    users.forEach(user => {
        const div = document.createElement("div");
        div.classList.add("user");
        div.innerHTML = `
            <div>
                <strong>${user.name}</strong>
                <p>${user.email}</p>
            </div>
            <button class="delete-btn" onclick="deleteUser(${user.id})">
                Delete
            </button>
        `;
        userList.appendChild(div);
    });
}

// ------- ADD USER -------
userForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name  = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        message.textContent = "User added successfully!";
        userForm.reset();
        getUsers();
    } catch (err) {
        console.error(err);
        message.textContent = err.message;
    }
});

// ------- DELETE USER -------
async function deleteUser(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        message.textContent = "User deleted successfully!";
        getUsers();
    } catch (err) {
        console.error(err);
        message.textContent = err.message;
    }
}

// Load users when the page starts
getUsers();