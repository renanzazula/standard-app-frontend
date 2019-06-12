import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from "./menu/menu.component";
import {MarcaComponent} from './gerenciar/marca/marca.component';
import {MarcaListaComponent} from './gerenciar/marca/marca-lista/marca-lista.component';
import {DialogComponent} from "./mensagens/dialog/dialog.component";
import {MatDialog, MatDialogModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MarcaCadastrarComponent} from './gerenciar/marca/marca-cadastrar/marca-cadastrar.component';
import {AlertaComponent} from './mensagens/alerta/alerta.component';
import {AlertaService} from "./service/mensagens/alerta/alerta.service";
import {routing} from "./app.routing";
import {MarcaService} from "./service/marca/marca.service";
import {MedidaComponent} from './gerenciar/medida/medida.component';
import {MedidaListarComponent} from './gerenciar/medida/medida-listar/medida-listar.component';
import {MedidaCadastrarComponent} from './gerenciar/medida/medida-cadastrar/medida-cadastrar.component';
import {MedidaService} from "./service/medida/medida.service";
import {CategoriaService} from "./service/categoria/categoria.service";
import {SubCategoriaService} from "./service/subcategoria/sub-categoria.service";
import {DisableControlDirective} from "./directives/disable-control-directive";
import {CategoriaComponent} from './gerenciar/categoria/categoria.component';
import {CategoriaListarComponent} from './gerenciar/categoria/categoria-listar/categoria-listar.component';
import {CategoriaCadastrarComponent} from './gerenciar/categoria/categoria-cadastrar/categoria-cadastrar.component';
import {SubcategoriaListarComponent} from './gerenciar/subcategoria/subcategoria-listar/subcategoria-listar.component';
import {SubcategoriaCadastrarComponent} from './gerenciar/subcategoria/subcategoria-cadastrar/subcategoria-cadastrar.component';
import {SubcategoriaComponent} from './gerenciar/subcategoria/subcategoria.component';
import {FormasdepagamentoListarComponent} from './gerenciar/formasdepagamento/formasdepagamento-listar/formasdepagamento-listar.component';
import {FormasdepagamentoCadastrarComponent} from './gerenciar/formasdepagamento/formasdepagamento-cadastrar/formasdepagamento-cadastrar.component';
import {FormasdepagamentoComponent} from './gerenciar/formasdepagamento/formasdepagamento.component';
import {FormasDePagamentoService} from "./service/formasDePagamento/formas-de-pagamento.service";
import {FornecedorCadastrarComponent} from './gerenciar/fornecedor/fornecedor-cadastrar/fornecedor-cadastrar.component';
import {FornecedorListarComponent} from './gerenciar/fornecedor/fornecedor-listar/fornecedor-listar.component';
import {FornecedorComponent} from "./gerenciar/fornecedor/fornecedor.component";
import {FornecedorService} from "./service/fornecedor/fornecedor.service";
import {DominioComponent} from './gerenciar/dominio/dominio.component';
import {DominioCadastrarComponent} from './gerenciar/dominio/dominio-cadastrar/dominio-cadastrar.component';
import {DominioListarComponent} from './gerenciar/dominio/dominio-listar/dominio-listar.component';
import {DominioService} from "./service/dominio/dominio.service";
import {ProdutoCadastrarComponent} from './gerenciar/produto/produto-cadastrar/produto-cadastrar.component';
import {ProdutoListarComponent} from './gerenciar/produto/produto-listar/produto-listar.component';
import {ProdutoComponent} from "./gerenciar/produto/produto.component";
import {ProdutoService} from "./service/produto/produto.service";
import {CollapseControlDirective} from "./directives/collapse-control-directive";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {FileSelectDirective} from "ng2-file-upload";
import {VendaComponent} from './gerenciar/venda/venda.component';
import {VandaAddProdutoComponent} from './gerenciar/venda/vanda-add-produto/vanda-add-produto.component';
import {DialogTableComponent} from "./mensagens/dialogTable/dialog.table.component";
import {VendaService} from "./service/venda/venda.service";


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        HeaderComponent,
        MenuComponent,
        HeaderComponent,
        MarcaComponent,
        MarcaListaComponent,
        MarcaCadastrarComponent,
        DialogComponent,
        DialogTableComponent,
        AlertaComponent,
        MedidaComponent,
        MedidaListarComponent,
        MedidaCadastrarComponent,
        DisableControlDirective,
        CollapseControlDirective,
        CategoriaComponent,
        CategoriaListarComponent,
        CategoriaCadastrarComponent,
        SubcategoriaListarComponent,
        SubcategoriaCadastrarComponent,
        SubcategoriaComponent,
        FormasdepagamentoListarComponent,
        FormasdepagamentoCadastrarComponent,
        FormasdepagamentoComponent,
        FornecedorCadastrarComponent,
        FornecedorListarComponent,
        FornecedorComponent,
        DominioComponent,
        DominioCadastrarComponent,
        DominioListarComponent,
        ProdutoCadastrarComponent,
        ProdutoListarComponent,
        ProdutoComponent,
        FileSelectDirective,
        VendaComponent,
        VandaAddProdutoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        routing,
        CurrencyMaskModule,
    ],
    entryComponents: [DialogComponent, DialogTableComponent],
    providers: [AlertaService, MarcaService,
        MatDialog, MedidaService, CategoriaService,
        SubCategoriaService, FormasDePagamentoService,
        FornecedorService, DominioService, ProdutoService, VendaService],
    bootstrap: [AppComponent]
})
export class AppModule {


}
