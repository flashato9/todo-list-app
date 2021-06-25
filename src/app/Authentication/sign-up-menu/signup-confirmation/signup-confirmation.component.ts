import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAuthInterfaceService } from 'src/app/services/user-authentication/user-auth-interface.service';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { BaseAuthenticationComponent } from '../../base-components-and-functions/base-authentication/base-authentication.component';
import { VERIFICATION_CODE_REGEX } from '../../base-components-and-functions/form-constants/form-constants';

@Component({
  selector: 'signup-confirmation-menu',
  templateUrl: './signup-confirmation.component.html',
  styleUrls: ['./signup-confirmation.component.scss'],
})
export class SignupConfirmationComponent extends BaseAuthenticationComponent implements OnInit {
  @Input() usernameForForm: string = '';

  constructor(public fb: FormBuilder, public uI: UserInterfaceService, public uAI: UserAuthInterfaceService) {
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
      const username: string = this.form.controls['username'].value;
      const confirmationCode: string = this.form.controls['confirmation_code'].value.toString();
      await this.uAI.exposedService.confirmSignUp(username, confirmationCode);
      console.log('✔️ Successfully confirmed code');
    } catch (error) {
      console.log('❌ Error confirming code: \n', error);
      this.erorMessage = (<any>error).message + '.';
    }
  }
  async resendCode() {
    try {
      const username: string = this.form.controls['username'].value;
      await this.uAI.exposedService.resendSignUpCode(username);
      console.log('✔️ Successfully re-sent code');
    } catch (error) {
      console.log('❌ Error re-sending code: \n', error);
      this.erorMessage = (<any>error).message + '.';
    }
  }
}
