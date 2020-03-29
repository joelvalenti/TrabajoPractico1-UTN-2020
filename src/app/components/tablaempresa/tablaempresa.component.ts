import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from './../../model/empresa';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tablaempresa',
  templateUrl: './tablaempresa.component.html',
  styleUrls: ['./tablaempresa.component.css']
})

export class TablaempresaComponent implements OnInit {

  pageActual: number = 1;
  public empresas: Empresa[];
  indice: number;

  public empresaSeleccionada: Empresa = {
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

  constructor(private empresaService: EmpresaService) { }

  ngOnInit() {
    this.getAllEmpresas();
  }

  getAllEmpresas() {
    this.empresaService.getAll().subscribe(res => {
      this.empresas = res;
    },
      err => {
        alert('Error al traer todas las empresas: ' + err);
      });
  }

  delete(empresa: Empresa) {
    const opcion = confirm('¿Desea eliminar este registro?');
    if (opcion === true) {
      this.empresaService.delete(empresa.id).subscribe(
        res => {
          alert('El registro fue eliminado con éxito');
          const indexEmpresa = this.empresas.indexOf(empresa);
          this.empresas.splice(indexEmpresa, 1);
        },
        err => {
          alert('Error al eliminar el registro seleccionado: ' + err);
        });
    }
  }

  onPreUpdate(empresa: Empresa) {
    this.empresaSeleccionada = empresa;
    this.indice = this.empresas.indexOf(empresa);
  }

  resetear(){
    this.empresaSeleccionada = null;
  }

}

