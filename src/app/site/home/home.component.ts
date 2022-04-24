import { Component, OnInit } from '@angular/core';
import { EventDataModel } from 'app/models/event.model';
import { Subscription } from 'rxjs';
import { MqttService } from 'src/app/services/mqtt.service';
import { IMqttMessage } from "ngx-mqtt";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: any[];
  private temperatureTopic: string = "SMpool/pool/luxmeter/lux";
  subscription: Subscription;

  constructor(private readonly eventMqtt: MqttService) { }

  ngOnInit(): void {
    this.subscribeToTopic();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private subscribeToTopic() {
    this.subscription = this.eventMqtt.topic(this.temperatureTopic)
      .subscribe((data: IMqttMessage) => {
        let item = JSON.parse(data.payload.toString());
        this.events.push(item);
      });
  }


}
