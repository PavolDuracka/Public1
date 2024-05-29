// import of needed packages
import express from "express";
import {
  createUser,
  showSignUp,
  logInUser,
  showLogIn,
  showHomepage,
  showSingleProduct,
  showProduct,
  showContact,
  showAbout,
  showShop,
  adminPage,
  showCart,
  showChooseCase,
  showChooseMotor,
  showChoosePropeller,
  showChooseCamera,
} from "./controller.js";
import { authenticateToken, isAdmin } from "./errorMiddleware.js";
import {
  getUserCount,
  getProductCount,
  addMotor,
  addPropeller,
  addCamera,
  addCase,
  addDrone,
  getProductPopularity,
  getAllUsers,
  getAllProducts,
  deleteOne,
  showDelete,
} from "./adminController.js";
import dotenv from "dotenv";
dotenv.config();

// mounting the router
const router = express.Router();
// assuring that json syntax reads correctly
router.use(express.json());
// definition of each route through router, then continue to index1.js to access on app. layer
router.post("/signup", createUser);
router.get("/signup", showSignUp);
router.post("/login", logInUser);
router.get("/login", showLogIn);
router.get("/", showHomepage);
router.get("/singleProduct", showSingleProduct);
router.get("/product", showProduct);
router.get("/contact", showContact);
router.get("/about", showAbout);
router.get("/shop", showShop);
router.get("/cart", showCart);
router.get("/chooseCase", showChooseCase);
router.get("/chooseMotor", showChooseMotor);
router.get("/choosePropeller", showChoosePropeller);
router.get("/chooseCamera", showChooseCamera);

router.get("/admin", authenticateToken, isAdmin, adminPage);
router.get("/api/userCount", getUserCount);
router.get("/api/productCount", getProductCount);
router.post("/api/addMotor", authenticateToken, isAdmin,addMotor);
router.post("/api/addPropeller", authenticateToken, isAdmin,addPropeller);
router.post("/api/addCamera", authenticateToken, isAdmin,addCamera);
router.post("/api/addCase", authenticateToken, isAdmin,addCase);
router.post("/api/addDrone", authenticateToken, isAdmin,addDrone);
router.get("/api/productPopularity", authenticateToken, isAdmin, getProductPopularity);
router.get("/api/allUsers", authenticateToken, isAdmin, getAllUsers);
router.get("/api/allProducts", getAllProducts);
router.get("/api/showAllProducts", showSingleProduct);
router.get("/api/deleteOne", authenticateToken, isAdmin, showDelete);
router.delete("/api/:model/:id", authenticateToken, isAdmin, deleteOne);
// catching errors and logging
router.use((req, res, next) => {
  res.status(404).json({ error: "Wrong endpoint!" });
});
// exporting router
export default router;
