import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private authService: AuthServiceService,
    private toastr: ToastrService
  ) {
    this.registerForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
  }

  public createUserWithEmailAndPassword(): void {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      this.authService.createUserEmailAndPassword(user)
    } else {
      this.toastr.error("Dados Inválidos")
    }
  }

  public showPassword() {
    let password = document.querySelector('.password')
    if (password?.getAttribute('type') == 'password') {
      password.setAttribute('type', 'text')
    } else {
      password?.setAttribute('type', 'password')
    }
  }
}