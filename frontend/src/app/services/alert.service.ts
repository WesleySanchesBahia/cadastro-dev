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

  showInfo(message: string, ) {
    this.toastr.info(message);
  }
  showError(message: string, ) {
    this.toastr.error(message);
  }

  showSuccess(message: string, ) {
    this.toastr.success(message);
  }

  showWarning(message: string,) {
    this.toastr.warning(message);
  }
}
