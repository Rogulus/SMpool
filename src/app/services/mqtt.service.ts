/************************************************************
 *                                                          *
 *      Author:     Marek Stastny                           *
 *      Created:    2022                                    *
 *                                                          *
 ************************************************************/

import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MyMqttService {

  private endpoint: string;

  constructor(
    private _mqttService: MqttService,
  ) {
    this.endpoint = 'events';
  }

  public topic(topic: string): Observable<IMqttMessage> {
    return this._mqttService.observe(topic);
  }

  public unsafePublish(topic: string, data: string): void {
    this._mqttService.unsafePublish(topic, data, {qos: 0, retain: true});
  }

  public getService(){
    return this._mqttService;
  }
}


