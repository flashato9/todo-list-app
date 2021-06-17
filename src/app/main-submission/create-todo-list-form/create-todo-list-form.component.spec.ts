import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoListFormComponent } from './create-todo-list-form.component';

describe('CreateTodoListFormComponent', () => {
  let component: CreateTodoListFormComponent;
  let fixture: ComponentFixture<CreateTodoListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTodoListFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTodoListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
