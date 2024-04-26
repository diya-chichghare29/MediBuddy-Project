import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Order } from '../cart/cart.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../core/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent {

  finalOrder: Order | null = null;
  bookingForm!: FormGroup;

  constructor(private cartSsrv: CartService, private fb: FormBuilder, private http: HttpService, private router: Router) { }

  ngOnInit() {
    this.finalOrder = this.cartSsrv.getOrderDetails();
    this.createBookingDetails();
  }

  createBookingDetails() {
    this.bookingForm = this.fb.group({
      fullName: [''],
      mobileNo: [''],
      gender: [''],
      dob: [''],
      emialId: [''],
      address: this.fb.group({
        line1: [''],
        line2: [''],
        landmark: [''],
        pincode: [''],
        city: [''],
        state: ['']
      })
    })
  }

  bookOrder() {
    console.log("final Order before", this.finalOrder);
    if (this.finalOrder != null) {
      this.finalOrder.orderId = this.generateRamdomNumber().toString();
      this.finalOrder.fullName = this.bookingForm.get('fullName')?.value;
      this.finalOrder.mobileNo = this.bookingForm.get('mobileNo')?.value;
      this.finalOrder.emailId = this.bookingForm.get('emailId')?.value;
      this.finalOrder.dob = this.bookingForm.get('dob')?.value;
      this.finalOrder.gender = this.bookingForm.get('gender')?.value;
      this.finalOrder.addressDetails = this.bookingForm.get('address')?.value;

      console.log("final Order after", this.finalOrder);

      this.http.postDataFromServer("orders", this.finalOrder).subscribe((response: any) => {
        if (response) {
          this.router.navigate(['/place-order'])
        }
      })
    }
  }

  generateRamdomNumber() {
    var minm = 10000000;
    var maxm = 99999999;
    return Math.floor(Math
      .random() * (maxm - minm + 1)) + minm;
  }
}


