import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-control-errors',
  templateUrl: './form-control-errors.component.html',
  styleUrls: ['./form-control-errors.component.scss'],
})
export class FormControlErrorsComponent implements OnInit {
  @Input('control') formControl!: AbstractControl;
  constructor() {}

  ngOnInit(): void {}
  notNull(obj: any) {
    if (obj !== null && obj !== undefined) {
      //console.log('is notnull', obj);
      return true;
    }
    // console.log('is null');
    return false;
  }
}
