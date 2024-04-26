import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from './cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartArr: any[] = [];
  orderObj: Order | null = null;

  cartcount: BehaviorSubject<number> = new BehaviorSubject(0);
  cartCount$ = this.cartcount.asObservable();

  constructor() { }

  addToCart(productObj: any) {
    if (productObj) {
      var items = this.getCartItemsFromLocalStorage();
      if (items != null) {
        this.cartArr = items;
      }
      this.cartArr.push(productObj);
      var cartDetailstr = JSON.stringify(this.cartArr);
      localStorage.setItem("cart", cartDetailstr);
    }
    this.cartcount.next(this.cartArr.length);
  }

  getCartItemsFromLocalStorage() {
    var CartItems: any;

    CartItems = localStorage.getItem("cart");
    if (CartItems != null) {
      CartItems = JSON.parse(CartItems);
    }
    return CartItems;
  }

  setOrderDetails(order: Order) {
    this.orderObj = order;
  }

  getOrderDetails() {
    return this.orderObj;
  }

  updateCartCount(count: number) {
    this.cartcount.next(count);
  }
}
