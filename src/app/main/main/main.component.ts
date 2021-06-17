import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatabaseContactorService } from 'src/app/services/database-contactor.service';
import { TodoListItem } from 'src/app/services/http-todo.service';
import { UserAuthenticationService, UserCredential } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(public dC: DatabaseContactorService, public uA: UserAuthenticationService) {
    uA.userCredential.subscribe((userCreds) => {
      if (userCreds) {
        userCreds as UserCredential;
        
      }
    });
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  onDelete(item: TodoListItem) {
    this.dC.deleteTodoListItem(item);
  }
}
