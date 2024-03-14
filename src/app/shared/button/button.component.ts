import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Certificate } from 'src/app/models/certificate.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() btnTitile: string | undefined;
  @Input() type: string | undefined;
  @Input() width: string | undefined;
  @Input() height: string | undefined;
  @Output() addNewSertificate = new EventEmitter<boolean>;
  @Output() openCard = new EventEmitter<string>

  ngOnInit(): void {
  }

  onBtnClick() {
    switch (this.type) {
      case 'addNewSertificate':
        this.addNewSertificate.emit(true);
        this.btnTitile = 'Назад';
        this.type = 'back';
        break;
      case 'back':
        this.addNewSertificate.emit(false);
        this.btnTitile = 'Додати';
        this.type = "addNewSertificate"
        break
      case 'showInfo':
        this.openCard.emit(this.btnTitile);
        break;
      default:
        break;
    }
  }
}
