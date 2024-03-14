import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { CertificateCardComponent } from './certificate-card/certificate-card.component';



@NgModule({
  declarations: [
    ButtonComponent,
    CertificateCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    CertificateCardComponent
  ]
})
export class SharedModule { }
