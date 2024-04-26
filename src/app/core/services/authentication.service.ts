import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getUser() {
    var user: any;
    user = localStorage.getItem("userDetails");
    if (user != null) {
      user = JSON.parse(user);
    }
    return user;
  }
}
