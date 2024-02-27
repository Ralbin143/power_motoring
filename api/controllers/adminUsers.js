const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const ADMIN = require("../models/AdminUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createAdminUser = asyncHandler(async (req, res) => {
  const password = "123@admin";
  const salt = await bcrypt.genSalt(8);
  const hashed_password = await bcrypt.hash(password, salt);
  const addUser = new ADMIN({
    userName: "Admin",
    password: hashed_password,
  });
  await addUser
    .save()
    .then((response) => {
    
    })
    .catch((err) => {
     
    });
});

const Login = asyncHandler(async (req, res) => {
  const { uname, password } = req.body;
  const findUser = await ADMIN.findOne({ userName: uname });

  if (findUser) {
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 72 * 60 * 60 * 1000,
    // });

    res.json({
      _id: findUser?._id,
    //   firstname: findUser?.firstname,
    //   lastname: findUser?.lastname,
    //   email: findUser?.email,
    //   mobile: findUser?.mobile,
    //   token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(422).json({ errors: errors.array() });
  //   }

  //   try {
  //     await ADMIN.findOne({
  //       userName: req.body.uname,
  //     })
  //       .then((response) => {
  //         const password_validity = bcrypt.compareSync(
  //           req.body.password,
  //           response.password
  //         );
  //         const new_token = jwt.sign(
  //           {
  //             id: response.password,
  //           },
  //           "jwtPrivateKey",
  //           { expiresIn: "60m" }
  //         );

  //         if (!password_validity) {
  //           return res.status(401).json({
  //             token: null,
  //             message: "Invalid Password",
  //           });
  //         } else {
  //           return res.status(200).json({
  //             token: new_token,
  //             message: "Login Success",
  //             data: response,
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         return res.status(500).json({ message: err });
  //       });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).json({
  //       message: error,
  //     });
  //   }
});

module.exports = {
  createAdminUser,
  Login,
};
