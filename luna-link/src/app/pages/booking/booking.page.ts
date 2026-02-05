import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular'; 
import { ActivatedRoute, Router } from '@angular/router';
import { SpaceService } from 'src/app/services/space.service';
import { addIcons } from 'ionicons';
import { calendarOutline, checkmarkCircle, closeCircle } from 'ionicons/icons';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BookingPage implements OnInit {
  
  spaceId: number = 0;
  spaceName: string = '';
  
  selectedDate: string = ''; // Data ISO completa do componente
  formattedDate: string = ''; // Data YYYY-MM-DD para API

  statusDisponibilidade: 'aguardando' | 'disponivel' | 'ocupado' | 'erro' = 'aguardando';
  isLoading = false;

  // Bloqueia datas passadas
  minDate = new Date().toISOString();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spaceService: SpaceService,
    private toastController: ToastController
  ) {
    addIcons({ calendarOutline, checkmarkCircle, closeCircle });
  }

  ngOnInit() {
    // Pega o ID da rota (ex: /booking/1)
    const idParam = this.route.snapshot.paramMap.get('id');
    this.spaceId = idParam ? Number(idParam) : 0;

    // Pega o nome vindo da query params (opcional, só visual)
    this.route.queryParams.subscribe(params => {
      this.spaceName = params['nome'] || 'Espaço';
    });
  }

  // Acionado toda vez que o usuário troca a data no calendário
  onDateChange(event: any) {
    this.statusDisponibilidade = 'aguardando';
    const dataIso = event.detail.value;
    
    if (!dataIso) return;

    // Corta a string para pegar YYYY-MM-DD
    this.formattedDate = dataIso.split('T')[0];
    
    this.verificarDisponibilidade(this.formattedDate);
  }

  verificarDisponibilidade(date: string) {
    this.isLoading = true;

    this.spaceService.checkAvailability(date, this.spaceId).subscribe({
      next: (isAvailable) => {
        this.isLoading = false;
        if (isAvailable) {
          this.statusDisponibilidade = 'disponivel';
        } else {
          this.statusDisponibilidade = 'ocupado';
          this.exibirToast('Data indisponível! Já existe reserva neste dia.', 'danger');
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.statusDisponibilidade = 'erro';
        console.error(err);
        this.exibirToast('Erro ao verificar disponibilidade.', 'warning');
      }
    });
  }

  confirmarReserva() {
    // Aqui você implementaria o POST para salvar efetivamente
    console.log(`Criando reserva: Space ${this.spaceId}, Data ${this.formattedDate}`);
    
    // Exemplo simulado
    this.exibirToast('Reserva solicitada com sucesso!', 'success');
    this.router.navigate(['/home']);
  }

  async exibirToast(msg: string, cor: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: cor,
      position: 'bottom'
    });
    toast.present();
  }
}