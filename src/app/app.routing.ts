import {RouterModule, Routes} from '@angular/router';
import {MarcaCadastrarComponent} from "./gerenciar/marca/marca-cadastrar/marca-cadastrar.component";
import {MarcaListaComponent} from "./gerenciar/marca/marca-lista/marca-lista.component";
import {MarcaComponent} from "./gerenciar/marca/marca.component";
import {MedidaComponent} from "./gerenciar/medida/medida.component";
import {MedidaListarComponent} from "./gerenciar/medida/medida-listar/medida-listar.component";
import {MedidaCadastrarComponent} from "./gerenciar/medida/medida-cadastrar/medida-cadastrar.component";
import {CategoriaListarComponent} from "./gerenciar/categoria/categoria-listar/categoria-listar.component";
import {CategoriaComponent} from "./gerenciar/categoria/categoria.component";
import {CategoriaCadastrarComponent} from "./gerenciar/categoria/categoria-cadastrar/categoria-cadastrar.component";
import {SubcategoriaComponent} from "./gerenciar/subcategoria/subcategoria.component";
import {SubcategoriaListarComponent} from "./gerenciar/subcategoria/subcategoria-listar/subcategoria-listar.component";
import {SubcategoriaCadastrarComponent} from "./gerenciar/subcategoria/subcategoria-cadastrar/subcategoria-cadastrar.component";
import {FormasdepagamentoComponent} from "./gerenciar/formasdepagamento/formasdepagamento.component";
import {FormasdepagamentoCadastrarComponent} from "./gerenciar/formasdepagamento/formasdepagamento-cadastrar/formasdepagamento-cadastrar.component";
import {FormasdepagamentoListarComponent} from "./gerenciar/formasdepagamento/formasdepagamento-listar/formasdepagamento-listar.component";
import {FornecedorListarComponent} from "./gerenciar/fornecedor/fornecedor-listar/fornecedor-listar.component";
import {FornecedorCadastrarComponent} from "./gerenciar/fornecedor/fornecedor-cadastrar/fornecedor-cadastrar.component";
import {FornecedorComponent} from "./gerenciar/fornecedor/fornecedor.component";
import {DominioListarComponent} from "./gerenciar/dominio/dominio-listar/dominio-listar.component";
import {DominioCadastrarComponent} from "./gerenciar/dominio/dominio-cadastrar/dominio-cadastrar.component";
import {DominioComponent} from "./gerenciar/dominio/dominio.component";
import {ProdutoListarComponent} from "./gerenciar/produto/produto-listar/produto-listar.component";
import {ProdutoCadastrarComponent} from "./gerenciar/produto/produto-cadastrar/produto-cadastrar.component";
import {ProdutoComponent} from "./gerenciar/produto/produto.component";
import {VandaAddProdutoComponent} from "./gerenciar/venda/vanda-add-produto/vanda-add-produto.component";
import {VendaConfirmarComponent} from "./gerenciar/venda/venda-confirmar/venda-confirmar.component";
import {VendaComponent} from "./gerenciar/venda/venda.component";
import {VendaImprimirComponent} from "./gerenciar/venda/venda-imprimir/venda-imprimir.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./gerenciar/login/login.component";
import {AuthGuard} from "./guards/auth.guard";

const appRoutes: Routes = [
  {
    path: 'marca', component: MarcaComponent, children: [
      {path: 'cadastrar', component: MarcaCadastrarComponent},
      {path: ':codigo/editar', component: MarcaCadastrarComponent},
      {path: 'listar', component: MarcaListaComponent},
    ]
  }, {
    path: 'medida', component: MedidaComponent, children: [
      {path: 'cadastrar', component: MedidaCadastrarComponent},
      {path: ':codigo/editar', component: MedidaCadastrarComponent},
      {path: 'listar', component: MedidaListarComponent},
    ]
  }, {
    path: 'categoria', component: CategoriaComponent, children: [
      {path: 'cadastrar', component: CategoriaCadastrarComponent},
      {path: ':codigo/editar', component: CategoriaCadastrarComponent},
      {path: 'listar', component: CategoriaListarComponent}
    ]
  }, {
    path: 'subcategoria', component: SubcategoriaComponent, children: [
      {path: 'cadastrar', component: SubcategoriaCadastrarComponent},
      {path: ':codigo/editar', component: SubcategoriaCadastrarComponent},
      {path: 'listar', component: SubcategoriaListarComponent}
    ]
  }, {
    path: 'formasdepagamento', component: FormasdepagamentoComponent, children: [
      {path: 'cadastrar', component: FormasdepagamentoCadastrarComponent},
      {path: ':codigo/editar', component: FormasdepagamentoCadastrarComponent},
      {path: 'listar', component: FormasdepagamentoListarComponent}
    ]
  }, {
    path: 'fornecedor', component: FornecedorComponent, children: [
      {path: 'cadastrar', component: FornecedorCadastrarComponent},
      {path: ':codigo/editar', component: FornecedorCadastrarComponent},
      {path: 'listar', component: FornecedorListarComponent}
    ]
  }, {
    path: 'dominio', component: DominioComponent, children: [
      {path: 'cadastrar', component: DominioCadastrarComponent},
      {path: ':codigo/editar', component: DominioCadastrarComponent},
      {path: 'listar', component: DominioListarComponent}
    ]
  }, {
    path: 'produto', component: ProdutoComponent, children: [
      {path: 'cadastrar', component: ProdutoCadastrarComponent},
      {path: ':codigo/editar', component: ProdutoCadastrarComponent},
      {path: 'listar', component: ProdutoListarComponent}
    ]
  }, {
    path: 'venda', component: VendaComponent, children: [
      {path: 'venda-add-produto', component: VandaAddProdutoComponent},
      {path: ':codigo/confirmar', component: VendaConfirmarComponent},
      {path: ':codigo/imprimir', component: VendaImprimirComponent}
    ]
  }, {
    path: '', component: DashboardComponent, canActivate: [AuthGuard]
  },{
    path: 'login', component: LoginComponent
  },
  // otherwise redirect to home
  {path: '**', redirectTo: ""}
];

export const routing = RouterModule.forRoot(appRoutes);
