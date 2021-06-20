import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryMenuComponent } from './recovery-menu.component';

describe('RecoveryMenuComponent', () => {
  let component: RecoveryMenuComponent;
  let fixture: ComponentFixture<RecoveryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
