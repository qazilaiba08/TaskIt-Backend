import mongoose from "mongoose";
import Task from "../models/taskModel.js";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

import { v4 as uuidv4 } from "uuid";
 
export const createTask = async (req,res) =>{
    const {title,description,assignTo} = req.body;
    try{
        //check if user is registered
        const existingUser = await User
.findOne({
            email:assignTo,
        });
        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }
        // Create a new task
        const newTask = await Task.create({
            title,
            description,
            assignTo: existingUser._id,
            taskId: uuidv4(),
            status: "Pending",
            createdBy: req.userId,
            createdAt: new Date(),
            editAt: new Date(),
        })
        res.status(201).json({task: newTask});
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
}

export const assignTasks = async (req,res) =>{
    const {taskId,assignTo} = req.body;
    try{
        //check if user is registered
        const existingUser = await User.findOne({
            email:assignTo,
        });
        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }
        // Find the task by taskId and update the assignTo field
        const updatedTask = await Task.findOneAndUpdate(
            {taskId},
            {assignTo: existingUser._id},
            {new: true}
        );
        res.status(200).json({task: updatedTask});
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
}

export const editTask = async (req,res) => {
    const {title,description,assignTo,status, editAt} = req.body;
    const {id} = req.params;
    try{
        //Find the task by id and update the fields
        const updatedTask = await Task.findOneAndUpdate(
            {_id:id},
            {title,description,assignTo,status, editAt: new Date()},
            {new: true}
        );
        res.status(200).json({task: updatedTask});  
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
}

export const deleteTask = async (req,res) =>{
    const {id} = req.params;
    try{
        //Find the task by id and delete it
        const deletedTask = await Task.findOneAndDelete(
            {_id:id}
        );
        res.status(200).json({task: deletedTask});  
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
}

export const getAllTasks = async (req,res) =>{
    try{
        //Find all tasks
        const tasks = await Task.find({});
        res.status(200).json({tasks});  
    }
    catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
}