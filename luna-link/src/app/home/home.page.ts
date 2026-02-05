import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { addIcons } from 'ionicons';
import { logOutOutline, calendarOutline, barbellOutline, peopleOutline, personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule], // IonicModule engloba grid, row, col, etc.
})
export class HomePage implements OnInit {

  username = 'Morador';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    addIcons({ logOutOutline, calendarOutline, barbellOutline, peopleOutline, personCircleOutline });
  }

  ngOnInit() {
    // Tenta pegar o nome do usuário salvo no login
    const userData = this.authService.getUser();
    if (userData && userData.user && userData.user.login) {
      this.username = userData.user.login;
    }
  }

  logout() {
    this.authService.logout();
  }

  navegar(rota: string) {
    this.router.navigate([rota]);
  }
}