import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output() sendSearch = new EventEmitter<any>();

  form!:FormGroup;

  constructor(private fotmBuilder: FormBuilder){
    this.form = this.fotmBuilder.group({
      search: [""],
    })
  }


  ngOnInit(): void {
  }



  getUser(): void{
    this.sendSearch.emit(this.form.get("search")?.value);
  }
}
