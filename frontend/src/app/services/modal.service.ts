import { Injectable } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { config } from '../types/types-modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalTemplate!: ModalComponent;
  constructor() { }

  public setModal(modal:ModalComponent){
    this.modalTemplate = modal;
  }


  open(modalConfig:config){
    this.modalTemplate.setConfigModal(modalConfig);
    this.modalTemplate.openModal();
  }

  close(){
    this.modalTemplate.closeModal();
  }
}
