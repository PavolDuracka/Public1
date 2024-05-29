document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("errorMessage");
  const apiUrl = "http://localhost:3000/login";

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    const loginUser = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });

      const data = await response.json();

      if (response.ok) {
        document.getElementById("successMessage").style.display = "block";
        setTimeout(() => {
          document.getElementById("successMessage").style.display = "none";
        }, 3000);
        const { token, role } = data;
        localStorage.setItem("token", token);
        console.log(`TokenInLoginJS: ${token}, Role: ${role}`);

        if (role === "admin") {
          accessProtectedRoute("/admin", "admin");
        } else if (role === "user") {
          window.location.href = "/";
        } else {
          showError("Unknown role. Please try again.");
        }
      } else {
        document.getElementById("errorMessage").style.display = "block";
        setTimeout(() => {
          document.getElementById("errorMessage").style.display = "none";
        }, 3000);
        showError(data.error || "Failed to log in");
      }
    } catch (error) {
      showError("An error occurred while logging in. Please try again.");
    }
  };

  userForm.addEventListener("submit", handleFormSubmission);

  const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 5000);
  };

  const accessProtectedRoute = async (endpoint, role) => {
    const token = localStorage.getItem("token");
    console.log(`Retrieved token in loginJS: ${token}`);

    if (!token) {
      showError("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (role === "admin") {
          window.location.replace("/admin");
        } else if (role === "user") {
          window.location.href = "/";
        } else {
          showError("Unknown role. Please try again.");
        }
      } else {
        const errorData = await response.json();
        showError(errorData.error || "Failed to access protected route");
      }
    } catch (error) {
      showError("An error occurred. Please try again.");
    }
  };
});
