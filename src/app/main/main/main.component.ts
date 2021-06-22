import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoListItem } from 'src/app/services/http-todo.service';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(public uA: UserAuthenticationService) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  onDelete(item: TodoListItem) {
    //this.dC.deleteTodoListItem(item);
  }
}
