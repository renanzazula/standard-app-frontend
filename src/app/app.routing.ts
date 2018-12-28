import {RouterModule, Routes} from '@angular/router';
import {MarcaCadastrarComponent} from "./gerenciar/marca/marca-cadastrar/marca-cadastrar.component";
import {MarcaListaComponent} from "./gerenciar/marca/marca-lista/marca-lista.component";
import {MarcaComponent} from "./gerenciar/marca/marca.component";

const appRoutes: Routes = [
    {path: 'marca', component: MarcaComponent, children: [
            {path: 'cadastrar', component: MarcaCadastrarComponent},
            {path: ':codigo/editar', component: MarcaCadastrarComponent},
            {path: 'listar', component: MarcaListaComponent},
    ]},

    // otherwise redirect to home
    {path: '**', redirectTo: ""}
];

export const routing = RouterModule.forRoot(appRoutes);