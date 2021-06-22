import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { UserInterfaceService } from 'src/app/services/user-interface.service';
import { BaseAuthenticationComponent, User } from '../base-components/base-authentication/base-authentication.component';

@Component({
  selector: 'log-in-menu',
  templateUrl: './log-in-menu.component.html',
  styleUrls: ['./log-in-menu.component.scss'],
})
export class LogInMenuComponent extends BaseAuthenticationComponent implements OnInit, OnDestroy {
  isCodeVerificationStage: boolean = false;
  triggerOptionToEnterRecoveryMode: boolean = false;
  usernameControl: AbstractControl;
  passwordControl: AbstractControl;
  constructor(public fb: FormBuilder, public uI: UserInterfaceService) {
    super(
      fb.group(
        {
          username: ['', Validators.required],
          password: ['', Validators.required],
        },
        { updateOn: 'change' }
      )
    );
    this.usernameControl = this.form.controls['username'];
    this.passwordControl = this.form.controls['password'];
  }

  ngOnInit() {}
  reset() {
    super.reset();
    this.isCodeVerificationStage = false;
    this.triggerOptionToEnterRecoveryMode = false;
    this.erorMessage = '';
    this.passwordControl.setValue('');
  }
  async signIn() {
    try {
      this.uI.letItBeKnownUiIsLoading();
      const username = this.form.controls['username'].value;
      const password = this.form.controls['password'].value;

      const user = await Auth.signIn(username, password);
      this.uI.letItBeKnownUiIsNotLoading();
      this.onSuccessfulSubmit.emit(<User>user);
      console.log('✔️ Sign In successful');
    } catch (error) {
      this.uI.letItBeKnownUiIsNotLoading();
      console.log('❌ Error sign in: \n', error);

      if ((<any>error).code === 'UserNotConfirmedException') {
        this.isCodeVerificationStage = true;
      } else if ((<any>error).code === 'PasswordResetRequiredException') {
        this.triggerOptionToEnterRecoveryMode = true;
      }
      this.erorMessage = (<any>error).message + '.';
    }
  }

  ngOnDestroy() {}
}
