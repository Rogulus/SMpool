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
    console.log("snaha o pripojeni");
    return this._mqttService.observe(topic);
  }

  public unsafePublish(topic: string, data: string): void {
    console.log("mqtt sendi start");
    this._mqttService.unsafePublish(topic, data, {qos: 2, retain: true});
    console.log("mqtt sendi");
  }

  public getService(){
    return this._mqttService;
  }
}


