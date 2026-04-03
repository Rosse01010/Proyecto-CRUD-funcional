import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VoyagePass } from '../../core/models/voyage-pass.model';
import { VoyagePassService } from '../../core/services/voyage-pass.service';

@Component({
  selector: 'app-voyagePasses',
  imports: [CommonModule, FormsModule],
  templateUrl: './voyagePasses.component.html'
})
export class VoyagePasssComponent implements OnInit {
  voyagePasses: VoyagePass[] = [];
  filtered: VoyagePass[] = [];
  searchCode = '';

  constructor(private voyagePassService: VoyagePassService) { }

  ngOnInit() { this.load(); }

  load() {
    this.voyagePassService.getAll().subscribe({
      next: t => { this.voyagePasses = t; this.filtered = t; this.searchCode = ''; }
    });
  }

  search() {
    const code = this.searchCode.trim().toLowerCase();
    this.filtered = code
      ? this.voyagePasses.filter(t => t.validationCode.toLowerCase().includes(code))
      : this.voyagePasses;
  }

  clearSearch() {
    this.searchCode = '';
    this.filtered = this.voyagePasses;
  }

  validate(id: number) {
    this.voyagePassService.updateStatus(id, 'Used').subscribe({
      next: updated => {
        const idx = this.voyagePasses.findIndex(t => t.id === id);
        if (idx !== -1) this.voyagePasses[idx] = updated;
        this.search();
      }
    });
  }

  delete(id: number) {
    if (!confirm('¿Eliminar este voyage-pass?')) return;
    this.voyagePassService.delete(id).subscribe({ next: () => this.load() });
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
