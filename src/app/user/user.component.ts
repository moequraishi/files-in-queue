import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('queueInput') queueInputRef: ElementRef;
  update = false;
  userData;

  updateArray = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private httpService: HttpService,
              private route: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getOne();
  }

  getOne() {
    const id = this.activeRoute.snapshot.params.id;
    console.log(id);
    const observable = this.httpService.findOne(id);
    observable.subscribe(data => {
      this.userData = data;
      console.log('Results from Mongo:', this.userData);
    });
  }

  updateUser(id, event) {
    const name = event.path[2].childNodes[1].firstChild.value;
    // const queue = event.path[2].childNodes[1].childNodes[3].value.toString().split(', ');
    const tempQue = [];

    console.log(this.updateArray);

    for (let i = 0; i < this.updateArray.length; i++) {
      tempQue.push(this.updateArray[i].name);
    }

    console.log(tempQue);

    const data = {
      name: this.userData.name,
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
      this.route.navigate(['get']);
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.updateArray.push({name: value.trim()});
      console.log(this.updateArray);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(queue): void {
    const index = this.updateArray.indexOf(queue);

    if (index >= 0) {
      this.updateArray.splice(index, 1);
    }
  }

}
