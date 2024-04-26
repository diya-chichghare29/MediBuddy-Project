import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { MedicinesHomeComponent } from './components/medicines-home/medicines-home.component';
import { TopDealsComponent } from './components/top-deals/top-deals.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component'
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { PlaceOrderComponent } from './place-order/place-order.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MedicinesHomeComponent,
    TopDealsComponent,
    ProductsByCategoryComponent,
    CartComponent,
    BookingDetailsComponent,
    PlaceOrderComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
