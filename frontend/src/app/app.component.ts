import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent  implements AfterViewInit{
  @ViewChild(ModalComponent) modalComponent!:ModalComponent;
  title = 'frontend';

  constructor(private modal: ModalService){}
ngAfterViewInit(): void {
  this.modal.setModal(this.modalComponent);
}
}
