export interface User {
  exists: boolean;
  success: boolean;
  admin: boolean;
  username: string;
  fullName: string;
  email: string;
}


export class User {
  admin = false;
  username = '';
  fullName = '';
  email = '';

  constructor(isAdmin: boolean, username: string, fullName: string, email: string) {
    this.admin = isAdmin;
    this.username = username;
    this.fullName = fullName;
    this.email = email;
  }
}
