import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {AutomaticFunctionsRes} from "../../interfaces/system/automatic-functions-res";
import {MatSnackBar} from "@angular/material/snack-bar";


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
  wattThreshold = 400;

  watterLevel = -3;
  levelSign = ''

  data = <AutomaticFunctionsRes>{};

  constructor(private http: HttpService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.http.getAutomaticFunctionsData().subscribe(data => {
      this.updateValues(data);
      this.data = data;
    })
    //nasat data a update pump schedule enabled
    //dat toggles do spravne polohy  a odpovidajici data


  }

  timeToHours(secs: number){
    return Math.floor(secs/3600)
  }

  timeToMinutes(secs: number){
    return Math.floor(secs % 3600 / 60)
  }

  timeToSeconds(secs: number){
    return Math.floor(secs% 3600 % 60)
  }

  toSecs(hours:number, minutes: number, secs:number){
    return hours*3600 +minutes*60 + secs;
  }

  lxToWatt(lx: number){
    return Math.floor(lx * 0.0079)
  }

  wattToLx(watt: number){
    return Math.floor(watt / 0.0079)
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

  updateValues(data:AutomaticFunctionsRes){
    this.pumpScheduleEnabled = data.pumpSchedule.enabled;
    this.startHour = this.timeToHours(data.pumpSchedule.startTime);
    this.startMinute = this.timeToMinutes(data.pumpSchedule.startTime);
    this.startSecond = this.timeToSeconds(data.pumpSchedule.startTime);
    this.stopHour = this.timeToHours(data.pumpSchedule.stopTime);
    this.stopMinute = this.timeToMinutes(data.pumpSchedule.stopTime);
    this.stopSecond = this.timeToSeconds(data.pumpSchedule.stopTime);
    this.solarHeatingEnabled = data.solarHeating.enabled;
    this.desiredDegrees = data.solarHeating.desiredTemperature;
    this.wattThreshold = this.lxToWatt(data.solarHeating.lightIntensityThreshold);
    this.watterLevel = data.watterLevel.level;
    this.levelSign = this.watterLevel >= 0 ? '+' : '';
  }

  onScheduleSubmit(){
    this.data.pumpSchedule.enabled = this.pumpScheduleEnabled;
    this.data.pumpSchedule.startTime = this.toSecs(this.startHour, this.startMinute, this.startSecond);
    this.data.pumpSchedule.stopTime = this.toSecs(this.stopHour, this.stopMinute, this.stopSecond);
    this.http.putAutomaticFunctionsData(this.data).subscribe(data => {
      this.data = data;
      this.snackBar.open('Success!','',{duration:3000,panelClass: ['my-snack-bar']});
    })
  }

  desiredDegreesChange(event:any){
    this.desiredDegrees = event.value;
  }

  wattThresholdChange(event:any){
    this.wattThreshold = event.value;
  }

  onSolarHeatingSubmit(){
    this.data.solarHeating.enabled = this.solarHeatingEnabled;
    this.data.solarHeating.desiredTemperature = this.desiredDegrees;
    this.data.solarHeating.lightIntensityThreshold = this.wattToLx(this.wattThreshold)
    this.http.putAutomaticFunctionsData(this.data).subscribe(data => {
      this.data = data;
      this.snackBar.open('Success!','',{duration:3000,panelClass: ['my-snack-bar']});
    })
  }

  watterLevelChange(event:any){
    this.watterLevel = event.value;
    this.levelSign = this.watterLevel >= 0? '+' : '';
  }


  onWatterLevelSetDefault(){
    this.watterLevel = 0;
    this.levelSign = '+';
  }

  onWatterLevelSubmit(){
    this.data.watterLevel.level = this.watterLevel;
    this.http.putAutomaticFunctionsData(this.data).subscribe(data => {
      this.data = data;
      this.snackBar.open('Success!','',{duration:3000,panelClass: ['my-snack-bar']});
    })
  }

  onSubmitAll(){
    this.data.pumpSchedule.enabled = this.pumpScheduleEnabled;
    this.data.pumpSchedule.startTime = this.toSecs(this.startHour, this.startMinute, this.startSecond);
    this.data.pumpSchedule.stopTime = this.toSecs(this.stopHour, this.stopMinute, this.stopSecond);
    this.data.solarHeating.enabled = this.solarHeatingEnabled;
    this.data.solarHeating.desiredTemperature = this.desiredDegrees;
    this.data.solarHeating.lightIntensityThreshold = this.wattToLx(this.wattThreshold)
    this.data.watterLevel.level = this.watterLevel;
    this.http.putAutomaticFunctionsData(this.data).subscribe(data => {
      this.data = data;
      this.updateValues(data);
      this.snackBar.open('Success!','',{duration:3000,panelClass: ['my-snack-bar']});
    })
  }
}
