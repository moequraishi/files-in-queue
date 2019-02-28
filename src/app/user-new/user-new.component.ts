import { Component, OnInit, NgZone } from '@angular/core';
import { HttpService } from '../http.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  name: string;
  queue: string;
  queueArray = [];

  constructor(private httpService: HttpService, private router: Router, private zone: NgZone) { }

  ngOnInit() {
  }

  newData(form: NgForm) {
    const splitQueue = this.queue.split(',');

    if (splitQueue) {
      for (const file of splitQueue) {
        this.queueArray.push(file);
      }
    }

    const sendData = {
      name: this.name,
      queue: this.queueArray
    };

    const observable = this.httpService.createData(sendData);
    observable.subscribe(data => {
      console.log('Data created: ', data);
      form.reset();
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

}
