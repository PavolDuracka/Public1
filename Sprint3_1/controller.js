// Import the Mongoose schema for users
import User from "./schemes/users.js";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const ADMIN_INVITATION_CODE = process.env.ADMIN_INVITATION_CODE;
// Get the directory path of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Assuming the signUp.html file is in the htmlCode folder
const htmlFilePath = path.join(__dirname, "/public/htmlCode/signUp.html");

// example controller function to show the sign-up page
export const showSignUp = (req, res) => {
  try {
    // Send the signUp.html file
    res.sendFile(htmlFilePath);
  } catch (error) {
    console.error("Error sending sign-up page:", error);
    res.status(500).json({ error: "Error sending sign-up page" });
  }
};

export const showLogIn = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/public/htmlCode/logIn.html"));
  } catch (error) {
    console.error("Error sending log-in page:", error);
    res.status(500).json({ error: "Error sending log-in page" });
  }
};
export const showHomepage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/public/htmlCode/homepage.html"));
  } catch (error) {
    console.error("Error sending homepage page:", error);
    res.status(500).json({ error: "Error sending homepage page" });
  }
};
export const showCart = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/public/htmlCode/cart.html"));
  } catch (error) {
    console.error("Error sending homepage page:", error);
    res.status(500).json({ error: "Error sending cart page" });
  }
};
export const showSingleProduct = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/public/htmlCode/singleproduct.html"));
  } catch (error) {
    console.error("Error sending product page:", error);
    res.status(500).json({ error: "Error sending product page" });
  }
};
export const showProduct = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/public/htmlCode/product.html"));
  } catch (error) {
    console.error("Error sending product page:", error);
    res.status(500).json({ error: "Error sending product page" });
  }
};
export const showContact = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/public/htmlCode/contact.html"));
  } catch (error) {
    console.error("Error sending contact page:", error);
    res.status(500).json({ error: "Error sending contact page" });
  }
};

export const showAbout = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/public/htmlCode/about.html"));
  } catch (error) {
    console.error("Error sending about page:", error);
    res.status(500).json({ error: "Error sending about page" });
  }
};

export const showShop = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/public/htmlCode/shop.html"));
  } catch (error) {
    console.error("Error sending about page:", error);
    res.status(500).json({ error: "Error sending about page" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { userName, email, password, passwordVerify, role, adminCode } =
      req.body;

    // Check if required fields are provided
    if (!userName || !email || !password || !passwordVerify || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if passwords match
    if (password !== passwordVerify) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Log the role and admin code for debugging
    console.log("Role:", role);
    console.log("Admin Code provided:", adminCode);
    console.log("Admin Code expected:", ADMIN_INVITATION_CODE);

    if (role === "admin" && adminCode !== ADMIN_INVITATION_CODE) {
      return res.status(403).json({ error: "Invalid admin invitation code" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Create a new document using the schema
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // Save the document to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating new document:", error);
    res.status(500).json({ error: "Error creating new document" });
  }
};

//login method
export const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Error logging in user" });
  }
};

export const adminPage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/public/htmlCode/admin.html"));
  } catch (error) {
    console.error("Error sending admin page:", error);
    res.status(500).json({ error: "Error sending admin page" });
  }
};

// example controller function to get a note by id
export const getUserByName = async (req, res) => {
  try {
    // extract the ID from the request parameters
    const { userName } = req.params;
    // retrieve the document from the database using mongoose
    const users = await User.findOne({ userName });
    // check if the note exists
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    // send the retrieved document as a response
    res.status(200).json(users);
  } catch (error) {
    // handle errors
    console.error("Error fetching document by name:", error);
    res.status(500).json({ error: "Error fetching document by name" });
  }
};

export const createNewPropeller = async (req, res) => {
  try {
    const {
      propellerName,
      propellerSize,
      propellerColor,
      propellerPeakNumber,
      propellerPrice,
    } = req.body;

    // Check if required fields are provided
    if (!propellerName || !propellerSize || !propellerColor) {
      return res.status(400).json({ error: "Please fill up required fields" });
    }
    // Create a new document using the schema
    const newPropeller = new Propeller({
      propellerName,
      propellerSize,
      propellerColor,
      propellerPeakNumber,
      propellerPrice,
    });

    // Save the document to the database
    const savedPropeller = await newPropeller.save();
    res.status(201).json(savedPropeller);
  } catch (error) {
    console.error("Error creating new document:", error);
    res.status(500).json({ error: "Error creating new document" });
  }
};

export const createNewMotor = async (req, res) => {
  try {
    const { motorName, motorPower, motorConnector, motorType, motorPrice } =
      req.body;

    // Check if required fields are provided
    if (!motorName || !motorPower || !motorConnector) {
      return res.status(400).json({ error: "Please fill up required fields" });
    }
    // Create a new document using the schema
    const newMotor = new Motor({
      motorName,
      motorPower,
      motorConnector,
      motorType,
      motorPrice,
    });

    // Save the document to the database
    const savedMotor = await newMotor.save();
    res.status(201).json(savedMotor);
  } catch (error) {
    console.error("Error creating new document:", error);
    res.status(500).json({ error: "Error creating new document" });
  }
};

export const createNewCase = async (req, res) => {
  try {
    const { caseName, caseSize, caseMaterial, caseColor, casePrice } = req.body;

    // Check if required fields are provided
    if (!caseName || !caseSize || !caseMaterial) {
      return res.status(400).json({ error: "Please fill up required fields" });
    }
    // Create a new document using the schema
    const newCase = new Case({
      caseName,
      caseSize,
      caseMaterial,
      caseColor,
      casePrice,
    });

    // Save the document to the database
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (error) {
    console.error("Error creating new document:", error);
    res.status(500).json({ error: "Error creating new document" });
  }
};

export const createNewCamera = async (req, res) => {
  try {
    const {
      cameraName,
      cameraResolution,
      cameraSensor,
      cameraFocal,
      cameraPrice,
    } = req.body;

    // Check if required fields are provided
    if (!cameraName || !cameraResolution || !cameraSensor) {
      return res.status(400).json({ error: "Please fill up required fields" });
    }
    // Create a new document using the schema
    const newCamera = new Case({
      cameraName,
      cameraResolution,
      cameraSensor,
      cameraFocal,
      cameraPrice,
    });

    // Save the document to the database
    const savedCamera = await newCamera.save();
    res.status(201).json(savedCamera);
  } catch (error) {
    console.error("Error creating new document:", error);
    res.status(500).json({ error: "Error creating new document" });
  }
};
export const showChooseMotor = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/public/htmlCode/motor.html"));
  } catch (error) {
    console.error("Error sending homepage page:", error);
    res.status(500).json({ error: "Error sending motor page" });
  }
};
export const showChooseCamera = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/public/htmlCode/camera.html"));
  } catch (error) {
    console.error("Error sending homepage page:", error);
    res.status(500).json({ error: "Error sending camera page" });
  }
};
export const showChooseCase = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/public/htmlCode/case.html"));
  } catch (error) {
    console.error("Error sending homepage page:", error);
    res.status(500).json({ error: "Error sending case page" });
  }
};
export const showChoosePropeller = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/public/htmlCode/propellers.html"));
  } catch (error) {
    console.error("Error sending homepage page:", error);
    res.status(500).json({ error: "Error sending propeller page" });
  }
};
