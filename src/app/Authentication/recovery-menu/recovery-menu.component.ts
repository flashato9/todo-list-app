import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { BaseAuthenticationComponent } from '../base-components/base-authentication/base-authentication.component';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  STRONG_PASSWORD_REGEX,
  VERIFICATION_CODE_REGEX,
} from '../base-components/constants/form-constants';

@Component({
  selector: 'recovery-menu',
  templateUrl: './recovery-menu.component.html',
  styleUrls: ['./recovery-menu.component.scss'],
})
export class RecoveryMenuComponent extends BaseAuthenticationComponent implements OnInit {
  isCodeVerificationStage: boolean = false;
  previousStageForm: FormGroup | undefined;
  constructor(public fb: FormBuilder) {
    super(
      fb.group({
        username: ['', Validators.required],
      })
    );
  }

  ngOnInit(): void {}

  async sendCode() {
    try {
      const username = this.form.controls['username'].value;
      const result = await Auth.forgotPassword(username);
      console.log('Result after sending code:', result);

      this.setResetPasswordFormMode();
      console.log('✔️ Code send successful');
    } catch (error) {
      console.log('❌ Error sending code: \n', error);
    }
  }
  setResetPasswordFormMode() {
    this.isCodeVerificationStage = true;
    this.previousStageForm = this.form;
    this.form = this.fb.group({
      verification_code: ['', [Validators.required, Validators.pattern(VERIFICATION_CODE_REGEX)]],
      new_password: [
        '',
        [
          Validators.required,
          Validators.minLength(MIN_PASSWORD_LENGTH),
          Validators.maxLength(MAX_PASSWORD_LENGTH),
          Validators.pattern(STRONG_PASSWORD_REGEX),
        ],
      ],
    });
  }
  async createPassword() {
    try {
      const username = (<FormGroup>this.previousStageForm).controls['username'].value;
      const code = (<number>this.form.controls['verification_code'].value).toString();
      const password = this.form.controls['new_password'].value;

      await Auth.forgotPasswordSubmit(username, code, password);
      this.changeState(this.authState.Login);
      console.log('✔️ Password Changed successful');
    } catch (error) {
      console.log('❌ Error changing password: \n', error);
    }
  }
}
