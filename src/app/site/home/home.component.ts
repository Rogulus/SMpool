import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyMqttService } from 'src/app/services/mqtt.service';
import { IMqttMessage , MqttService} from "ngx-mqtt";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //events: any[];
  private luxTopic: string = "#";//"SMpool/pool/luxmeter/lux";
  subscription: Subscription | undefined;

  percentage = 20;

  temp = '--- ';
  ph = '--- ';
  surface = '--- ';

  flow = '--- ';
  lux = '--- ';
  batLux = '--- ';
  batTherm = '--- ';


  switch = '--- ';
  switchButtonText = '---';
  switchState = '';

  constructor(private readonly eventMqtt: MyMqttService) { }

  ngOnInit(): void {
    this.subscription = this.eventMqtt.topic('SMpool/pool/thermometer/temperature/#')
      .subscribe((data: IMqttMessage) => {
        this.temp = data.payload.toString();
      });

    this.subscription = this.eventMqtt.topic('SMpool/pool/thermometer/ph/#')
      .subscribe((data: IMqttMessage) => {
        this.ph = data.payload.toString();
      });

    this.subscription = this.eventMqtt.topic('SMpool/pool/thermometer/bat/#')
      .subscribe((data: IMqttMessage) => {
        this.batTherm = data.payload.toString();
      });

    this.subscription = this.eventMqtt.topic('SMpool/pool/switch/surface/#')
      .subscribe((data: IMqttMessage) => {
        this.surface = data.payload.toString();
      });

    this.subscription = this.eventMqtt.topic('SMpool/pool/switch/flow/#')
      .subscribe((data: IMqttMessage) => {
        this.flow = data.payload.toString();
      });

    this.subscription = this.eventMqtt.topic('SMpool/pool/switch/status/#')
      .subscribe((data: IMqttMessage) => {
        this.switchState = data.payload.toString();
        this.switch = this.switchState == 'ON_' ? 'ON' : 'OFF';
        this.switchButtonText = this.switchState == 'ON_' ? 'OFF' : 'ON';
        (document.getElementById('switchButton') as HTMLInputElement).disabled = false;
      });

    this.subscription = this.eventMqtt.topic('SMpool/pool/luxmeter/bat/#')
      .subscribe((data: IMqttMessage) => {
        this.batLux = data.payload.toString();
      });

    this.subscription = this.eventMqtt.topic('SMpool/pool/luxmeter/lux/#')
      .subscribe((data: IMqttMessage) => {
        this.lux = data.payload.toString();
      });


    this.eventMqtt.unsafePublish('SMpool/pool/thermometer/temperature', '25');
    this.eventMqtt.unsafePublish('SMpool/pool/switch/comands', 'ON_');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  onSwitchClick(event: any) {
    event.preventDefault()

    let msg = this.switchState == 'ON_' ? 'OFF' : 'ON_';
    this.eventMqtt.unsafePublish('SMpool/pool/switch/comands', msg);
    (document.getElementById('switchButton') as HTMLInputElement).disabled = true;
    (async () => {
      await new Promise(f => setTimeout(f, 10000));
      (document.getElementById('switchButton') as HTMLInputElement).disabled = false;
    })();
  }




}
