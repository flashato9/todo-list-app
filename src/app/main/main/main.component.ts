import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatabaseContactorService } from 'src/app/services/database-contactor.service';
import { TodoListItem } from 'src/app/services/http-todo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(public dC: DatabaseContactorService) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  onDelete(item: TodoListItem) {
    //this.dC.deleteTodoListItem(item);
  }
}
