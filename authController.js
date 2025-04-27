import mongoose from "mongoose";
import User from '../models/user.js';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Function to register a new user

export const register = async (req,res)=>{
    const {userName,email, password} = req.body;
    try{
        // Check if user already exists
        const existingUser = await User.find
        ({email});
        if(existingUser){
            return res.status(400).json ({message: "User already exists"});
        }
        // Hash the password
        const hashppassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = await User.create({
            email,
            userName,
            password: hashppassword,
        })
        // Create a token for the new user
        const token = jwt.sign({
            email:newUser.email,
            id:newUser._id,
        }, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(201).json({user: newUser, token});
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
}

export const login = async(req,res) =>{
    const {email,password} = req.body;
    try{
        //check if user is registered
        const existingUser = await User.findOne({
            email,
        });
        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }
        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }
        // Create a token for the user

        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id,
        }, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({user: existingUser, token});
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
}

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // If the user does not exist, create the new user
  const newUser = new User({ email, password });
  await newUser.save();

  res.status(201).json({ message: "User created successfully" });
});
