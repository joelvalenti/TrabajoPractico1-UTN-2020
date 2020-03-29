import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmpresaService } from './../../services/empresa.service';
import { Empresa } from './../../model/empresa';
import { NoticiaService } from './../../services/noticia.service';
import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/model/noticia';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-elementonoticia',
  templateUrl: './elementonoticia.component.html',
  styleUrls: ['./elementonoticia.component.css']
})
export class ElementonoticiaComponent implements OnInit {

  public empresas: Empresa[];
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  noticias: Noticia[];

  noticia: Noticia = {
    id: 0,
    titulo_de_la_noticia: '',
    resumen_de_la_noticia: '',
    imagen_noticia: '',
    contenido_html: '',
    publicada: '',
    fecha_publicacion: null,
    idEmpresa: {
      id: 0,
      denominacion: '',
      telefono: '',
      horario_de_atencion: '',
      quienes_somos: '',
      latitud: 0,
      longitud: 0,
      domicilio: '',
      email: '',
    }
  };

  constructor(private noticiaService: NoticiaService, private router: Router,
    private actRoute: ActivatedRoute, private empresaService: EmpresaService,
    private http: HttpClient, private storage: AngularFireStorage) {
    this.actRoute.params.subscribe((data) => {
      if (data['id'] !== 'nueva') {
        this.getOne(data['id']);
      }
    });
  }

  ngOnInit() {
    this.getAllEmpresas();
  }

  save() {
    this.actRoute.params.subscribe((data) => {
      if (data['id'] === 'nueva') {
        this.add();
      } else {
        this.update(data['id']);
      }
    });
  }

  add() {
    this.noticia.imagen_noticia = this.aux;
    this.noticiaService.post(this.noticia).subscribe(
      data => {
        alert('Noticia agregada correctamente');
        this.router.navigate(['tabla/noticia']);
      },
      err => {
        alert('Error al agregar noticia: ' + err);
      });
  }

  update(id: number) {
    this.noticia.imagen_noticia = this.aux;
    this.noticiaService.put(id, this.noticia).subscribe(
      res => {
        alert('La noticia fue actualizada con éxito');
        this.router.navigate(['tabla/noticia']);
      },
      err => {
        alert('Ocurrió un error al actualizar noticia. Verifique los campos.');
      }
    );
  }

  getOne(id: number) {
    this.noticiaService.getOne(id).subscribe((data) => {
      this.noticia = data;
    }, err => {
      alert('Error al traer los datos de noticia: getOne');
    });
  }

  getAllEmpresas() {
    this.empresaService.getAll().subscribe(res => {
      this.empresas = res;
    },
      err => {
        alert('Error al traer todas las empresas para vincular la noticia: ' + err);
      });
  }

  public aux: string = '';
  public flag: boolean = false;

  onUpload(e) {
    this.noticiaService.getMaxID().subscribe(res => {
      const idImagenNoticia = +res + 1;
      const file = e.target.files[0];
      const filePath = `${idImagenNoticia}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe(data => {
              this.urlImage = data;
              console.log('url image', data);
              this.aux = data;
              this.flag = true;
            });
          })
        ).subscribe();
    },
      err => {
        alert('Error al obtener el maximo id de la tabla noticias: ' + err);
      });
  }

}
