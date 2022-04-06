import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecursoService } from 'src/app/services/recursos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-recurso',
  templateUrl: './crear-recurso.component.html',
  styleUrls: ['./crear-recurso.component.css']
})
export class CrearRecursoComponent implements OnInit {

 
  newRecurso:FormGroup;
  
 
  constructor(private fb:FormBuilder,private recursoservice:RecursoService,
    private router:Router,
    private toastr:ToastrService) { 
    this.newRecurso = this.fb.group({
      nombre:['',[Validators.required,Validators.maxLength(30)]],
      tipo:['',[Validators.required, Validators.maxLength(30)]],
    })
  }

  ngOnInit(): void {
  }

  enviar(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Tarea guardada con éxito',
      showConfirmButton: false,
      timer: 3000
    })
    const recurso= this.newRecurso.value;
    console.log(recurso);

    this.recursoservice.crear_recurso(recurso).subscribe(data => console.log(data),err =>{
      this.toastr.error(err)
      console.log(err)
      this.newRecurso.reset()  })

}
closeform(){
  this.router.navigate(['dashboard/recurso'])
}

}
