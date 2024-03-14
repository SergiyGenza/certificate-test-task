import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'certificate-test-task';
  btnTitle = 'Додати';
  certificates = true;
  addNewSertificate: boolean = false;

  onNewSertificateAdd(e: boolean) {
    this.addNewSertificate = e;
  }

  onCardOpen(e: string) {
    if(e) {
      this.addNewSertificate = true;
    }
  }
}
