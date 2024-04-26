import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: any;
  orderObj: Order = new Order();
  productlist: Product[] = [];
  count: number = 0;

  constructor(private cartSrv: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = this.cartSrv.getCartItemsFromLocalStorage();
    this.cartSrv.cartCount$.subscribe(count => {
      this.count = count;
    });
    console.log("cartItems", this.cartItems)
    this.setProductList();
    this.calculateTotalPrice();
  }

  setProductList() {
    if (this.cartItems && this.cartItems.length > 0) {
      this.cartItems.forEach((item: any) => {
        var productObj = new Product();
        productObj.productName = item.medicineName;
        productObj.brand = item.brand;
        productObj.description = item.description;
        productObj.actualPrice = item.actualPrice;
        productObj.quantity = 1;
        productObj.discountPrice = item.discountPrice;
        productObj.totalPrice = productObj.discountPrice * productObj.quantity;
        productObj.type = item.type;
        productObj.drugCode = item.drugCode;
        this.productlist.push(productObj);
      });
      this.orderObj.products = this.productlist;
      console.log(this.productlist, "list");
    }
  }

  quantityChange(index: number, action: string) {
    const selectedProduct = this.orderObj.products[index];
    if (action === 'increment') {
      selectedProduct.quantity++;
    } else if (action === 'decrement') {
      if (selectedProduct.quantity === 1) {
        const confirmation = confirm("Are you sure you want to remove this item?");
        if (confirmation) {
          this.removeProduct(index);
        }
      } else {
        selectedProduct.quantity--;
        selectedProduct.totalPrice = selectedProduct.discountPrice * selectedProduct.quantity;
        this.calculateTotalPrice();
      }
    }
  }
  removeProduct(index: number) {
    this.orderObj.products.splice(index, 1);
    this.calculateTotalPrice();
    this.cartSrv.updateCartCount(this.orderObj.products.length);
  }

  calculateTotalPrice() {
    this.orderObj.totalAmount = 0;
    this.orderObj.totalDiscount = 0;
    this.orderObj.products.forEach((item: any) => {
      console.log("item price", item.totalPrice);
      this.orderObj.totalAmount += Number(item.totalPrice);
    })
    this.orderObj.totalDiscount = 50;
    this.orderObj.finalAmount = this.orderObj.totalAmount - this.orderObj.totalDiscount;
  }

  checkout() {
    this.cartItems.setOrderDetails(this.orderObj);
    this.router.navigate(['/booking-details']);
  }
}

export class Order {
  orderId!: string;
  fullName!: string;
  mobileNo!: number;
  emailId!: string;
  dob!: string;
  gender!: string;
  totalAmount!: number;
  totalDiscount!: number;
  totalItems!: number;
  finalAmount!: number;
  deliveryType!: string;
  addressDetails: Address = new Address();
  products: Product[] = [];
  ispaymentCompleted: boolean = false;
}

export class Address {
  city!: string;
  pincode!: number;
  state!: string;
  addressLine1!: string;
  addressLine2!: string;
}

export class Product {
  productName!: string;
  actualPrice!: number;
  quantity!: number;
  drugCode!: string;
  totalPrice!: number;
  discountPrice!: number;
  description!: string;
  brand!: string;
  type!: string;
}

