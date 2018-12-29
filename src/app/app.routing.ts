import {RouterModule, Routes} from '@angular/router';
import {MarcaCadastrarComponent} from "./gerenciar/marca/marca-cadastrar/marca-cadastrar.component";
import {MarcaListaComponent} from "./gerenciar/marca/marca-lista/marca-lista.component";
import {MarcaComponent} from "./gerenciar/marca/marca.component";
import {MedidaComponent} from "./gerenciar/medida/medida.component";
import {MedidaListarComponent} from "./gerenciar/medida/medida-listar/medida-listar.component";
import {MedidaCadastrarComponent} from "./gerenciar/medida/medida-cadastrar/medida-cadastrar.component";

const appRoutes: Routes = [
    {path: 'marca', component: MarcaComponent, children: [
            {path: 'cadastrar', component: MarcaCadastrarComponent},
            {path: ':codigo/editar', component: MarcaCadastrarComponent},
            {path: 'listar', component: MarcaListaComponent},
    ]},
    {path: 'medida', component: MedidaComponent, children: [
            {path: 'cadastrar', component: MedidaCadastrarComponent},
            {path: ':codigo/editar', component: MedidaCadastrarComponent},
            {path: 'listar', component: MedidaListarComponent},
        ]},

    // otherwise redirect to home
    {path: '**', redirectTo: ""}
];

export const routing = RouterModule.forRoot(appRoutes);