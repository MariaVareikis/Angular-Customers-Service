import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel } from 'src/app/models/customer-model';
import { TaskModel } from 'src/app/models/task-model';
import { DataService } from 'src/app/services/data.service';
import { NotifyService } from 'src/app/services/notify.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    @Input() // React's Props
    public task: TaskModel;

    public customers: CustomerModel[] = [];
    public tasks: TaskModel[] = [];

    public constructor(private dataService: DataService, private router: Router, private notifyService: NotifyService) { }

    public async ngOnInit() {
        try {
            this.customers = await this.dataService.getAllCustomers();
            this.tasks = await this.dataService.getAllCustomersAndTasks();
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }

    public async updateStatus(task: TaskModel) {

        task.completed = !task.completed;

        try {
            await this.dataService.updateTask(task);
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }

    public async updateTask(_id: string) {

        try {
            
            this.customers = await this.dataService.getAllCustomers();
            this.router.navigate(["/update", _id]);


        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }

    public async deleteMe(_id: string) {
        try {

            // if(!window.confirm("Are you sure?")) return;
            await this.dataService.deleteTask(_id);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Task has been deleted',
                showConfirmButton: false,
                timer: 1500
            })

            // Refresh lists:
            const index = this.tasks.findIndex(t => t._id === _id);
            this.tasks.splice(index, 1);
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }
}
