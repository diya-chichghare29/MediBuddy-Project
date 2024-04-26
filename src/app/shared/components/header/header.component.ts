import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userDetails: any;
  hideLoginBtn: boolean = false;
  action: string = "Login";
  count: number = 0

 
  @ViewChild('closeBtn') closeBtn!: ElementRef
  
  constructor(private auth: AuthenticationService, private cartSrv: CartService, private router: Router) { }

  ngOnInit() {
    this.cartSrv.cartcount.subscribe((response: any) => {
      console.log("counter :" + this.count);
      if (response) {
        this.count = response;
      }
    })
    this.getCartItems()
  }

  getCartItems() {
    var CartItems = this.cartSrv.getCartItemsFromLocalStorage();
    if (CartItems != null) {
      this.count = CartItems.length;
    }
  }

  triggerAction(actionName: string) {
    this.action = actionName;
  }

  getData(isLoginSuccess: boolean) {
    if (isLoginSuccess) {
      this.hideLoginBtn = true;
      this.userDetails = this.auth.getUser();
      this.closeBtn.nativeElement.click();
    }
  }

  logOut() {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
    this.hideLoginBtn = false;
    this.userDetails = null;
  }

  navigateTo() {
    this.router.navigate(['/cart']);
    console.log("cart")
  }

  onSignUpSuccess() {
    this.closeBtn.nativeElement.click();    //signUp modal remove
  }
  
  // navigateTo() {
  //   // Open login modal on cart icon click
  //   this.loginModal.nativeElement.showModal();
  // }


}


