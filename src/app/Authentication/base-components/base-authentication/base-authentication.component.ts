import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CognitoUser } from '@aws-amplify/auth';
import { AuthState } from '../../authentication/authentication.component';
@Component({
  selector: 'app-base-authentication',
  templateUrl: './base-authentication.component.html',
  styleUrls: ['./base-authentication.component.scss'],
})
export class BaseAuthenticationComponent {
  @Output() onRequestStateChange: EventEmitter<AuthState> = new EventEmitter();
  readonly authState = AuthState;

  form: FormGroup;

  erorMessage: string = '';
  constructor(private fG: FormGroup) {
    this.form = this.fG;
  }

  changeState(state: AuthState) {
    this.reset();
    this.onRequestStateChange.emit(state);
  }
  reset() {}

  formIsDirty(form: FormGroup) {
    return this.getControlsArray(form).every((control) => {
      return control.dirty;
    });
  }
  getControlsArray(form: FormGroup) {
    return Object.keys(form.controls).map((value) => {
      return form.controls[value];
    });
  }
}

export type User = CognitoUser;
