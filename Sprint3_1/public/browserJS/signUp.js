document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  const userNameInput = document.getElementById("userName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passwordVerifyInput = document.getElementById("passwordVerify");
  const errorMessage = document.getElementById("errorMessage");
  const successMessage = document.getElementById("successMessage");
  const roleInput = document.getElementById("role"); // Get the role input
  const adminCodeField = document.getElementById("adminCodeField");
  const adminCodeInput = document.getElementById("adminCode");
  const apiUrl = "http://localhost:3000/signup"; // Update with your API URL

  roleInput.addEventListener("change", () => {
    if (roleInput.value === "admin") {
      adminCodeField.style.display = "block";
    } else {
      adminCodeField.style.display = "none";
    }
  });
  // Function to clear form fields
  function clearFormFields() {
    userNameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    passwordVerifyInput.value = "";
    roleInput.value = "";
    adminCodeInput.value = "";
  }
  // Function to handle form submission (add user)
  userForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const password = passwordInput.value;
    const passwordVerify = passwordVerifyInput.value;

    // Check if passwords match
    if (password !== passwordVerify) {
      errorMessage.style.display = "block";
      setTimeout(() => {
        errorMessage.style.display = "none"; // Hide after delay
      }, 5000); // Adjust delay as needed (in milliseconds)
      return;
    }
    const newUser = {
      userName: userNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      passwordVerify: passwordVerifyInput.value,
      role: roleInput.value,
      adminCode: roleInput.value === "admin" ? adminCodeInput.value : null, // Include admin code if role is admin
    };
    console.log("New User Data:", newUser);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to add user: Server responded with " + response.status
        );
      }

      const data = await response.json();
      // Function to show success message and hide after a delay
      successMessage.style.display = "block"; // Show the success message
      setTimeout(() => {
        successMessage.style.display = "none"; // Hide after delay
        clearFormFields();
        window.location.href = "/login";
      }, 1000); // Adjust delay as needed (in milliseconds)
    } catch (error) {
      console.error("Error adding user:", error.message); // Log specific error message
      // Optionally, display an error message to the user
      alert("Error adding user. Please try again later.");
    }
  });
});
window.redirectToLogIn = () => {
  document.location = "/login";
};
