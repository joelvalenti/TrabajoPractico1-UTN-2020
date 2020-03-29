import { Noticia } from 'src/app/model/noticia';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root'
})

export class NoticiaService extends CommonService<Noticia> {

  protected miUrl = 'http://localhost:9000/api/v1/noticia/';
  protected urlmaxid = 'http://localhost:9000/api/v1/noticia/maxid';


  getMaxID(): Observable<number>{
    return this.http.get<number>(this.urlmaxid);
  }

}