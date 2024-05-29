// Import the Mongoose schema for users
import User from "./schemes/users.js";
import Camera from "./schemes/cameras.js";
import Case from "./schemes/cases.js";
import Motor from "./schemes/motors.js";
import Propeller from "./schemes/propellers.js";
import Rtfdrone from "./schemes/rtfdrone.js";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const ADMIN_INVITATION_CODE = process.env.ADMIN_INVITATION_CODE;
// Get the directory path of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//declaring models for easier manipulation with multiple database types
const models = {
  user: User,
  motor: Motor,
  propeller: Propeller,
  rtfdrone: Rtfdrone,
  case: Case,
};

// Controller function to get the number of users
export const getUserCount = async (req, res) => {
  try {
    // Count the number of documents in the User collection
    const userCount = await User.countDocuments({});
    res.status(200).json({ count: userCount });
  } catch (error) {
    console.error("Error counting users:", error);
    res.status(500).json({ error: "Error counting users" });
  }
};
export const getProductCount = async (req, res) => {
  try {
    // Count documents in each collection
    const cameraCount = await Camera.countDocuments({});
    const caseCount = await Case.countDocuments({});
    const motorCount = await Motor.countDocuments({});
    const propellerCount = await Propeller.countDocuments({});

    // Sum the counts
    const totalProductCount =
      cameraCount + caseCount + motorCount + propellerCount;

    res.status(200).json({ count: totalProductCount });
  } catch (error) {
    console.error("Error counting products:", error);
    res.status(500).json({ error: "Error counting products" });
  }
};
// Controller function to get the product counts
export const getProductPopularity = async (req, res) => {
  try {
    const cameraCount = await Camera.countDocuments({});
    const caseCount = await Case.countDocuments({});
    const motorCount = await Motor.countDocuments({});
    const propellerCount = await Propeller.countDocuments({});

    res
      .status(200)
      .json({ cameraCount, caseCount, motorCount, propellerCount });
  } catch (error) {
    console.error("Error getting product popularity:", error);
    res.status(500).json({ error: "Error getting product popularity" });
  }
};
// example controller function to get all notes
export const getAllUsers = async (req, res) => {
  try {
    // retrieve all documents from the database with mongoose
    const allUsers = await User.find();
    // send the retrieved documents as a response
    res.status(200).json(allUsers);
  } catch (error) {
    // handle errors
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Error fetching documents" });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const motors = await Motor.find();
    const propellers = await Propeller.find();
    const cameras = await Camera.find();
    const cases = await Case.find();
    const drones = await Rtfdrone.find();
    const products = [
      ...motors,
      ...propellers,
      ...cameras,
      ...cases,
      ...drones,
    ];
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const addMotor = async (req, res) => {
  try {
    const { motorName, motorPower, motorConnector, motorType, motorPrice } =
      req.body;

    if (
      !motorName ||
      !motorPower ||
      !motorConnector ||
      !motorType ||
      !motorPrice
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const newMotor = new Motor({
      motorName,
      motorPower,
      motorConnector,
      motorType,
      motorPrice,
    });
    await newMotor.save();
    res.status(201).json({ message: "Motor added successfully" });
  } catch (error) {
    console.error("Error adding motor:", error);
    res.status(500).json({ error: "Error adding motor" });
  }
};
export const addPropeller = async (req, res) => {
  try {
    const {
      propellerName,
      propellerSize,
      propellerColor,
      propellerPeakNumber,
      propellerPrice,
    } = req.body;

    if (
      !propellerName ||
      !propellerSize ||
      !propellerColor ||
      !propellerPeakNumber ||
      !propellerPrice
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const newPropeller = new Propeller({
      propellerName,
      propellerSize,
      propellerColor,
      propellerPeakNumber,
      propellerPrice,
    });
    await newPropeller.save();
    res.status(201).json({ message: "Propeller added successfully" });
  } catch (error) {
    console.error("Error adding Propeller:", error);
    res.status(500).json({ error: "Error adding Propeller" });
  }
};
export const addCase = async (req, res) => {
  try {
    const { caseName, caseSize, caseMaterial, caseColor, casePrice } = req.body;

    if (!caseName || !caseSize || !caseMaterial || !caseColor || !casePrice) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const newCase = new Case({
      caseName,
      caseSize,
      caseMaterial,
      caseColor,
      casePrice,
    });
    await newCase.save();
    res.status(201).json({ message: "Case added successfully" });
  } catch (error) {
    console.error("Error adding Case:", error);
    res.status(500).json({ error: "Error adding Case" });
  }
};
export const addCamera = async (req, res) => {
  try {
    const {
      cameraName,
      cameraResolution,
      cameraSensor,
      cameraFocal,
      cameraPrice,
    } = req.body;

    if (
      !cameraName ||
      !cameraResolution ||
      !cameraSensor ||
      !cameraFocal ||
      !cameraPrice
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const newCamera = new Camera({
      cameraName,
      cameraResolution,
      cameraSensor,
      cameraFocal,
      cameraPrice,
    });
    await newCamera.save();
    res.status(201).json({ message: "Camera added successfully" });
  } catch (error) {
    console.error("Error adding Camera:", error);
    res.status(500).json({ error: "Error adding Camera" });
  }
};
export const addDrone = async (req, res) => {
  try {
    const {
      droneName,
      droneBatterylife,
      droneCamera,
      droneWeight,
      dronePrice,
    } = req.body;

    if (
      !droneName ||
      !droneBatterylife ||
      !droneCamera ||
      !droneWeight ||
      !dronePrice
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const newDrone = new Rtfdrone({
      droneName,
      droneBatterylife,
      droneCamera,
      droneWeight,
      dronePrice,
    });
    await newDrone.save();
    res.status(201).json({ message: "Drone added successfully" });
  } catch (error) {
    console.error("Error adding Drone:", error);
    res.status(500).json({ error: "Error adding Drone" });
  }
};
// example controller function to delete a note by id
export const deleteOne = async (req, res) => {
  try {
    const { id, model } = req.params;

    // Check if the provided model exists in our models object
    if (!models[model]) {
      return res.status(400).json({ error: "Invalid model type" });
    }

    // Validate the provided id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    // Find the document by id and delete it
    const deletedDocument = await models[model].findByIdAndDelete(id);

    // Check if the document exists
    if (!deletedDocument) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Send a success message as a response
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error deleting document by id:", error);
    res.status(500).json({ error: "Error deleting document by id" });
  }
};
export const showDelete = (req, res) => {
  try {
    // Send the signUp.html file
    res.sendFile(path.join(__dirname, "/public/htmlCode/deleteDocument.html"));
  } catch (error) {
    console.error("Error sending sign-up page:", error);
    res.status(500).json({ error: "Error sending sign-up page" });
  }
};
