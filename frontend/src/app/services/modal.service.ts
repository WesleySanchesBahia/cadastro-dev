import { Injectable } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalTemplate!: ModalComponent;
  constructor() { }

  public setModal(modal:ModalComponent){
    this.modalTemplate = modal;
  }

  open(){
    this.modalTemplate.openModal();
  }
  close(){
    this.modalTemplate.closeModal();
  }
}
