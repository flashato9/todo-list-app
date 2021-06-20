import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { BaseAuthenticationComponent, User } from '../../base-components/base-authentication/base-authentication.component';
import { VERIFICATION_CODE_REGEX } from '../../base-components/constants/form-constants';

@Component({
  selector: 'signup-confirmation-menu',
  templateUrl: './signup-confirmation.component.html',
  styleUrls: ['./signup-confirmation.component.scss'],
})
export class SignupConfirmationComponent extends BaseAuthenticationComponent implements OnInit {
  @Input() usernameForForm: string = '';

  constructor(public fb: FormBuilder) {
    super(
      fb.group({
        username: ['', Validators.required],
        confirmation_code: ['', [Validators.required, Validators.pattern(VERIFICATION_CODE_REGEX)]],
      })
    );
  }

  ngOnInit(): void {
    this.form.controls['username'].setValue(this.usernameForForm);
  }
  async confirmSignUp() {
    try {
      await Auth.confirmSignUp(this.form.controls['username'].value, this.form.controls['confirmation_code'].value.toString());
      const user:User = await Auth.currentUserPoolUser();
      this.onSuccessfulSubmit.emit(user);
      console.log('✔️ Successfully confirmed code');
    } catch (error) {
      console.log('❌ Error confirming code: \n', error);
    }
  }
  async resendCode() {
    try {
      await Auth.resendSignUp(this.form.controls['username'].value);
      console.log('✔️ Successfully re-sent code');
    } catch (error) {
      console.log('❌ Error re-sending code: \n', error);
    }
  }
}
