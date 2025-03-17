import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
interface config {
  width: 'max-content' | 'min-content' | 'fit-content' | 'auto' | string,
  maxWidth: "max-content" | "min-content" | "fit-content" | 'auto' | string,
  minWidth: "max-content" | "min-content" | "fit-content" | 'auto' | string,
  height: "max-content" | "min-content" | "fit-content" | 'auto' | string,
  maxHeight: "max-content" | "min-content" | "fit-content" | 'auto' | string,
  minHeight: "max-content" | "min-content" | "fit-content" | 'auto' | string,
}

@Component({
  selector: 'app-modal',
  standalone: false,
  template: `
    <div [style.display]="!isOpen() ? 'none':''" class="container-modal">
      <div id="modal">
        <div class="header-modal">
          <div class="title">
            <p>{{ title }}</p>
          </div>
        </div>
        <div class="content-modal">
          <ng-container *ngTemplateOutlet="content"></ng-container>
        </div>
        <div class="container-buttons">
        <button>Fechar</button>
        <button>Salvar</button>
        </div>
      </div>
    </div>
  `,
  styles: `

.container-modal {
  display: flex;
  position: fixed;
  z-index: 5;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  margin: 0;
}

#modal {
  margin-top: 2rem;
  display: block;
  position: relative;
  width: max-content;
  min-width: 400px;
  height: max-content;
  min-height: 200px;
  background-color: #ffff;

  border-radius: 4px;
  margin-bottom: 2rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  .header-modal {
    margin: 0;
    border-radius: 8px 8px 0px 0px;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.151);
    background-color: #ffff;
    color:#000;
    p {
    font-size: 18px;
    font-weight: 700;
}
  }
}

.content-modal {
  min-height: 100px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-size: 18px;
  margin-bottom: 1rem;
}


.container-buttons {
  display: flex;
  flex-direction: row;
  width: 97%;
  margin: 0.5rem;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 4rem;
}

.title {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-left: 30px;
}
  `,
})
export class ModalComponent {

  @Input() content!: any;
  @Input() viewBtns = signal(false);
  @Input() title: string = "título modal";
  @Input() classPanel: string = "modal";
  @Input()  disabled:boolean = false;
  @Input()  releaseClose:boolean = true;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() EmitterClose: EventEmitter<any> = new EventEmitter();

  private modal!: HTMLElement;
  private isOpenModal =  signal(false);


  configModal: config = {
    width: "800px",
    maxWidth: "",
    minWidth: "300px",
    height: "",
    maxHeight: "",
    minHeight: "200px",
  }


  isOpen = ()=> this.isOpenModal();

  closeModal(): void {
    this.isOpenModal.set(false);
  }


  openModal(): void {
    this.modal = document.getElementById("modal") as HTMLElement;
    this.modal.style.width = this.configModal.width;
    this.isOpenModal.set(true);
  }


  clickSave(): void {
    this.save.emit();
  }

  clickClose(): void {
    this.EmitterClose.emit();
    if(this.releaseClose){
      this.isOpenModal.set(true);
    }

  }



}
