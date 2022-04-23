export interface UserLogin {
  username: string;
  password: string;
  createSession: boolean;
}

export class UserLogin {
  username: string = '';
  password: string = '';
  createSession: boolean = false;

  constructor(username: string, password: string, createSession: boolean) {
    this.username = username;
    this.password = password;
    this.createSession = createSession;
  }
}
