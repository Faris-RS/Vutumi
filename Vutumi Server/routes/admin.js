import express from "express";
import {
  adminLogin,
  blockUser,
  getUsers,
  getPosts,
  unBlockUser,
} from "../controller/adminController.js";
const router = express.Router();

router.get("/getUsers", getUsers);
router.get("/blockUser/:id", blockUser);
router.get("/unBlockUser/:id", unBlockUser);

router.get("/getPosts", getPosts)

router.post("/logIn", adminLogin);

export default router;
