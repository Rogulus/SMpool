export class Admin {
  admin_exists: boolean;
  name: string;
//todo udelat prvate a udelat getry a setry
  constructor() {
    this.admin_exists = false;
    this.name = "";
  }

  setAdmin(name:string){
    if( ! this.admin_exists ){
      throw new Error("Admin Already exists")
    }
    this.admin_exists = true
    this.name = name
  }

  adminIsSet(){
    return this.admin_exists
  }
}
