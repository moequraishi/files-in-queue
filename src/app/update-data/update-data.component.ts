import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('queueInput') queueInputRef: ElementRef;
  update = false;
  allData;

  constructor(private httpService: HttpService, private route: Router) { }

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    const observable = this.httpService.getAll();
    observable.subscribe(data => {
      this.allData = data;
      console.log('Results from Mongo:', this.allData);
    });
  }


  updateUser(id) {
    const queueItems = this.queueInputRef.nativeElement.value;
    console.log(queueItems);

    const data = {
      name: this.nameInputRef.nativeElement.value,
      queue: queueItems,
      updatedAt: new Date()
    };

    const ob = this.httpService.updateData(id, data);
    ob.subscribe(res => {
      console.log('Success!', res);
      this.update = false;

      this.route.navigate(['get']);
    }, error => {
      console.log(error);
    });
  }

  deleteData(id) {
    const observable = this.httpService.deleteData(id);
    observable.subscribe(data => {
      console.log('Data deleted:', data);
      this.getAll();
    });
  }

}
