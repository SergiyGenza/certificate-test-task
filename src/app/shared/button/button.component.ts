import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() btnTitile: string | undefined;
  @Input() type: string | undefined;
  @Input() addNew: boolean | undefined;
  @Input() width: string | undefined;
  @Input() height: string | undefined;
  @Output() addNewSertificateEmitter = new EventEmitter<boolean>;
  @Output() openCard = new EventEmitter<string>

  public onBtnClick(): void {
    switch (this.type) {
      case 'addNewSertificate':
        this.addNew = !this.addNew;
        this.addNewSertificateEmitter.emit(this.addNew);
        break
      case 'showInfo':
        this.addNewSertificateEmitter.emit(false);
        this.openCard.emit(this.btnTitile);
        break;
      default:
        break;
    }
  }
}
