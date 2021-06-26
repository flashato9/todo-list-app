import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { LoadingComponent } from '../global-ui/loading/loading.component';

@Injectable({
  providedIn: 'root',
})
export class UserInterfaceService {
  private dialogRef!: MatDialogRef<LoadingComponent, any>;
  constructor(public dialog: MatDialog) {}

  openLoadingComponent() {
    this.dialogRef = this.dialog.open(LoadingComponent, {
      width: '100%',
      height: '100%',
      backdropClass: 'dialog-backdrop-loading',
      panelClass: 'dialog-box-loading',
      disableClose: true,
      autoFocus: false,
    });
    logTheDialog(this.dialogRef, 'LoadingComponent');
  }
  closeLoadingComponent() {
    this.dialogRef.close();
  }
}
export function logTheDialog<T, R>(dR: MatDialogRef<T, R>, typeName: string) {
  dR.afterOpened()
    .pipe(take(1))
    .subscribe(() => {
      console.log(`Dialog ${typeName} has opened...`);
    });
  dR.afterClosed()
    .pipe(take(1))
    .subscribe(() => {
      console.log(`Dialog ${typeName} has closed...`);
    });
}
