import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: false,
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent   implements ControlValueAccessor {
  @Input() label: string = "";
  @Input() placeholder: string = "";

  constructor(){

  }



  value: any = ''; // Valor interno do componente
  onChange: any = () => {};
  onTouch: any = () => {};

  // Métodos da interface ControlValueAccessor
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

}
