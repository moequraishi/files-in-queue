import {Component, OnInit, OnDestroy, Directive, ViewChild, ElementRef} from '@angular/core';
import { HttpService } from '../http.service';
import { Subscription, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import * as io from 'socket.io-client';

import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.scss']
})

export class GetDataComponent implements OnInit, OnDestroy {
  private socket;

  dataSubscription: Subscription;
  dynamicData;
  allData;
  rtData: Object;
  userName: string;
  queue;

  isAlive = false;

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.isAlive = true;
    this.getAll();
    this.getTestData();
    this.getRealTime();

    // Subscribe and Initiate an RXJS Interval
    this.dataSubscription = interval(1000).pipe(takeWhile(() => this.isAlive)).subscribe(v => {
      if (v) {
        // this.getTestData();
        // this.getAll();
        this.getRealTime();
      }
    });
  }

  ngOnDestroy() {

    // Stop the interval and unsubscribe
    this.isAlive = false;
    this.dataSubscription.unsubscribe();
  }

  getAll() {
    const observable = this.httpService.getAll();
    observable.subscribe(data => {
      this.allData = data;
      console.log('Results from Mongo:', this.allData);
    });
  }

  getRealTime() {
    const observable = this.httpService.getAll();
    observable.subscribe(data => {
      this.rtData = data;

      // console.log('Real Time Results:', this.rtData);
    });
  }

  getTestData() {
    const observable = this.httpService.readData();
    observable.subscribe(data => {
      this.dynamicData = data;
    })
  }

}
