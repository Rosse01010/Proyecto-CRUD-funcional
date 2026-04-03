import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { VoyagePass } from '../../core/models/voyage-pass.model';
import { VoyagePassService } from '../../core/services/voyage-pass.service';

@Component({
  selector: 'app-voyage-pass-receipt',
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './voyage-pass-receipt.component.html'
})
export class VoyagePassReceiptComponent implements OnInit {
  voyage-pass: VoyagePass | null = null;
  loading = true;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voyagePassService: VoyagePassService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.voyagePassService.getById(id).subscribe({
      next: t => {
        this.voyagePass = t;
        this.loading = false;
        setTimeout(() => window.print(), 400);
      },
      error: () => {
        this.errorMsg = 'No se pudo cargar el voyage-pass.';
        this.loading = false;
      }
    });
  }

  print() { window.print(); }

  back() { this.router.navigate(['/cajero']); }
}
