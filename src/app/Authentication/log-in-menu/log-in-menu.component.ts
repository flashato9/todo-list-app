import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { BaseAuthenticationComponent, User } from '../base-components/base-authentication/base-authentication.component';

@Component({
  selector: 'log-in-menu',
  templateUrl: './log-in-menu.component.html',
  styleUrls: ['./log-in-menu.component.scss'],
})
export class LogInMenuComponent extends BaseAuthenticationComponent implements OnInit, OnDestroy {
  isCodeVerificationStage: boolean = false;
  triggerOptionToEnterRecoveryMode: boolean = false;
  constructor(public fb: FormBuilder) {
    super(
      fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      })
    );
  }

  ngOnInit() {}

  async signIn() {
    try {
      const username = this.form.controls['username'].value;
      const password = this.form.controls['password'].value;

      const user = await Auth.signIn(username, password);
      this.onSuccessfulSubmit.emit(<User>user);
      console.log('✔️ Sign In successful');
    } catch (error) {
      console.log('❌ Error sign in: \n', error);
      if ((<any>error).code === 'UserNotConfirmedException') {
        this.isCodeVerificationStage = true;
      } else if ((<any>error).code === 'PasswordResetRequiredException') {
        this.erorMessage = (<any>error).message;
        this.triggerOptionToEnterRecoveryMode = true;
      } else {
        this.erorMessage = (<any>error).message;
      }
    }
  }

  ngOnDestroy() {}
}
