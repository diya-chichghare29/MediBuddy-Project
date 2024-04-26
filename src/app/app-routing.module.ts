import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MedicinesHomeComponent } from './components/medicines-home/medicines-home.component';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';
import { CartComponent } from './cart/cart.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PlaceOrderComponent } from './place-order/place-order.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'medicine', component: MedicinesHomeComponent },
  { path: 'otcCategory', component: ProductsByCategoryComponent },
  { path: 'cart', component: CartComponent },
  { path: "booking-details", component: BookingDetailsComponent },
  { path: "place-order", component: PlaceOrderComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
