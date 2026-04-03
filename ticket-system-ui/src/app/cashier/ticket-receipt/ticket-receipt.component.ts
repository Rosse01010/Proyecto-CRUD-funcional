import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { Ticket } from '../../core/models/ticket.model';
import { TicketService } from '../../core/services/ticket.service';

@Component({
  selector: 'app-ticket-receipt',
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './ticket-receipt.component.html'
})
export class TicketReceiptComponent implements OnInit {
  ticket: Ticket | null = null;
  loading = true;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.getById(id).subscribe({
      next: t => {
        this.ticket = t;
        this.loading = false;
        setTimeout(() => window.print(), 400);
      },
      error: () => {
        this.errorMsg = 'No se pudo cargar el ticket.';
        this.loading = false;
      }
    });
  }

  print() { window.print(); }

  back() { this.router.navigate(['/cajero']); }
}
