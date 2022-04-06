import { Component, OnInit} from '@angular/core';
import {} from 'google.maps';
import jwtDecode from 'jwt-decode';
import { RecursosI } from 'src/app/models/recursos.interface';
import { TareaPendiente } from 'src/app/models/tarea-pendiente';
import { TareasAsignadas } from 'src/app/models/tareasAsignadas';
import { RecursoService } from 'src/app/services/recursos.service';
import {user} from "../../../models/mapa.interfaces"



@Component({selector: 'app-mapa', templateUrl: './mapa.component.html', styleUrls: ['./mapa.component.css']})


// --- Inicializacion despues de que se inicia la vista --- //
export class MapaComponent implements OnInit {
    recursos:Array<RecursosI>
    tareasAsignadas:Array<TareasAsignadas>

    constructor(public recursoservice:RecursoService) {
        this.recursos = [];
        this.tareasAsignadas=[];
    }
    nombreTarea = ""
  public tareas: TareaPendiente[] = []
  guardarTarea() {
    const nuevaTarea = new TareaPendiente(this.nombreTarea);
    this.tareas.push(nuevaTarea);
    this.recursoservice.guardarTareas(this.tareas);
    this.obtenerTareas();
    // Y limpiamos el input
    this.nombreTarea = "";
  }
  
  eliminarTarea(indice: number) {
    // Primero le preguntamos al usuario
    const confirma = confirm("¿Realmente quiere eliminar la tarea?");
    if (!confirma) {
      return;
    }
    // Eliminamos del arreglo y guardamos
    this.tareas.splice(indice, 1);
    this.recursoservice.guardarTareas(this.tareas);
  }
  cambiarEstadoDeTarea() {
    this.recursoservice.guardarTareas(this.tareas);
  }
  obtenerTareas() {
    this.tareas = this.recursoservice.obtenerTareas();
    this.recursoservice.get_recursos();
  }
  

    ngOnInit(): void {
        this.recursoservice.get_recursos().subscribe(data => {
            this.recursos = data;
            console.log(data);
          })
          this.obtenerTareas();
 }
     IsAdmin() {
    let usuario: user;

    var token = localStorage.getItem('auth_token');
    var decode = jwtDecode(token !);
    var decode2 = JSON.stringify(decode);
    usuario = JSON.parse(decode2);
    if (usuario.role == "admin") {
        return true;
    } else {
        return false;
    }

}
  
      asignarTarea(id: number){
          this.recursoservice.get_recurso(id).subscribe(data =>{
              console.log(data)
          });
      }
}
