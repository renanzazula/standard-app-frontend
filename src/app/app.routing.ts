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

const appRoutes: Routes = [
    {
        path: 'marca', component: MarcaComponent, children: [
            {path: 'cadastrar', component: MarcaCadastrarComponent},
            {path: ':codigo/editar', component: MarcaCadastrarComponent},
            {path: 'listar', component: MarcaListaComponent},
        ]
    },{
        path: 'medida', component: MedidaComponent, children: [
            {path: 'cadastrar', component: MedidaCadastrarComponent},
            {path: ':codigo/editar', component: MedidaCadastrarComponent},
            {path: 'listar', component: MedidaListarComponent},
        ]
    },{
        path: 'categoria', component: CategoriaComponent, children: [
            {path: 'cadastrar', component: CategoriaCadastrarComponent},
            {path: ':codigo/editar', component: CategoriaCadastrarComponent},
            {path: 'listar', component: CategoriaListarComponent}
        ]
    },{
        path: 'subcategoria', component: SubcategoriaComponent, children: [
            {path: 'cadastrar', component: SubcategoriaCadastrarComponent},
            {path: ':codigo/editar', component: SubcategoriaCadastrarComponent},
            {path: 'listar', component: SubcategoriaListarComponent}
        ]
    },
    // otherwise redirect to home
    {path: '**', redirectTo: ""}
];

export const routing = RouterModule.forRoot(appRoutes);