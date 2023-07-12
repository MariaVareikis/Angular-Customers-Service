import { CustomerModel } from "./customer-model";

export class TaskModel {
    public _id: string;
    public description: string;
    public date: string;
    public customerId: string;
    public completed: boolean;
    public customer: CustomerModel;
}