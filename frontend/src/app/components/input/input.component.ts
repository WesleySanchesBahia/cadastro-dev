import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor{

  constructor(){

  }

  @Input() label: string = "Nome Input";
  @Input() id: string = "input";
  @Input() type: any;
  @Input() readOnly: boolean = false;
  @Input() style = {};
  @Input() width: string = "";
  @Output() valueInput:EventEmitter<string> = new EventEmitter<string>();

  value: any = '';
  onChange: any = () => {
    this.valueInput.emit(this.value);
  };

  onTouch: any = () => { };

  ngAfterViewInit(): void {
    this.configurarStyle();
  }
  // Escreve um novo valor para o elemento.
  writeValue(value: any): void {
    this.value = value;
    // Remova as chamadas para onChange e onTouch daqui
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implemente se necessário
  }
  configurarStyle() {
    if (this.width) {
      this.style = "width:"+this.width+";"
    }
  }

}
