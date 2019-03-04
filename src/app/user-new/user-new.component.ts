import { Component, OnInit, NgZone } from '@angular/core';
import { HttpService } from '../http.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  name: string;
  queue: string;
  queueArray = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private httpService: HttpService, private router: Router, private zone: NgZone) { }

  ngOnInit() {
  }

  newData(form: NgForm) {
    const tempArr = [];

    for (let i = 0; i < this.queueArray.length; i++) {
      tempArr.push(this.queueArray[i].name);
    }

    const sendData = {
      name: this.name,
      queue: tempArr
    };

    const observable = this.httpService.createData(sendData);
    observable.subscribe(data => {
      console.log('Data created: ', data);
      if (data) {
        this.zone.run(() => {
          this.router.navigate(['/get']);
        });
      }
    });
  }

  addQueue() {
    const queueGrp = document.querySelector('.queue-group');
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.queueArray.push({name: value.trim()});
      console.log(this.queueArray);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(queue): void {
    const index = this.queueArray.indexOf(queue);

    if (index >= 0) {
      this.queueArray.splice(index, 1);
    }
  }

}
