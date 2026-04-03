import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusRoute } from '../core/models/bus-route.model';
import { Ticket } from '../core/models/ticket.model';
import { BusRouteService } from '../core/services/bus-route.service';
import { TicketService } from '../core/services/ticket.service';

@Component({
  selector: 'app-cashier',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cashier.component.html'
})
export class CashierComponent implements OnInit {
  routes: BusRoute[] = [];
  tickets: Ticket[] = [];
  ticketForm: FormGroup;

  saving = false;
  errorMsg = '';

  readonly today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private routeService: BusRouteService,
    private ticketService: TicketService,
    private router: Router
  ) {
    this.ticketForm = this.fb.group({
      selectedRouteId: [null, Validators.required],
      travelDate: ['', Validators.required],
      passengerName: ['', [Validators.required, Validators.minLength(3)]],
      passengerDocument: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
    this.routeService.getAll().subscribe({
      next: r => this.routes = r.filter(x => x.isActive)
    });
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getAll().subscribe({ next: t => this.tickets = t });
  }

  get selectedRoute(): BusRoute | undefined {
    const rId = this.ticketForm.get('selectedRouteId')?.value;
    return this.routes.find(r => r.id === Number(rId));
  }

  register() {
    if (this.ticketForm.invalid) return;

    this.saving = true;
    this.errorMsg = '';

    const val = this.ticketForm.value;

    this.ticketService.create({
      busRouteId: Number(val.selectedRouteId),
      passengerName: val.passengerName,
      passengerDocument: val.passengerDocument,
      travelDate: val.travelDate
    }).subscribe({
      next: ticket => {
        this.router.navigate(['/cajero/ticket', ticket.id]);
      },
      error: (err) => {
        this.errorMsg = err.message || 'Error al registrar el ticket.';
        this.saving = false;
      }
    });
  }
}
