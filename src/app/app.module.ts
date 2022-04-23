import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './homepage/header/header.component';
import { CartminiComponent } from './homepage/header/cartmini/cartmini.component';
import { SearchboxComponent } from './homepage/header/searchbox/searchbox.component';
import { MenuComponent } from './homepage/header/menu/menu.component';
import { CategoryboxComponent } from './homepage/categorybox/categorybox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderComponent } from './homepage/slider/slider.component';
import { FeaturettesComponent } from './homepage/featurettes/featurettes.component';
import { FooterComponent } from './homepage/footer/footer.component';
import { CategoryComponent } from './homepage/category/category.component';
import { ProductComponent } from './homepage/product/product.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { LoginComponent } from './login/login.component';
import { RedirectorComponent } from './redirector/redirector.component';
import { CartComponent } from './homepage/cart/cart.component';
import { CheckoutComponent } from './homepage/cart/checkout/checkout.component';
import { OrdersComponent } from './homepage/orders/orders.component';
import { ProductdetailComponent } from './homepage/productdetail/productdetail.component';

export function validateUserLogin(userService: UserService) {
  return () => userService.validateLogin();
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    CartminiComponent,
    SearchboxComponent,
    MenuComponent,
    CategoryboxComponent,
    SliderComponent,
    FeaturettesComponent,
    FooterComponent,
    CategoryComponent,
    ProductComponent,
    RegisterComponent,
    LoginComponent,
    RedirectorComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    ProductdetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: validateUserLogin,
      deps: [UserService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
