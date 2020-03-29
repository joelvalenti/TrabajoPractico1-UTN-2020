import { EmpresaService } from './../../services/empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../model/noticia';
import { NoticiaService } from '../../services/noticia.service';
import { Empresa } from 'src/app/model/empresa';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public noticia: Noticia = {
    id: 0,
    titulo_de_la_noticia: '',
    resumen_de_la_noticia: '',
    imagen_noticia: '',
    contenido_html: '',
    publicada: '',
    fecha_publicacion: null,
    idEmpresa : { 
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

  constructor(
    private route: Router,
    private actRoute: ActivatedRoute,
    private noticiaServicio: NoticiaService,
    private empresaServicio: EmpresaService) {
      this.actRoute.params.subscribe((data) => {
        if (data['id']) {
          this.getOne(data['id']);
        }
      });
  }

  ngOnInit(): void {
  }

  getOne(idEmpresa: any) {
    this.noticiaServicio.getOne(idEmpresa).subscribe((data) => {
      this.noticia = data;
      this.empresaServicio.getOne(this.noticia.idEmpresa.id).subscribe((dato) => {
        this.empresa = dato;
      },
      err => {
        alert('Ocurrió un error al cargar la Empresa: ' + err);
      });
    },
    err => {
      alert('Ocurrió un error al cargar la Noticia: ' + err);
    });
  }
  goNoticia(id: number) {
    this.route.navigate(['/detalle/' + id]);
  }
  getNoticias() {
    this.noticiaServicio.getAll().subscribe((dato) => {
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
