import mongoose from "mongoose";
import { CustomerModel } from "./customer-model";

// 1. Interface describing our model:
export interface ITaskModel extends mongoose.Document {
    // _id exists by default, we don't need to specify it.
    description: string;
    date: string;
    customerId: mongoose.Schema.Types.ObjectId;
    completed: boolean;
}

// 2. Schema object from the above interface, containing additional configuration:
export const TaskSchema = new mongoose.Schema<ITaskModel>({
    description: {
        type: String, // JavaScript String
        required: [true, "Missing description"],
        minlength: [10, "Description must be minimum 10 chars"],
        maxlength: [30, "Description can't exceed 30 chars"],
        trim: true
    },
    date: {
        type: String, // JavaScript String
        required: [true, "Missing date and time"]
    },
    customerId: mongoose.Schema.Types.ObjectId,
    completed: {
        type: Boolean
    }


}, {
    versionKey: false, // Don't add __v to an added document
    toJSON: { virtuals: true }, // Support virtual fields when returning JSON.
    id: false // Don't add additional id

});

// Adding virtual fields:
TaskSchema.virtual("customer", {
    ref: CustomerModel, // Model Class, not a string
    localField: "customerId", // In movie model - what is the relation field name
    foreignField: "_id", // In movie model - what is the relation field name.
    justOne: true // Theater field is an object and not an array.
});

// 3. Model from the above interface and schema:
export const TaskModel = mongoose.model<ITaskModel>("TaskModel", TaskSchema, "tasks"); // model name, schema, db collection name 