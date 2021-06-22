import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { BaseAuthenticationComponent, User } from '../../base-components/base-authentication/base-authentication.component';
import { VERIFICATION_CODE_REGEX } from '../../base-components/constants/form-constants';

@Component({
  selector: 'signup-confirmation-menu',
  templateUrl: './signup-confirmation.component.html',
  styleUrls: ['./signup-confirmation.component.scss'],
})
export class SignupConfirmationComponent extends BaseAuthenticationComponent implements OnInit {
  @Input() usernameForForm: string = '';

  constructor(public fb: FormBuilder, public uI: UserInterfaceService) {
    super(
      fb.group({
        username: ['', Validators.required],
        confirmation_code: ['', [Validators.required, Validators.pattern(VERIFICATION_CODE_REGEX)]],
      })
    );
  }

  ngOnInit(): void {
    this.form.controls['username'].setValue(this.usernameForForm);
    this.form.controls['username'].disable();
  }
  async confirmSignUp() {
    try {
      this.uI.letItBeKnownUiIsLoading();
      console.log(this.form.controls['username'].value, this.form.controls['confirmation_code'].value.toString());
      await Auth.confirmSignUp(this.form.controls['username'].value, this.form.controls['confirmation_code'].value.toString());
      const user: User = await Auth.currentUserPoolUser();
      this.uI.letItBeKnownUiIsNotLoading();
      this.onSuccessfulSubmit.emit(user);
      console.log('✔️ Successfully confirmed code');
    } catch (error) {
      this.uI.letItBeKnownUiIsNotLoading();
      console.log('❌ Error confirming code: \n', error);
      this.erorMessage = (<any>error).message + '.';
    }
  }
  async resendCode() {
    try {
      this.uI.letItBeKnownUiIsLoading();
      await Auth.resendSignUp(this.form.controls['username'].value);
      this.uI.letItBeKnownUiIsNotLoading();
      console.log('✔️ Successfully re-sent code');
    } catch (error) {
      this.uI.letItBeKnownUiIsNotLoading();
      console.log('❌ Error re-sending code: \n', error);
      this.erorMessage = (<any>error).message + '.';
    }
  }
}
