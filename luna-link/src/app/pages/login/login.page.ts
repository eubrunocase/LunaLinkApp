import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// IMPORTANTE: Importar cada componente individualmente
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonIcon,
  IonLabel,
  ToastController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { LoginRequest } from 'src/app/interfaces/auth.interface';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, business } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  // Adicionamos todos os componentes aqui na lista de imports
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonIcon,
    IonLabel
  ]
})
export class LoginPage {

  loginData: LoginRequest = {
    login: '',
    password: ''
  };

  isLoading = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastController: ToastController
  ) { 
    addIcons({ personOutline, lockClosedOutline, business });
  }

  async exibirMensagem(texto: string, cor: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000, 
      color: cor,
      position: 'bottom' 
    });
    await toast.present();
  }

  fazerLogin() {
    if (!this.loginData.login || !this.loginData.password) {
      this.exibirMensagem('Preencha todos os campos!', 'warning');
      return;
    }

    this.isLoading = true; 
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login realizado:', response);
        this.isLoading = false;
        
        this.exibirMensagem('Login realizado com sucesso!', 'success');
        
        this.router.navigate(['/home']);
      },
      error: (erro) => {
        console.error('Erro no login:', erro);
        this.isLoading = false;

        let mensagemErro = 'Falha ao conectar ao servidor.';
        
        if (erro.status === 401 || erro.status === 403) {
          mensagemErro = 'Usuário ou senha inválidos.';
        }

        this.exibirMensagem(mensagemErro, 'danger');
      }
    });
  }
}