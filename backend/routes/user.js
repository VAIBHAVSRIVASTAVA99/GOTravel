const express = require('express')
const { Router } = require("express");
const userRouter = Router();
const { UserModel } = require('../src/model')
const bcrypt = require('bcrypt')
const { userModel } = require("../src/model");
const { z } = require('zod')

userRouter.post("/signup", async function (req, res) {
        const { email, password } = req.body;
        console.log(email)
    try {
        const newUser = await userModel.create({ email, password });
        console.log(`New user created with email: ${email}`);
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.error("Error during sign-up:", err);
        res.status(500).json({ message: "Error creating user" });
    }
});


userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Signin successful", user });
  } catch (err) {
    console.error("Error during signin:", err);
    res.status(500).json({ message: "Error signing in" });
  }


})
module.exports =userRouter
