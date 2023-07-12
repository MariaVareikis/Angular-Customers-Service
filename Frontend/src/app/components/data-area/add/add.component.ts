import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel } from 'src/app/models/customer-model';
import { TaskModel } from 'src/app/models/task-model';
import { DataService } from 'src/app/services/data.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export class AddComponent {

    public task = new TaskModel();

    public customers: CustomerModel[] = [];

    public currentDate: string;

    public constructor(private dataService: DataService, private router: Router, private notifyService: NotifyService) { }


    public async ngOnInit() {
        try {
            this.customers = await this.dataService.getAllCustomers();

            this.currentDate = new Date().toISOString().substr(0, 16);
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }

    public async send() {
        try {

            await this.dataService.addTask(this.task);
            this.notifyService.success("Task added");
            this.router.navigateByUrl("/home");
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }
}
