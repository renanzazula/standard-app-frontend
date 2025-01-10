import { RouterModule, Routes } from '@angular/router';
import { PaymentMethodComponent } from './gerenciar/paymentMethod/paymentMethod.component';
import { PaymentMethodSaveComponent } from './gerenciar/paymentMethod/paymentMethod-save/paymentMethod-save.component';
import { DomainSaveComponent } from './gerenciar/domain/domain-save/domain-save.component';
import { DomainComponent } from './gerenciar/domain/domain.component';
import { OrderConfirmComponent } from './gerenciar/order/order-confirm/order-confirm.component';
import { OrderComponent } from './gerenciar/order/order.component';
import { OrderPrintComponent } from './gerenciar/order/order-print/order-print.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './gerenciar/login/login.component';
import { authGuard } from './guards/auth.guard';
import { BrandComponent } from './gerenciar/brand/brand.component';
import { BrandSaveComponent } from './gerenciar/brand/brand-save/brand-save.component';
import { BrandListComponent } from './gerenciar/brand/brand-list/brand-list.component';
import { MeasureListComponent } from './gerenciar/measure/measure-list/measure-list.component';
import { MeasureSaveComponent } from './gerenciar/measure/measure-save/measure-save.component';
import { MeasureComponent } from './gerenciar/measure/measure.component';
import { CategoryComponent } from './gerenciar/category/category.component';
import { CategoryListComponent } from './gerenciar/category/category-list/category-list.component';
import { CategorySaveComponent } from './gerenciar/category/category-save/category-save.component';
import { OrderAddProductComponent } from './gerenciar/order/order-add-product/order-add-product.component';
import { DomainListComponent } from './gerenciar/domain/domain-list/domain-list.component';
import { SubcategoryComponent } from './gerenciar/subcategory/subcategory.component';
import { SubcategorySaveComponent } from './gerenciar/subcategory/subcategory-save/subcategory-save.component';
import { SubcategoryListComponent } from './gerenciar/subcategory/subcategory-list/subcategory-list.component';
import { PaymentMethodListComponent } from './gerenciar/paymentMethod/paymentMethod-list/paymentMethod-list.component';
import { ProviderComponent } from './gerenciar/provider/provider.component';
import { ProviderSaveComponent } from './gerenciar/provider/provider-save/provider-save.component';
import { ProviderListComponent } from './gerenciar/provider/provider-list/provider-list.component';
import { ProductComponent } from './gerenciar/product/product.component';
import { ProductSaveComponent } from './gerenciar/product/product-save/product-save.component';
import { ProductListComponent } from './gerenciar/product/produto-listar/product-list.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'brand', component: BrandComponent, children: [
      {path: 'save', component: BrandSaveComponent, canActivate: [authGuard]},
      {path: ':id/edit', component: BrandSaveComponent, canActivate: [authGuard]},
      {path: 'list', component: BrandListComponent, canActivate: [authGuard]},
    ]
  }, {
    path: 'measure', component: MeasureComponent, children: [
      {path: 'save', component: MeasureSaveComponent, canActivate: [authGuard]},
      {path: ':id/edit', component: MeasureSaveComponent, canActivate: [authGuard]},
      {path: 'list', component: MeasureListComponent, canActivate: [authGuard]},
    ]
  }, {
    path: 'category', component: CategoryComponent, children: [
      {path: 'save', component: CategorySaveComponent, canActivate: [authGuard]},
      {path: ':id/edit', component: CategorySaveComponent, canActivate: [authGuard]},
      {path: 'list', component: CategoryListComponent, canActivate: [authGuard]}
    ]
  }, {
    path: 'subcategory', component: SubcategoryComponent, children: [
      {path: 'save', component: SubcategorySaveComponent, canActivate: [authGuard]},
      {path: ':id/edit', component: SubcategorySaveComponent, canActivate: [authGuard]},
      {path: 'list', component: SubcategoryListComponent, canActivate: [authGuard]}
    ]
  }, {
    path: 'paymentMethod', component: PaymentMethodComponent, children: [
      {path: 'save', component: PaymentMethodSaveComponent, canActivate: [authGuard]},
      {path: ':id/edit', component: PaymentMethodSaveComponent, canActivate: [authGuard]},
      {path: 'list', component: PaymentMethodListComponent, canActivate: [authGuard]}
    ]
  }, {
    path: 'provider', component: ProviderComponent, children: [
      {path: 'save', component: ProviderSaveComponent, canActivate: [authGuard]},
      {path: ':id/edit', component: ProviderSaveComponent, canActivate: [authGuard]},
      {path: 'list', component: ProviderListComponent, canActivate: [authGuard]}
    ]
  }, {
    path: 'domain', component: DomainComponent, children: [
      {path: 'save', component: DomainSaveComponent, canActivate: [authGuard]},
      {path: ':id/edit', component: DomainSaveComponent, canActivate: [authGuard]},
      {path: 'list', component: DomainListComponent, canActivate: [authGuard]}
    ]
  }, {
    path: 'product',     component: ProductComponent, children: [
      {path: 'save',     component: ProductSaveComponent, canActivate: [authGuard]},
      {path: ':id/edit', component: ProductSaveComponent, canActivate: [authGuard]},
      {path: 'list',     component: ProductListComponent, canActivate: [authGuard]}
    ]
  }, {
    path: 'order', component: OrderComponent, children: [
      {path: 'order-add-product', component: OrderAddProductComponent, canActivate: [authGuard]},
      {path: ':id/confirm', component: OrderConfirmComponent, canActivate: [authGuard]},
      {path: ':id/print', component: OrderPrintComponent, canActivate: [authGuard]}
    ]
  }
  // otherwise redirect to home
  //{path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
