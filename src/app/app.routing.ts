import {RouterModule, Routes} from '@angular/router';
import {PaymentMethodComponent} from './gerenciar/paymentMethod/paymentMethod.component';
import {PaymentMethodSaveComponent,} from './gerenciar/paymentMethod/paymentMethod-save/paymentMethod-save.component';
import {DomainSaveComponent} from './gerenciar/domain/domain-save/domain-save.component';
import {DomainComponent} from './gerenciar/domain/domain.component';
import {OrderConfirmComponent} from './gerenciar/order/order-confirm/order-confirm.component';
import {OrderComponent} from './gerenciar/order/order.component';
import {OrderPrintComponent} from './gerenciar/order/order-print/order-print.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './gerenciar/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {BrandComponent} from './gerenciar/brand/brand.component';
import {BrandSaveComponent} from './gerenciar/brand/brand-save/brand-save.component';
import {BrandListComponent} from './gerenciar/brand/brand-list/brand-list.component';
import {MeasureListComponent} from './gerenciar/measure/measure-list/measure-list.component';
import {MeasureSaveComponent} from './gerenciar/measure/measure-save/measure-save.component';
import {MeasureComponent} from './gerenciar/measure/measure.component';
import {CategoryComponent} from './gerenciar/category/category.component';
import {CategoryListComponent} from './gerenciar/category/category-list/category-list.component';
import {CategorySaveComponent} from './gerenciar/category/category-save/category-save.component';
import {OrderAddProductComponent} from './gerenciar/order/order-add-product/order-add-product.component';
import {DomainListComponent} from './gerenciar/domain/domain-list/domain-list.component';
import {SubcategoryComponent} from './gerenciar/subcategory/subcategory.component';
import {SubcategorySaveComponent} from './gerenciar/subcategory/subcategory-save/subcategory-save.component';
import {SubcategoryListComponent} from './gerenciar/subcategory/subcategory-list/subcategory-list.component';
import {PaymentMethodListComponent} from './gerenciar/paymentMethod/paymentMethod-list/paymentMethod-list.component';
import {ProviderComponent} from './gerenciar/provider/provider.component';
import {ProviderSaveComponent} from './gerenciar/provider/provider-save/provider-save.component';
import {ProviderListComponent} from './gerenciar/provider/provider-list/provider-list.component';
import {ProductComponent} from './gerenciar/product/product.component';
import {ProductSaveComponent} from './gerenciar/product/product-save/product-save.component';
import {ProductListComponent} from './gerenciar/product/produto-listar/product-list.component';

const appRoutes: Routes = [
  {
    path: 'brand', component: BrandComponent, children: [
      {path: 'save', component: BrandSaveComponent},
      {path: ':id/edit', component: BrandSaveComponent},
      {path: 'list', component: BrandListComponent},
    ]
  }, {
    path: 'measure', component: MeasureComponent, children: [
      {path: 'save', component: MeasureSaveComponent},
      {path: ':id/edit', component: MeasureSaveComponent},
      {path: 'list', component: MeasureListComponent},
    ]
  }, {
    path: 'category', component: CategoryComponent, children: [
      {path: 'save', component: CategorySaveComponent},
      {path: ':id/edit', component: CategorySaveComponent},
      {path: 'list', component: CategoryListComponent}
    ]
  }, {
    path: 'subcategory', component: SubcategoryComponent, children: [
      {path: 'save', component: SubcategorySaveComponent},
      {path: ':id/edit', component: SubcategorySaveComponent},
      {path: 'list', component: SubcategoryListComponent}
    ]
  }, {
    path: 'paymentMethod', component: PaymentMethodComponent, children: [
      {path: 'save', component: PaymentMethodSaveComponent},
      {path: ':id/edit', component: PaymentMethodSaveComponent},
      {path: 'list', component: PaymentMethodListComponent}
    ]
  }, {
    path: 'provider', component: ProviderComponent, children: [
      {path: 'save', component: ProviderSaveComponent},
      {path: ':id/edit', component: ProviderSaveComponent},
      {path: 'list', component: ProviderListComponent}
    ]
  }, {
    path: 'domain', component: DomainComponent, children: [
      {path: 'save', component: DomainSaveComponent},
      {path: ':id/edit', component: DomainSaveComponent},
      {path: 'list', component: DomainListComponent}
    ]
  }, {
    path: 'product',     component: ProductComponent, children: [
      {path: 'save',     component: ProductSaveComponent},
      {path: ':id/edit', component: ProductSaveComponent},
      {path: 'list',     component: ProductListComponent}
    ]
  }, {
    path: 'venda', component: OrderComponent, children: [
      {path: 'venda-add-product', component: OrderAddProductComponent},
      {path: ':id/confirmar', component: OrderConfirmComponent},
      {path: ':id/imprimir', component: OrderPrintComponent}
    ]
  }, {
    path: '', component: DashboardComponent, canActivate: [AuthGuard]
  }, {
    path: 'login', component: LoginComponent
  },
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
