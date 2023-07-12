import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { TaskModel } from "../4-models/task-model";
import logic from "../5-logic/logic";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/customers
router.get("/customers", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const customers = await logic.getAllCustomers();
        response.json(customers);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/customers-and-tasks
router.get("/customers-and-tasks", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const customersAndTasks = await logic.getTasksIncludeCustomer();
        response.json(customersAndTasks);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/tasks
router.post("/tasks", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const task = new TaskModel(request.body);
       const addedTask = await logic.addTask(task);
       response.status(201).json(addedTask);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:3001/api/tasks/:_id
router.put("/tasks/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = new mongoose.Types.ObjectId(request.params._id.trim());
        const task = new TaskModel(request.body);
        const updatedTask = await logic.updateTask(task);
        response.json(updatedTask);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/tasks/:_Id
router.delete("/tasks/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const _id = request.params._id;
       await logic.deleteTask(_id);
       response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;

