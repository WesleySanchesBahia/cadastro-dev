import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) {
    toastr.toastrConfig.positionClass = "toast-bottom-right";
    toastr.toastrConfig.closeButton = true;
    toastr.toastrConfig.timeOut = 5000;
    toastr.toastrConfig.progressBar = true;
  }

  showInfo(message: string, title: string = 'Info') {
    this.toastr.info(message, title);
  }
  showError(message: string, title: string = 'Erro') {
    this.toastr.error(message, title);
  }

  showSuccess(message: string, title: string = 'Sucesso') {
    this.toastr.success(message, title);
  }

  showWarning(message: string, title: string = 'Atenção') {
    this.toastr.warning(message, title);
  }
}
