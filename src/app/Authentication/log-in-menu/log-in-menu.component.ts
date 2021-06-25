import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserAuthInterfaceService } from 'src/app/services/user-auth-interface.service';
import { BaseAuthenticationComponent } from '../base-components-and-functions/base-authentication/base-authentication.component';

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
  constructor(public fb: FormBuilder, public uAI: UserAuthInterfaceService) {
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
      const username = this.form.controls['username'].value;
      const password = this.form.controls['password'].value;
      await this.uAI.exposedService.signInUser(username, password);
      console.log('✔️ Sign In successful');
    } catch (error) {
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
