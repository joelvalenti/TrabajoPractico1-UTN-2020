import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IndexComponent } from './components/index/index.component';
import { HomeComponent } from './components/home/home.component';
import { TablaempresaComponent } from './components/tablaempresa/tablaempresa.component';
import { ModalempresaComponent } from './components/modalempresa/modalempresa.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { TablanoticiaComponent } from './components/tablanoticia/tablanoticia.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpresaService } from './services/empresa.service';
import { ElementonoticiaComponent } from './components/elementonoticia/elementonoticia.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ElementohomeComponent } from './components/elementohome/elementohome.component';
import { ElementodetalleComponent } from './components/elementodetalle/elementodetalle.component';
import { Page404Component } from './components/modalempresa/page404/page404.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AgmCoreModule } from '@agm/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatTableModule } from '@angular/material/table';
import {NgxPaginationModule} from 'ngx-pagination';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    DetalleComponent,
    TablaempresaComponent,
    ModalempresaComponent,
    DetalleComponent,
    TablanoticiaComponent,
    ElementonoticiaComponent,
    ElementohomeComponent,
    ElementodetalleComponent,
    Page404Component,
    BuscadorComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    EditorModule,
    AutocompleteLibModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
    })
    // 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
    // 'AIzaSyCYZlfwf32f8iqEveyFdeVLtkHBMxK9518'
  ],
  providers: [EmpresaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
