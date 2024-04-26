import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpService } from 'src/app/core/services/http.service';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-top-deals',
  templateUrl: './top-deals.component.html',
  styleUrls: ['./top-deals.component.scss']
})
export class TopDealsComponent {

  topDeals: any = [];

  constructor(private httpservice: HttpService, private cart: CartService) {

  }

  ngOnInit() {
    this.getTopDeals();
  }

  getTopDeals() {
    const endPointName = 'top-deals';
    this.httpservice.getDataFromServer(endPointName).subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.topDeals = response;
          console.log("top-deals", this.topDeals)
        }
      },
      error: () => {

      }
    })
  }

  addToCart(productObj: any) {
    this.cart.addToCart(productObj);
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}