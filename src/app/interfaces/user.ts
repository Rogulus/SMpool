export interface User {
  id: number;
  name: string;
  surname: string;
  passwordHash: string;
}

export interface AdminIsSet {
  isSet: boolean;
}

export class AdminIsSet{
  isSet: boolean;
  constructor(is: boolean) {
    this.isSet = is
}

}
