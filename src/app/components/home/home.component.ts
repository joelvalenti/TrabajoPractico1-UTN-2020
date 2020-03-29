import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../model/empresa';
import { EmpresaService } from '../../services/empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../model/noticia';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private route: Router,
    private noticiaService: NoticiaService,
    private empresaService: EmpresaService,
    private actRoute: ActivatedRoute
  ) {
    this.actRoute.params.subscribe(data => {
      if (data['id']) {
        this.getOne(data['id']);
        this.getFive(data['id']);
      }
    });
  }

  _urlRecoverImage = 'http://localhost:9000/api/v1/noticia/recoverUpload';
  public noticias1: Noticia = {
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
  public noticias: Noticia[];
  public empresa: Empresa = {
    id: 0,
    denominacion: '',
    telefono: '',
    horario_de_atencion: '',
    quienes_somos: '',
    latitud: null,
    longitud: null,
    domicilio: '',
    email: ''
  };
  public keyword = '';
  public data: Noticia[];

  ngOnInit(): void {
    this.getNoticias();
  }

  getOne(id: number) {
    this.empresaService.getOne(id).subscribe(
      data => {
        this.empresa = data;
      },
      err => {
        alert('Error al traer los datos de empresa: getOne');
      }
    );
  }
  getFive(id: number) {
    this.noticiaService.getLast(id).subscribe((data) => {
      this.noticias1 = data.shift();
      this.noticias = data;
    },
      err => {
        alert('Ocurrió un error al cargar las ultimas 5 Noticias: ' + err);
      });
  }
  goNoticia(id: number) {
    this.route.navigate(['/detalle/' + id]);
  }
  getNoticias() {
    this.noticiaService.getAll().subscribe((dato) => {
      dato.sort((a, b) => {
        if (a.fecha_publicacion < b.fecha_publicacion) {
          return 1;
        }
        if (a.fecha_publicacion > b.fecha_publicacion) {
          return -1;
        }
        return 0;
      });
      this.data = dato;
    },
      err => {
        alert('Ocurrió un error al cargar las Noticias: ' + err);
      });
  }
  selectEvent(item) {
    this.goNoticia(item.id);
  }
}
