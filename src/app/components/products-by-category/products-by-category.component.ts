import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { CartService } from 'src/app/cart/cart.service';
@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss']
})
export class ProductsByCategoryComponent implements OnInit {

  topDetalsByCategory: any;

  constructor(private http: HttpService, private cart: CartService) {

  }

  ngOnInit(): void {
    this.getProductDetlsByCategory();
  }

  getProductDetlsByCategory() {
    this.http.getDataFromServer('top-deals-by-category').subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.topDetalsByCategory = response;
        }
      },
      error: (error: any) => {

      }
    })
  }

  addToCart(productObj: any) {
    console.log("Adding product to cart:", productObj);
    this.cart.addToCart(productObj);


  }
}


