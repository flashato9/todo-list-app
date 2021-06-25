import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoadingComponent } from '../global-ui/loading/loading.component';
import { UserAuthInterfaceService } from './user-authentication/user-auth-interface.service';

@Injectable({
  providedIn: 'root',
})
export class UserInterfaceService {
  dialogRef!: MatDialogRef<LoadingComponent, any>;
  sub$d: Subscription;
  constructor(public dialog: MatDialog, public uAI: UserAuthInterfaceService) {
    this.sub$d = this.uAI.exposedService.isPerformingBlockingAsyncCall$.subscribe((value) => {
      if (value) this.openLoadingComponent();
      else {
        if (this.dialogRef) this.dialogRef.close();
      }
    });
  }

  private openLoadingComponent() {
    this.dialogRef = this.dialog.open(LoadingComponent, {
      width: '100%',
      height: '100%',
      backdropClass: 'dialog-backdrop-loading',
      panelClass: 'dialog-box-loading',
      disableClose: true,
      autoFocus: false,
    });
    this.logTheDialog(this.dialogRef);
  }

  private logTheDialog<T, R>(dR: MatDialogRef<T, R>) {
    dR.afterOpened()
      .pipe(take(1))
      .subscribe(() => {
        console.log(`Dialog LoadingComponent has opened...`);
      });
    dR.afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        console.log(`Dialog LoadingComponent has closed...`);
      });
  }
}
