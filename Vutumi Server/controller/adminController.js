import {
  blockingUser,
  userDetails,
  unBlockingUser,
  adminLogging,
} from "./helpers/adminHelper.js";

import postModel from "../models/postModel.js";

export const adminLogin = (req, res) => {
  adminLogging(req.body).then((response) => {
    res.status(200).json(response);
  });
};

export const getUsers = (req, res) => {
  userDetails()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error(error.message);
    });
};

export const getPosts = async (req, res) => {
  // const posts = await postModel.find({ report: { $exists: true, $size: { $gte: 2 } } })
  const posts = await postModel.find({
    report: {
      $exists: true,
      $size: { $gte: 3 },
    },
  });
  console.log(posts); // Logs an array of posts that have at least 3 values in the "reported" field
  const response = {
    data: await postModel.find(),
  };
};

export const blockUser = (req, res) => {
  blockingUser(req.params.id).then((response) => {
    response.status && res.status(200).json(response.status);
  });
};

export const unBlockUser = (req, res) => {
  unBlockingUser(req.params.id).then((response) => {
    response.status && res.status(200).json(response.status);
  });
};
