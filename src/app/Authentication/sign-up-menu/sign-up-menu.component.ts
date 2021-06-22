import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignUpParams } from '@aws-amplify/auth/lib-esm/types';
import { Auth } from 'aws-amplify';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { CustomValidators } from '../authentication/base/validator-functions/custom-validators';
import { BaseAuthenticationComponent } from '../base-components/base-authentication/base-authentication.component';
import {
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../base-components/constants/form-constants';

@Component({
  selector: 'sign-up-menu',
  templateUrl: './sign-up-menu.component.html',
  styleUrls: ['./sign-up-menu.component.scss'],
})
export class SignUpMenuComponent extends BaseAuthenticationComponent implements OnInit {
  isCodeVerificationStage: boolean = false;
  constructor(public fb: FormBuilder, public uI: UserInterfaceService) {
    super(
      fb.group({
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(MIN_USERNAME_LENGTH),
            Validators.maxLength(MAX_USERNAME_LENGTH),
            CustomValidators.validUsername,
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(MIN_PASSWORD_LENGTH),
            Validators.maxLength(MAX_PASSWORD_LENGTH),
            CustomValidators.strongPassword,
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
      })
    );
  }

  ngOnInit(): void {}
  setCodeVerificationMode() {
    this.isCodeVerificationStage = true;
  }
  async createAccount() {
    try {
      this.uI.letItBeKnownUiIsLoading();
      const config: SignUpParams = {
        username: this.form.controls['username'].value,
        password: this.form.controls['password'].value,
        attributes: {
          email: this.form.controls['email'].value,
        },
      };
      await Auth.signUp(config);
      this.uI.letItBeKnownUiIsNotLoading();
      this.setCodeVerificationMode();
      console.log('✔️ Create account successful');
    } catch (error) {
      this.uI.letItBeKnownUiIsNotLoading();
      console.log('❌ Error creating account: \n', error);

      this.erorMessage = (<any>error).message + '.';
    }
  }
}

//Note:No multi-factor authentication when signingup for now.
