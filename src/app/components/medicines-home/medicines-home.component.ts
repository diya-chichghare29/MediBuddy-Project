import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-medicines-home',
  templateUrl: './medicines-home.component.html',
  styleUrls: ['./medicines-home.component.scss']
})
export class MedicinesHomeComponent {
  pincode: string = '';
  city: string = '';

  constructor(private http: HttpClient) { }

  setPincode() {
    if (this.pincode) {
      this.http.get<any[]>('http://localhost:3000/pincodes?pincode=' + this.pincode)
        .subscribe
        ((data: any[]) => {
          if (data && data.length > 0) {
            this.city = data[0].pincodeCity;
          } else {
            this.city = 'City not found';
          }
          console.log('City:', this.city);
        },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
    }
  }

}