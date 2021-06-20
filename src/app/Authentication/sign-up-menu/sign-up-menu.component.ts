import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignUpParams } from '@aws-amplify/auth/lib-esm/types';
import { Auth } from 'aws-amplify';
import { BaseAuthenticationComponent } from '../base-components/base-authentication/base-authentication.component';
import {
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  STRONG_PASSWORD_REGEX,
  USERNAME_REGEX,
} from '../base-components/constants/form-constants';

@Component({
  selector: 'sign-up-menu',
  templateUrl: './sign-up-menu.component.html',
  styleUrls: ['./sign-up-menu.component.scss'],
})
export class SignUpMenuComponent extends BaseAuthenticationComponent implements OnInit {
  isCodeVerificationStage: boolean = false;
  constructor(public fb: FormBuilder) {
    super(
      fb.group({
        username: [
          '',
          [
            Validators.required,
            Validators.min(MIN_USERNAME_LENGTH),
            Validators.max(MAX_USERNAME_LENGTH),
            Validators.pattern(USERNAME_REGEX),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.min(MIN_PASSWORD_LENGTH),
            Validators.max(MAX_PASSWORD_LENGTH),
            Validators.pattern(STRONG_PASSWORD_REGEX),
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
      const config: SignUpParams = {
        username: this.form.controls['username'].value,
        password: this.form.controls['password'].value,
        attributes: {
          email: this.form.controls['email'].value,
        },
      };
      const { user } = await Auth.signUp(config);
      this.setCodeVerificationMode();
      console.log('✔️ Create account successful');
    } catch (error) {
      console.log('❌ Error creating account: \n', error);
    }
  }
}

//Note:No multi-factor authentication when signingup for now.
