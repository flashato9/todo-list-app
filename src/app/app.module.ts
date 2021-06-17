import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInMenuComponent } from './Authentication/log-in-menu/log-in-menu.component';
import { HeaderComponent } from './header/header/header.component';
import { CreateTodoListFormComponent } from './main-submission/create-todo-list-form/create-todo-list-form.component';
import { ListItemComponent } from './main/list-item/list-item.component';
import { MainComponent } from './main/main/main.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogInMenuComponent,
    CreateTodoListFormComponent,
    MainComponent,
    ListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
