import { Generico } from './generico';
import { Empresa } from './empresa';
export class Noticia extends Generico{
    titulo_de_la_noticia: string;
    resumen_de_la_noticia: string;
    imagen_noticia: string;
    contenido_html: string;
    publicada: string;
    fecha_publicacion: Date;
    idEmpresa : Empresa = {
        id: 0,
        denominacion: '',
        telefono: '',
        horario_de_atencion: '',
        quienes_somos: '',
        latitud: 0,
        longitud: 0,
        domicilio: '',
        email: ''
    }
}
