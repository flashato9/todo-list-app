import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInMenuComponent } from './log-in-menu.component';

describe('LogInMenuComponent', () => {
  let component: LogInMenuComponent;
  let fixture: ComponentFixture<LogInMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
