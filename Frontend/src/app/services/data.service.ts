import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CustomerModel } from '../models/customer-model';
import { TaskModel } from '../models/task-model';
import { appConfig } from '../utils/app-config';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public constructor(private http: HttpClient) { }

    // Get all customers:
    public async getAllCustomers(): Promise<CustomerModel[]> {
        // Observable - משהו ממש מגניב
        const observable = this.http.get<CustomerModel[]>(appConfig.customersUrl);

        // Convert observable to promise:
        const customers = await firstValueFrom(observable);

        return customers;
    }

    // Get all customers and their tasks:
    public async getAllCustomersAndTasks(): Promise<TaskModel[]> {
        // Observable - משהו ממש מגניב
        const observable = this.http.get<TaskModel[]>(appConfig.customersAndTasksUrl);

        // Convert observable to promise:
        const customersAndTasks = await firstValueFrom(observable);

        return customersAndTasks;
    }

    // Update task:
    public async updateTask(task: TaskModel): Promise<void> {
        // Observable - משהו ממש מגניב
        const observable = this.http.put<TaskModel>(appConfig.tasksUrl + task._id, task);

        // Convert observable to promise:
        await firstValueFrom(observable);

    }

    // Add task:
    public async addTask(task: TaskModel): Promise<void> {
        // Observable - משהו ממש מגניב
        const observable = this.http.post<TaskModel>(appConfig.tasksUrl, task);

        // Convert observable to promise:
        await firstValueFrom(observable);
    }

        // Delete task:
        public async deleteTask(taskId: string): Promise<void> {
            // Observable - משהו ממש מגניב
            const observable = this.http.delete<TaskModel>(appConfig.tasksUrl + taskId);
            
            // Convert observable to promise:
            await firstValueFrom(observable);
        }

}
