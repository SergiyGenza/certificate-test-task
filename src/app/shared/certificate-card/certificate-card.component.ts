import { Component, Input } from '@angular/core';
import { Certificate } from 'src/app/models/certificate.model';

@Component({
  selector: 'app-certificate-card',
  templateUrl: './certificate-card.component.html',
  styleUrls: ['./certificate-card.component.scss']
})
export class CertificateCardComponent {
  @Input() certificate: Certificate | undefined;
  cardTitle: string = 'Перетягніть файл сертифікату сюди'
  btnTitile: string = 'Виберіть через стандартний діалог';

}
