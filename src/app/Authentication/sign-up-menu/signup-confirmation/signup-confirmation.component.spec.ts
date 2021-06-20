import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupConfirmationComponent } from './signup-confirmation.component';

describe('SignupConfirmationComponent', () => {
  let component: SignupConfirmationComponent;
  let fixture: ComponentFixture<SignupConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
