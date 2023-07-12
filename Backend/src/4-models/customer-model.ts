import mongoose from "mongoose";

// 1. Interface describing our model:
export interface ICustomerModel extends mongoose.Document {
    // _id exists by default, we don't need to specify it.
    name: string;
    business: string;
    phone: string;
    email: string;
}

// 2. Schema object from the above interface, containing additional configuration:
export const CustomerSchema = new mongoose.Schema<ICustomerModel>({
    name: {
        type: String, // JavaScript String
        required: [true, "Missing name"],
        minlength: [3, "Name must be minimum 3 chars"],
        maxlength: [20, "Name can't exceed 20 chars"],
        trim: true,
        unique: true
    },
    business: {
        type: String, // JavaScript String
        required: [true, "Missing business type"],
        minlength: [2, "Business type must be minimum 2 chars"],
        maxlength: [20, "Business type can't exceed 20 chars"],
        trim: true,
        unique: true
    },
    phone: {
        type: String, // JavaScript String
        required: [true, "Missing phone"],
        minlength: [10, "Phone must be minimum 10 chars"],
        maxlength: [13, "Phone can't exceed 13 chars"],
        trim: true,
        unique: true
    },
    email: {
        type: String, // JavaScript String
        required: [true, "Missing email"],
        minlength: [10, "Email must be minimum 10 chars"],
        maxlength: [20, "Email can't exceed 20 chars"],
        trim: true
    }

});

// 3. Model from the above interface and schema:
export const CustomerModel = mongoose.model<ICustomerModel>("CustomerModel", CustomerSchema, "customers"); // model name, schema, db collection name 