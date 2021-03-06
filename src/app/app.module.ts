import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AllMaterialsModule } from './material-module';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { WebsocketService } from './websocket.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserNewComponent } from './user-new/user-new.component';
import { GetDataComponent } from './get-data/get-data.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { UserComponent } from './user/user.component';

const config: SocketIoConfig = { url: 'http://localhost:1337', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    UserNewComponent,
    GetDataComponent,
    UpdateDataComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AllMaterialsModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [HttpService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
