import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { LoginRequest } from 'src/app/interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {

 
  loginData: LoginRequest = {
    login: '',
    password: ''
  };

  constructor(
    private authService: AuthService, 
    private router: Router           
  ) { }

  fazerLogin() {
    console.log('Tentando logar com:', this.loginData);

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Sucesso!', response);
        this.router.navigate(['/home']);
      },
      error: (erro) => {
        console.error('Erro ao logar', erro);
        alert('Login ou senha inválidos!');
      }
    });
  }
}