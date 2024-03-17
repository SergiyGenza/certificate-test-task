import { Component } from '@angular/core';
import { DecoderService } from './services/decoder.service';
import { Cert } from './models/certificate.model';

const btnTitilesArray = ['Додати', 'Назад']

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'certificate-test-task';
  btnTitle = btnTitilesArray[0];
  certArray: Cert[] | undefined | null;
  addNew: boolean = false
  openedCert: Cert | undefined | null;

  constructor(decodeService: DecoderService) {
    this.certArray = decodeService.certArray;
  }

  public onNewSertificateAdd(e: boolean) {
    this.addNew = e;
    this.addNew ? this.btnTitle = btnTitilesArray[1] : this.btnTitle = btnTitilesArray[0];
    this.openedCert = null;
  }

  public onCardOpen(e: string, cert: Cert) {
    this.addNew = false;
    this.openedCert = cert;
    this.btnTitle = btnTitilesArray[0];
  }
}
