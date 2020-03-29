import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from './../../model/empresa';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public empresas: Empresa [];
  public empresa: Empresa;
  public id: number;
  public empresaSeleccionada: Empresa = {
      denominacion: '',
      telefono: '',
      horario_de_atencion: '',
      quienes_somos: '',
      latitud: null,
      longitud: null,
      domicilio: '',
      email: ''
  };

  constructor(private empresaService: EmpresaService) { }

  ngOnInit() {
    this.getAllEmpresas();
  }

  getAllEmpresas() {
    this.empresaService.getAll().subscribe( res => {
      this.empresas = res;
    },
    err => {
      alert('Ocurrió un error al cargar las Empresas: ' + err);
    });
  }
}
