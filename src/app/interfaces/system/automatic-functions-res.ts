interface PumpSchedule {
  'enabled': boolean;
  'startTime': number;
  'stopTime': number
}

interface SolarHeating {
  'enabled': boolean;
  'desiredTemperature': number;
  'lightIntensityThreshold': number
}

interface WatterLevel {
  'level': number;
}



export interface AutomaticFunctionsRes {
  'pumpSchedule': PumpSchedule;
  'solarHeating': SolarHeating;
  'watterLevel': WatterLevel
}
