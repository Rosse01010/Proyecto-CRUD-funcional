import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransitLine } from '../core/models/transit-line.model';
import { VoyagePass } from '../core/models/voyage-pass.model';
import { TransitLineService } from '../core/services/transit-line.service';
import { VoyagePassService } from '../core/services/voyage-pass.service';

@Component({
  selector: 'app-agent',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agent.component.html'
})
export class AgentComponent implements OnInit {
  routes: TransitLine[] = [];
  voyagePasses: VoyagePass[] = [];
  voyagePassForm: FormGroup;

  saving = false;
  errorMsg = '';

  readonly today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private routeService: TransitLineService,
    private voyagePassService: VoyagePassService,
    private router: Router
  ) {
    this.voyagePassForm = this.fb.group({
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
    this.loadVoyagePasss();
  }

  loadVoyagePasss() {
    this.voyagePassService.getAll().subscribe({ next: t => this.voyagePasses = t });
  }

  get selectedRoute(): TransitLine | undefined {
    const rId = this.voyagePassForm.get('selectedRouteId')?.value;
    return this.routes.find(r => r.id === Number(rId));
  }

  register() {
    if (this.voyagePassForm.invalid) return;

    this.saving = true;
    this.errorMsg = '';

    const val = this.voyagePassForm.value;

    this.voyagePassService.create({
      transitLineId: Number(val.selectedRouteId),
      passengerName: val.passengerName,
      passengerDocument: val.passengerDocument,
      travelDate: val.travelDate
    }).subscribe({
      next: voyage-pass => {
        this.router.navigate(['/cajero/voyage-pass', voyage-pass.id]);
      },
      error: (err) => {
        this.errorMsg = err.message || 'Error al registrar el voyage-pass.';
        this.saving = false;
      }
    });
  }
}
