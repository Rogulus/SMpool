import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {


  pumpScheduleEnabled = false;
  startHour = 12;
  startMinute = 30;
  startSecond= 30;
  stopHour = 12;
  stopMinute = 30;
  stopSecond = 30;

  solarHeatingEnabled = true;
  desiredDegrees = 23;
  wattTreshold = 400;

  watterLevel = '+3';


  constructor(private http: HttpService) { }

  ngOnInit(): void {
    //nasat data a update pump schedule enabled
    //dat toggles do spravne polohy  a odpovidajici data


  }


   onScheduleToggle(event: any) {
  //   event.preventDefault()
     console.log("todo onScheduleToggle");
  //
  //   let msg = this.switchState == 'ON_' ? 'OFF' : 'ON_';
  //   this.eventMqtt.unsafePublish('SMpool/pool/switch/comands', msg);
  //   (document.getElementById('scheduleButton') as HTMLInputElement).disabled = true;
  //   (async () => {
  //     await new Promise(f => setTimeout(f, 10000));
  //     (document.getElementById('switchButton') as HTMLInputElement).disabled = false;
  //   })();
   }

  startHourChange(event: any) {
    this.startHour = event.value;
  }

  startMinuteChange(event: any) {
    this.startMinute = event.value;
  }

  startSecondChange(event: any) {
    this.startSecond = event.value;
  }

  stopHourChange(event: any) {
    this.stopHour = event.value;
  }

  stopMinuteChange(event: any) {
    this.stopMinute = event.value;
  }

  stopSecondChange(event: any) {
    this.stopSecond = event.value;
  }

  onScheduleSubmit(){
    console.log("todo onScheduleSubmit")
  }

  onSolarHeatingToggle(event: any){
    console.log("todo onSolarHeatingToggle")
  }

  desiredDegrsesChange(event:any){
    this.desiredDegrees = event.value;
  }

  wattThresholdChange(event:any){
    this.wattTreshold = event.value;
  }

  onSolarHeatingSubmit(){
    console.log("todo onSolarHeatingSubmit")
  }

  onWatterLevelSetDefault(){
    console.log("todo onWatterLevelSetDefault")
  }
}
