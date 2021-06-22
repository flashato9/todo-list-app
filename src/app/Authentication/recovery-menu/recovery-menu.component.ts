import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { CustomValidators } from '../authentication/base/validator-functions/custom-validators';
import { BaseAuthenticationComponent } from '../base-components/base-authentication/base-authentication.component';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../base-components/constants/form-constants';

@Component({
  selector: 'recovery-menu',
  templateUrl: './recovery-menu.component.html',
  styleUrls: ['./recovery-menu.component.scss'],
})
export class RecoveryMenuComponent extends BaseAuthenticationComponent implements OnInit {
  isCodeVerificationStage: boolean = false;
  previousStageForm: FormGroup | undefined;
  constructor(public fb: FormBuilder, public uI: UserInterfaceService) {
    super(
      fb.group({
        username: ['', Validators.required],
      })
    );
  }

  ngOnInit(): void {}

  async sendCode() {
    try {
      this.uI.letItBeKnownUiIsLoading();
      const username = this.form.controls['username'].value;
      const result = await Auth.forgotPassword(username);
      this.uI.letItBeKnownUiIsNotLoading();
      console.log('Result after sending code:', result);

      this.setResetPasswordFormMode();
      console.log('✔️ Code send successful');
    } catch (error) {
      this.uI.letItBeKnownUiIsNotLoading();
      console.log('❌ Error sending code: \n', error);
      this.erorMessage = (<any>error).message + '.';
    }
  }
  async resendCode() {
    try {
      this.uI.letItBeKnownUiIsLoading();
      const username = this.previousStageForm?.controls['username'].value;
      const result = await Auth.forgotPassword(username);
      this.uI.letItBeKnownUiIsNotLoading();
      console.log('Result after re-sending code:', result);

      console.log('✔️ Code re-send successful');
    } catch (error) {
      this.uI.letItBeKnownUiIsNotLoading();
      console.log('❌ Error re-sending code: \n', error);
      this.erorMessage = (<any>error).message + '.';
    }
  }

  setResetPasswordFormMode() {
    this.isCodeVerificationStage = true;
    this.previousStageForm = this.form;
    this.form = this.fb.group({
      verification_code: ['', [Validators.required, CustomValidators.numbersOnly]],
      new_password: [
        '',
        [
          Validators.required,
          Validators.minLength(MIN_PASSWORD_LENGTH),
          Validators.maxLength(MAX_PASSWORD_LENGTH),
          CustomValidators.strongPassword,
        ],
      ],
    });
    this.erorMessage = '';
  }
  async createPassword() {
    try {
      this.uI.letItBeKnownUiIsLoading();
      const username = (<FormGroup>this.previousStageForm).controls['username'].value;
      const code = (<number>this.form.controls['verification_code'].value).toString();
      const password = this.form.controls['new_password'].value;

      await Auth.forgotPasswordSubmit(username, code, password);
      this.uI.letItBeKnownUiIsNotLoading();
      this.changeState(this.authState.Login);
      console.log('✔️ Password Changed successful');
    } catch (error) {
      this.uI.letItBeKnownUiIsNotLoading();
      console.log('❌ Error changing password: \n', error);
      this.erorMessage = (<any>error).message + '.';
    }
  }
}
