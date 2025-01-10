import {BrowserModule} from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from './menu/menu.component';
import {DialogComponent} from './mensagens/dialog/dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AlertComponent} from './mensagens/alert/alert.component';
import {AlertService} from './service/mensagens/alerta/alert.service';
import {routing} from './app.routing';
import {BrandService} from './service/brand/brand.service';
import {MeasureService} from './service/measure/measure.service';
import {CategoryService} from './service/category/category.service';
import {SubcategoryService} from './service/subcategory/subcategory.service';
import {DisableControlDirective} from './directives/disable-control-directive';
import {PaymentMethodService} from './service/paymentMethod/payment-method.service';
import {ProviderService} from './service/provider/provider.service';
import {DomainComponent} from './gerenciar/domain/domain.component';
import {DomainSaveComponent} from './gerenciar/domain/domain-save/domain-save.component';
import {DomainService} from './service/domain/domain.service';
import {ProductService} from './service/product/product.service';
import {CollapseControlDirective} from './directives/collapse-control-directive';
import {OrderComponent} from './gerenciar/order/order.component';
import {DialogTableComponent} from './mensagens/dialogTable/dialog.table.component';
import {OrderService} from './service/order/order.service';
import {OrderConfirmComponent} from './gerenciar/order/order-confirm/order-confirm.component';
import {OrderPrintComponent} from './gerenciar/order/order-print/order-print.component';
import {LoginComponent} from './gerenciar/login/login.component';
import {BrandComponent} from './gerenciar/brand/brand.component';
import {CategoryComponent} from './gerenciar/category/category.component';
import {OrderAddProductComponent} from './gerenciar/order/order-add-product/order-add-product.component';
import {ProductComponent} from './gerenciar/product/product.component';
import {BrandListComponent} from './gerenciar/brand/brand-list/brand-list.component';
import {BrandSaveComponent} from './gerenciar/brand/brand-save/brand-save.component';
import {MeasureComponent} from './gerenciar/measure/measure.component';
import {MeasureListComponent} from './gerenciar/measure/measure-list/measure-list.component';
import {MeasureSaveComponent} from './gerenciar/measure/measure-save/measure-save.component';
import {CategorySaveComponent} from './gerenciar/category/category-save/category-save.component';
import {CategoryListComponent} from './gerenciar/category/category-list/category-list.component';
import {ProductListComponent} from './gerenciar/product/produto-listar/product-list.component';
import {ProductSaveComponent} from './gerenciar/product/product-save/product-save.component';
import {DomainListComponent} from './gerenciar/domain/domain-list/domain-list.component';
import {ProviderSaveComponent} from './gerenciar/provider/provider-save/provider-save.component';
import {ProviderListComponent} from './gerenciar/provider/provider-list/provider-list.component';
import {ProviderComponent} from './gerenciar/provider/provider.component';
import {SubcategorySaveComponent} from './gerenciar/subcategory/subcategory-save/subcategory-save.component';
import {SubcategoryListComponent} from './gerenciar/subcategory/subcategory-list/subcategory-list.component';
import {SubcategoryComponent} from './gerenciar/subcategory/subcategory.component';
import {PaymentMethodListComponent} from './gerenciar/paymentMethod/paymentMethod-list/paymentMethod-list.component';
import {PaymentMethodSaveComponent} from './gerenciar/paymentMethod/paymentMethod-save/paymentMethod-save.component';
import {PaymentMethodComponent} from './gerenciar/paymentMethod/paymentMethod.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpTokenInterceptor } from './helpers/http-token.interceptor';
import { KeycloakService } from './helpers/keycloak.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    MenuComponent,
    HeaderComponent,
    BrandComponent,
    BrandListComponent,
    BrandSaveComponent,
    DialogComponent,
    DialogTableComponent,
    AlertComponent,
    MeasureComponent,
    MeasureListComponent,
    MeasureSaveComponent,
    DisableControlDirective,
    CollapseControlDirective,
    CategoryComponent,
    CategoryListComponent,
    CategorySaveComponent,
    SubcategoryListComponent,
    SubcategorySaveComponent,
    SubcategoryComponent,
    PaymentMethodListComponent,
    PaymentMethodSaveComponent,
    PaymentMethodComponent,
    ProviderSaveComponent,
    ProviderListComponent,
    ProviderComponent,
    DomainComponent,
    DomainSaveComponent,
    DomainListComponent,
    ProductSaveComponent,
    ProductListComponent,
    ProductComponent,
    // FileSelectDirective,
    OrderComponent,
    OrderAddProductComponent,
    OrderConfirmComponent,
    OrderPrintComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    routing,
    CurrencyMaskModule,
    CommonModule
  ],

  bootstrap: [AppComponent],

  providers: [
    AlertService, BrandService, MatDialog, MeasureService, CategoryService,
    SubcategoryService, PaymentMethodService, ProviderService, DomainService, ProductService, OrderService,
    {provide: APP_INITIALIZER, deps: [KeycloakService], useFactory: kcFactory, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
})
export class AppModule {


}


