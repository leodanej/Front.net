import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../components/inicio/login/login.component';
import { usuario } from '../models/usuario';
import { ResponseI} from '../models/response';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlApi  = "https://localhost:5001/api/";
  private urlServer = "";

  constructor(private http:HttpClient,private router:Router) { }
  //Hacemos conexión al backend
  login(form: usuario ):Observable<ResponseI> {
    let url = this.urlApi + "Login";
    return this.http.post<ResponseI>(url,form)
    }

    logout(){
      localStorage.removeItem("auth_token")
      this.router.navigateByUrl('/inicio')
    }
    
}

  
