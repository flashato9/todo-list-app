import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoadingComponent } from '../global-ui/loading/loading.component';

@Injectable({
  providedIn: 'root',
})
export class UserInterfaceService {
  private Loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$ = this.Loading$.asObservable();
  isNotLoading$ = this.Loading$.pipe(map((val) => !val));
  dialogRef!: MatDialogRef<LoadingComponent, any>;
  constructor(public dialog: MatDialog) {}

  letItBeKnownUiIsLoading() {
    this.Loading$.next(true);
    this.openLoadingComponent();
  }
  letItBeKnownUiIsNotLoading() {
    this.Loading$.next(false);
    this.dialogRef?.close();
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
        console.log(`Dialog AuthenticationComponent has opened...`);
      });
    dR.afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        console.log(`Dialog AuthenticationComponent has closed...`);
      });
  }
}
