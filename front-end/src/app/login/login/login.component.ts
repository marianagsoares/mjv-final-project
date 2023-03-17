import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
  }
  signInGoogle(){
    this.authService.authenticateByGoogle().subscribe(() => {
      this.router.navigate(["/home"])
    })
  }

  public signInEmailAndPassword(): void {
    const user: User = this.loginForm.value;
    this.authService.authenticateByEmailAndPassword(user).subscribe(() => {
      this.router.navigate(["/home"])
    })
  }

  public showPassword(){
    let password = document.querySelector('.password')
    if(password?.getAttribute('type') == 'password'){
      password.setAttribute('type', 'text')
    }else{
      password?.setAttribute('type', 'password')
    }
  }
}
