import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, catchError, EMPTY } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
   private firebaseAuth: AngularFireAuth,
   private toastr: ToastrService
  ) { }

  public authenticateByGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider()
    const promise = this.firebaseAuth.signInWithPopup(provider)
    return from (promise)
  }

  public authenticateByEmailAndPassword(user: User): Observable<any>{
    const email = user.email
    const password = user.password
    console.log(email, password)
    const promise = this.firebaseAuth.signInWithEmailAndPassword(email, password)
    return from(promise).pipe(
        catchError( error => {
          if(error.code == 'auth/user-not-found'){
            this.toastr.error("Usuário não encontrado")
          }
          else if(error.code == 'auth/wrong-password'){
            this.toastr.error("Senha incorreta")
          }
          else{
            this.toastr.error("Erro ao autenticar")
          }
          return EMPTY
        })
      )
  }

  async createUserEmailAndPassword(user: User){
    const email = user.email
    const password = user.password
    const name = user.name
    const promise = await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    console.log(promise)
  }
}
