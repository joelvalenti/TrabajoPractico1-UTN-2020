import { BuscadorComponent } from './components/buscador/buscador.component';
import { ElementonoticiaComponent } from './components/elementonoticia/elementonoticia.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { TablanoticiaComponent } from './components/tablanoticia/tablanoticia.component';
import { TablaempresaComponent } from './components/tablaempresa/tablaempresa.component';
import { ElementohomeComponent } from './components/elementohome/elementohome.component';
import { ElementodetalleComponent } from './components/elementodetalle/elementodetalle.component';
import { Page404Component } from './components/modalempresa/page404/page404.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'tabla/empresa', component: TablaempresaComponent},
  { path: 'tabla/noticia', component: TablanoticiaComponent},
  { path: 'detalle/:id', component: ElementodetalleComponent},
  { path: 'noticia/:id', component: ElementonoticiaComponent},
  { path: 'home/:id', component: ElementohomeComponent},
  { path: 'buscador', component: BuscadorComponent},
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
