import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { wineOutline, flameOutline, peopleOutline, chevronForwardOutline } from 'ionicons/icons';
import { 
  IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonIcon, IonRippleEffect // 
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.page.html',
  styleUrls: ['./spaces.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SpacesPage {

  constructor(private router: Router) { 
    addIcons({ wineOutline, flameOutline });
  }

  irParaCalendario(id: number, nome: string) {
    console.log('Navegando para:', id, nome); // Log para debug
    this.router.navigate(['/booking', id], { queryParams: { nome: nome } });
  }
}