import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import {MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('queueInput') queueInputRef: ElementRef;
  update = false;
  updateArray = [];
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


  updateUser(id, event) {
    const name = event.path[2].childNodes[1].firstChild.value;
    const queue = event.path[2].childNodes[1].childNodes[3].value.toString().split(', ');
    const tempQue = [];

    console.log(this.updateArray);

    for (let i = 0; i < this.updateArray.length; i++) {
      tempQue.push(this.updateArray[i].name);
    }

    console.log(tempQue);

    const data = {
      name: name,
      queue: tempQue,
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
