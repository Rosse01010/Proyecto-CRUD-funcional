import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransitLine } from '../../core/models/transit-line.model';
import { TransitLineService } from '../../core/services/transit-line.service';

@Component({
  selector: 'app-transit-lines',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transit-lines.component.html'
})
export class TransitLinesComponent implements OnInit {
  routes: TransitLine[] = [];
  showForm = false;
  editingId: number | null = null;
  saving = false;
  errorMsg = '';

  routeForm: FormGroup;

  constructor(private fb: FormBuilder, private routeService: TransitLineService) {
    this.routeForm = this.fb.group({
      name: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      isActive: [true]
    });
  }

  ngOnInit() { this.load(); }

  load() {
    this.routeService.getAll().subscribe({ next: r => this.routes = r });
  }

  openCreate() {
    this.editingId = null;
    this.routeForm.reset({ price: 0, isActive: true });
    this.showForm = true;
    this.errorMsg = '';
  }

  openEdit(r: TransitLine) {
    this.editingId = r.id;
    this.routeForm.patchValue({
      name: r.name,
      origin: r.origin,
      destination: r.destination,
      price: r.price,
      isActive: r.isActive
    });
    this.showForm = true;
    this.errorMsg = '';
  }

  save() {
    if (this.routeForm.invalid) return;

    this.saving = true;
    const val = this.routeForm.value;

    const obs = this.editingId
      ? this.routeService.update(this.editingId, val)
      : this.routeService.create(val);

    obs.subscribe({
      next: () => { this.load(); this.showForm = false; this.saving = false; },
      error: (err) => { this.errorMsg = err.message || 'Error al guardar.'; this.saving = false; }
    });
  }

  delete(id: number) {
    if (!confirm('¿Eliminar esta ruta?')) return;
    this.routeService.delete(id).subscribe({ next: () => this.load() });
  }

  cancel() { this.showForm = false; }
}
