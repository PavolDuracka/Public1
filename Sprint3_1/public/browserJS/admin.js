document.addEventListener("DOMContentLoaded", () => {
  updateUserCount();
  updateProductCount();

  // Fetch token from local storage
  const token = localStorage.getItem("token");

  if (!token) {
    alert("No token found. Please log in again.");
    window.location.href = "/login"; // Redirect to login if no token found
    return;
  }

  // Function to include token in headers
  const fetchWithAuth = async (url, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };
    const response = await fetch(url, { ...options, headers });
    return response.json();
  };

  // Ensure the Google Charts library is loaded before using it
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(fetchDataAndDrawChart);

  async function fetchDataAndDrawChart() {
    try {
      const productData = await fetchWithAuth("/api/productPopularity");

      const dataArray = [
        ["Product", "Popularity"],
        ["Motors", productData.motorCount],
        ["Propellers", productData.propellerCount],
        ["Cases", productData.caseCount],
        ["Cameras", productData.cameraCount],
      ];

      var data = google.visualization.arrayToDataTable(dataArray);

      var options = {
        title: "",
        backgroundColor: "#111",
        chartArea: {
          width: "100%",
          backgroundColor: "#111",
        },
        pieSliceTextStyle: {
          color: "white",
        },
        slices: {
          0: { color: "#9e2222" },
          1: { color: "#c73f3f" },
          2: { color: "#e66a6a" },
          3: { color: "#ff9999" },
          4: { color: "#ffcccc" },
        },
        legend: {
          position: "left",
          alignment: "center",
          textStyle: {
            fontName: "Arial",
            fontSize: 19,
            color: "white",
            bold: false,
            italic: false,
          },
        },
      };

      var chart = new google.visualization.PieChart(
        document.getElementById("piechart")
      );
      chart.draw(data, options);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }
});

/*GRAPH NUMBER  2*/

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart2);

function drawChart2() {
  var data2 = google.visualization.arrayToDataTable([
    ["Month", "Users", "Products"],
    ["march", 10, 45],
    ["april", 20, 203],
    ["may", 308, 400],
    ["june", 670, 460],
  ]);

  var options2 = {
    title: "Company Performance in 2024",
    backgroundColor: "#111", // Black background
    chartArea: {
      width: "60%",
      backgroundColor: "#111", // Darker black for the chart area
    },
    legend: {
      textStyle: {
        color: "white", // White color for the legend text
      },
    },
    titleTextStyle: {
      color: "white", // White color for the title text
    },
    hAxis: {
      textStyle: {
        color: "white", // White color for the axis labels
      },
    },
    vAxis: {
      textStyle: {
        color: "white", // White color for the axis labels
      },
    },
    curveType: "function",
    colors: ["#ff3333", "#ff9999"], // Red colors for the lines
  };

  var chart2 = new google.visualization.LineChart(
    document.getElementById("curve_chart")
  );

  chart2.draw(data2, options2);
}

