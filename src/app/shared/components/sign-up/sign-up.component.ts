import { Component, EventEmitter, Output } from '@angular/core';
import { interval } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  userObj: User = new User();
  displayOtpField: boolean = false;
  otpGenerated!: number;
  otpTimer!: number
  otpEntered!: number;
  isOtpVerified: boolean = false;
  isotpInvalid: boolean = false;
  sub: any;


  @Output() signUpSuccess: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(private http: HttpService) { }

  ngOnInit() {

  }

  getOtp() {
    this.displayOtpField = true;
    this.otpGenerated = this.generateRandomNumber();
    console.log("OTP", this.otpGenerated);
    var sub = interval(1000).subscribe({
      next: (response) => {
        this.otpTimer = 60 - response;
        if (this.otpTimer == 0) {
          this.sub.unsubscribe();
        }
      }
    })
  }

  generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor
      (Math.random() * (maxm - minm + 1)) + minm;
  }

  verifyOTP() {
    if (this.otpGenerated == this.otpEntered) {
      this.displayOtpField = false;
      this.isOtpVerified = true;
      console.log('OTP Verified:', this.isOtpVerified);
      this.sub.unsubscribe();
      this.isotpInvalid = false;
      this.userObj.isOtpVerified = true;
      this.sub.unsubscribe();
    } else {
      this.displayOtpField = true;
      this.isOtpVerified = false;
      console.log('OTP Verification Failed:', this.isOtpVerified);
      this.isotpInvalid = true;
    }
  }

  signUp() {
    console.log("submit clicked");
    if (this.isOtpVerified) {
      this.http.postDataFromServer('users', this.userObj).subscribe({
        next: (response: any) => {
          if (response) {
           this.userObj = new User();
           this.signUpSuccess.emit();
          }
        },
        error: (error: any) => {
          console.error('Error:', error);
        }
      })
    }
  }
}



    class User {
      name!: string;
      email!: string;
      mobileNo!: string;
      password!: string;
      isOtpVerified!: boolean
    }

