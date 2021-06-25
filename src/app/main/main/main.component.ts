import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatabaseContactorService } from 'src/app/services/database-contactor.service';
import { UserAuthInterfaceService } from 'src/app/services/user-authentication/user-auth-interface.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(public uAI: UserAuthInterfaceService, public dC: DatabaseContactorService) {
    dC.getData()
      .then((result) => {
        console.log('Added to database:', result);
      })
      .catch(console.log);
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  onDelete(item: any) {
    //this.dC.deleteTodoListItem(item);
  }
}
