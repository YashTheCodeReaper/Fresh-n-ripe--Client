import { ProductdetailComponent } from './homepage/productdetail/productdetail.component';
import { OrdersComponent } from './homepage/orders/orders.component';
import { AuthguardService } from './services/authguard.service';
import { CheckoutComponent } from './homepage/cart/checkout/checkout.component';
import { CartComponent } from './homepage/cart/cart.component';
import { RedirectorComponent } from './redirector/redirector.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './homepage/category/category.component';
import { FeaturettesComponent } from './homepage/featurettes/featurettes.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      {
        path: '',
        component: FeaturettesComponent,
      },
      {
        path: ':category/:subcategory',
        component: CategoryComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthguardService],
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthguardService],
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthguardService],
      },
      {
        path: 'product/detail/:id',
        component: ProductdetailComponent,
      },
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'redirector',
    component: RedirectorComponent,
    canActivate: [AuthguardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