/*------------------FORMS ----------------*/
document.addEventListener("DOMContentLoaded", () => {
  const motorBtn = document.getElementById("motorbtn");
  const propellerBtn = document.getElementById("propellerbtn");
  const cameraBtn = document.getElementById("camerabtn");
  const caseBtn = document.getElementById("casebtn");

  const form1 = document.getElementById("form1");
  const form2 = document.getElementById("form2");
  const form3 = document.getElementById("form3");
  const form4 = document.getElementById("form4");
  const form5 = document.getElementById("form5");

  function hideAllForms() {
    form1.style.display = "none";
    form2.style.display = "none";
    form3.style.display = "none";
    form4.style.display = "none";
    form5.style.display = "none";
  }

  motorBtn.addEventListener("click", () => {
    hideAllForms();
    form1.style.display = "flex";
  });

  propellerBtn.addEventListener("click", () => {
    hideAllForms();
    form2.style.display = "flex";
  });

  cameraBtn.addEventListener("click", () => {
    hideAllForms();
    form3.style.display = "flex";
  });

  caseBtn.addEventListener("click", () => {
    hideAllForms();
    form4.style.display = "flex";
  });

  rtfbtn.addEventListener("click", () => {
    hideAllForms();
    form5.style.display = "flex";
  });

  // Initialize by hiding all forms
  hideAllForms();

  form1.addEventListener("submit", async (event) => {
    event.preventDefault();

    const motorName = document.getElementById("motorName").value;
    const motorPower = document.getElementById("motorPower").value;
    const motorConnector = document.getElementById("motorConnector").value;
    const motorType = document.getElementById("motorType").value;
    const motorPrice = document.getElementById("motorPrice").value;

    const motorData = {
      motorName,
      motorPower,
      motorConnector,
      motorType,
      motorPrice,
    };

    try {
      const response = await fetchWithAuth("/api/addMotor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(motorData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      } else {
        const error = await response.json();
        alert("Error adding motor: " + error.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding motor");
    }
  });
  form2.addEventListener("submit", async (event) => {
    event.preventDefault();

    const propellerName = document.getElementById("propellerName").value;
    const propellerSize = document.getElementById("propellerSize").value;
    const propellerColor = document.getElementById("propellerColor").value;
    const propellerPeakNumber = document.getElementById(
      "propellerPeakNumber"
    ).value;
    const propellerPrice = document.getElementById("propellerPrice").value;

    const propellerData = {
      propellerName,
      propellerSize,
      propellerColor,
      propellerPeakNumber,
      propellerPrice,
    };

    try {
      const response = await fetch("/api/addPropeller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propellerData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      } else {
        const error = await response.json();
        alert("Error adding propeller: " + error.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding propeller");
    }
  });
  form3.addEventListener("submit", async (event) => {
    event.preventDefault();

    const caseName = document.getElementById("caseName").value;
    const caseSize = document.getElementById("caseSize").value;
    const caseMaterial = document.getElementById("caseMaterial").value;
    const caseColor = document.getElementById("caseColor").value;
    const casePrice = document.getElementById("casePrice").value;

    const caseData = {
      caseName,
      caseSize,
      caseMaterial,
      caseColor,
      casePrice,
    };

    try {
      const response = await fetch("/api/addCase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(caseData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      } else {
        const error = await response.json();
        alert("Error adding case: " + error.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding case");
    }
  });
  form4.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cameraName = document.getElementById("cameraName").value;
    const cameraResolution = document.getElementById("cameraResolution").value;
    const cameraSensor = document.getElementById("cameraSensor").value;
    const cameraFocal = document.getElementById("cameraFocal").value;
    const cameraPrice = document.getElementById("cameraPrice").value;

    const cameraData = {
      cameraName,
      cameraResolution,
      cameraSensor,
      cameraFocal,
      cameraPrice,
    };

    try {
      const response = await fetch("/api/addCamera", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cameraData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      } else {
        const error = await response.json();
        alert("Error adding camera: " + error.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding camera");
    }
  });
  form5.addEventListener("submit", async (event) => {
    event.preventDefault();

    const droneName = document.getElementById("droneName").value;
    const droneBatterylife = document.getElementById("droneBatterylife").value;
    const droneCamera = document.getElementById("droneCamera").value;
    const droneWeight = document.getElementById("droneWeight").value;
    const dronePrice = document.getElementById("dronePrice").value;

    const droneData = {
      droneName,
      droneBatterylife,
      droneCamera,
      droneWeight,
      dronePrice,
    };

    try {
      const response = await fetch("/api/addDrone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(droneData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      } else {
        const error = await response.json();
        alert("Error adding motor: " + error.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding motor");
    }
  });
});

// Fetch the number of users from the backend and update the dashboard
async function updateUserCount() {
  try {
    const response = await fetch("/api/userCount");
    const data = await response.json();
    const userCountElement = document.getElementById("userCount");
    userCountElement.textContent = data.count;
  } catch (error) {
    console.error("Error fetching user count:", error);
  }
}
async function updateProductCount() {
  try {
    const response = await fetch("/api/productCount");
    const data = await response.json();
    const productCountElement = document.getElementById("productCount");
    productCountElement.textContent = data.count;
  } catch (error) {
    console.error("Error fetching product count:", error);
  }
}
