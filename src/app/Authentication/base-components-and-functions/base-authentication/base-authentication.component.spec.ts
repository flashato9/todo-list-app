import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAuthenticationComponent } from './base-authentication.component';

describe('BaseAuthenticationComponent', () => {
  let component: BaseAuthenticationComponent;
  let fixture: ComponentFixture<BaseAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
