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
  'solar_heating': SolarHeating;
  'watterLevel': WatterLevel
}
