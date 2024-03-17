import { Component, Input } from '@angular/core';
import { Cert } from 'src/app/models/certificate.model';
import { DecoderService } from 'src/app/services/decoder.service';

@Component({
  selector: 'app-certificate-card',
  templateUrl: './certificate-card.component.html',
  styleUrls: ['./certificate-card.component.scss']
})
export class CertificateCardComponent {
  @Input() certificate: Cert | undefined | null;
  cardTitle: string = 'Перетягніть файл сертифікату сюди'
  btnTitile: string = 'Виберіть через стандартний діалог';
  decodedCertificate: Cert | undefined | null;

  constructor(private decoderService: DecoderService) { }

  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const certData = new Uint8Array(arrayBuffer);
        this.decodedCertificate = this.decoderService.decodeCertificate(certData);
      };
      reader.readAsArrayBuffer(file);
    }
  }

}
