import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpMenuComponent } from './sign-up-menu.component';

describe('SignUpMenuComponent', () => {
  let component: SignUpMenuComponent;
  let fixture: ComponentFixture<SignUpMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
