import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Empresa } from '../model/empresa';
@Injectable({
  providedIn: 'root'
})

export class EmpresaService extends CommonService<Empresa> {

  protected miUrl = 'http://localhost:9000/api/v1/empresa/';

}
