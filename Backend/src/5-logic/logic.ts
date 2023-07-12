import { CustomerModel, ICustomerModel } from "../4-models/customer-model";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import { ITaskModel, TaskModel } from "../4-models/task-model";

// Get all customers:
function getAllCustomers(): Promise<ICustomerModel[]> {
     //Get all theaters without virtuals fields:
     return CustomerModel.find().exec();
}

// Get tasks by customer:
function getTasksIncludeCustomer(): Promise<ITaskModel[]> {

    // Get all tasks with "customer" virtuals fields:
    return TaskModel.find().populate("customer").exec();

}

// Add task:
function addTask(task: ITaskModel): Promise<ITaskModel> {

    const errors = task.validateSync();
    if (errors) throw new ValidationErrorModel(errors.message);
    return task.save(); // Returns Promise

}

// Update task:
async function updateTask(task: ITaskModel): Promise<ITaskModel> {

    const errors = task.validateSync();
    if (errors) throw new ValidationErrorModel(errors.message);
    const updatedTask = await TaskModel.findByIdAndUpdate(task._id, task, { returnOriginal: false }).exec(); // { returnOriginal: false } → Return database object and not argument object.
    if (!updatedTask) throw new ResourceNotFoundErrorModel(task._id);
    return updatedTask;
    
}

// Delete task:
async function deleteTask(_id: string): Promise<void> {

    const deletedTask = await TaskModel.findByIdAndDelete(_id).exec();
    if (!deletedTask) throw new ResourceNotFoundErrorModel(_id);

}

export default {
    getAllCustomers,
    getTasksIncludeCustomer,
    addTask,
    updateTask,
    deleteTask
};