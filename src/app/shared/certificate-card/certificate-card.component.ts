import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cert } from 'src/app/models/certificate.model';
import { DecoderService } from 'src/app/services/decoder.service';

@Component({
  selector: 'app-certificate-card',
  templateUrl: './certificate-card.component.html',
  styleUrls: ['./certificate-card.component.scss']
})
export class CertificateCardComponent {
  @Input() certificate: Cert | undefined | null;
  @Output() drop = new EventEmitter<DragEvent>();
  @Output() filesDropped = new EventEmitter<DragEvent>();
  @Output() openCert = new EventEmitter<Cert | undefined | null>

  cardTitle: string = 'Перетягніть файл сертифікату сюди'
  btnTitile: string = 'Виберіть через стандартний діалог';
  decodedCertificate: Cert | undefined | null;

  constructor(private decoderService: DecoderService) { }

  public onFileSelected(event: any): void {
    const file = event.target!.files[0];
    this.parseFile(file);
  }

  public onDrop(event: DragEvent) {
    event.preventDefault();
    this.drop.emit(event);
    const file = event.dataTransfer?.files[0];
    this.parseFile(file);
  }

  public onDragover(event: DragEvent) {
    event.preventDefault();
  }

  private parseFile(file: File | undefined): void {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const certData = new Uint8Array(arrayBuffer);
        this.decodedCertificate = this.decoderService.decodeCertificate(certData);
        this.openCertificate(this.decodedCertificate);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  private openCertificate(cert: Cert | undefined | null): void {
    if (cert) {
      this.openCert.emit(cert);
    }
  }
}
