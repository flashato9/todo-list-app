import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAuthInterfaceService } from 'src/app/services/user-auth-interface.service';
import { SignUpParams } from 'src/app/services/user-authentication.service';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { BaseAuthenticationComponent } from '../base-components-and-functions/base-authentication/base-authentication.component';
import {
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from '../base-components-and-functions/form-constants/form-constants';
import { CustomValidators } from '../base-components-and-functions/validators/custom-validators';

@Component({
  selector: 'sign-up-menu',
  templateUrl: './sign-up-menu.component.html',
  styleUrls: ['./sign-up-menu.component.scss'],
})
export class SignUpMenuComponent extends BaseAuthenticationComponent implements OnInit {
  isCodeVerificationStage: boolean = false;
  constructor(public fb: FormBuilder, public uI: UserInterfaceService, public uAI: UserAuthInterfaceService) {
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
      const config: SignUpParams = {
        username: this.form.controls['username'].value,
        password: this.form.controls['password'].value,
        attributes: {
          email: this.form.controls['email'].value,
        },
      };
      await this.uAI.exposedService.createAccount(config);
      this.setCodeVerificationMode();
      console.log('✔️ Create account successful');
    } catch (error) {
      console.log('❌ Error creating account: \n', error);

      this.erorMessage = (<any>error).message + '.';
    }
  }
}

//Note:No multi-factor authentication when signingup for now.
