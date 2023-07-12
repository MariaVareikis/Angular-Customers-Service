import { Component, Input } from '@angular/core';
import { CustomerModel } from 'src/app/models/customer-model';
import { DataService } from 'src/app/services/data.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

    public customers: CustomerModel[] = [];

    public constructor(private dataService: DataService, private notifyService: NotifyService) { }

    public async ngOnInit() {
        try {
            this.customers = await this.dataService.getAllCustomers();
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }

}
