import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerModel } from 'src/app/models/customer-model';
import { TaskModel } from 'src/app/models/task-model';
import { DataService } from 'src/app/services/data.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent {

    public task = new TaskModel();

    public customers: CustomerModel[] = [];

    public currentDate: string;

    public _id = this.route.snapshot.params['_id'];

    public constructor(private dataService: DataService, private router: Router, private notifyService: NotifyService, private route: ActivatedRoute) { }

    public async ngOnInit() {
        try {
            this.currentDate = new Date().toISOString().substr(0, 16);
            this.customers = await this.dataService.getAllCustomers();
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }

    public async send() {
        try {
            this.task._id = this._id;
            await this.dataService.updateTask(this.task);
            this.notifyService.success("Task updated");
            this.router.navigateByUrl("/home");
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }
}
