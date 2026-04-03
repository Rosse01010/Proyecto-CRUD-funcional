import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../../core/models/ticket.model';
import { TicketService } from '../../core/services/ticket.service';

@Component({
  selector: 'app-tickets',
  imports: [CommonModule, FormsModule],
  templateUrl: './tickets.component.html'
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  filtered: Ticket[] = [];
  searchCode = '';

  constructor(private ticketService: TicketService) { }

  ngOnInit() { this.load(); }

  load() {
    this.ticketService.getAll().subscribe({
      next: t => { this.tickets = t; this.filtered = t; this.searchCode = ''; }
    });
  }

  search() {
    const code = this.searchCode.trim().toLowerCase();
    this.filtered = code
      ? this.tickets.filter(t => t.validationCode.toLowerCase().includes(code))
      : this.tickets;
  }

  clearSearch() {
    this.searchCode = '';
    this.filtered = this.tickets;
  }

  validate(id: number) {
    this.ticketService.updateStatus(id, 'Used').subscribe({
      next: updated => {
        const idx = this.tickets.findIndex(t => t.id === id);
        if (idx !== -1) this.tickets[idx] = updated;
        this.search();
      }
    });
  }

  delete(id: number) {
    if (!confirm('¿Eliminar este ticket?')) return;
    this.ticketService.delete(id).subscribe({ next: () => this.load() });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active': return 'bg-success';
      case 'Used': return 'bg-secondary';
      case 'Cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}
