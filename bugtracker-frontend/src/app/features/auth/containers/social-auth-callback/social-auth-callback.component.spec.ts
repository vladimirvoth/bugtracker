import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAuthCallbackComponent } from './social-auth-callback.component';

describe('SocialAuthCallbackComponent', () => {
  let component: SocialAuthCallbackComponent;
  let fixture: ComponentFixture<SocialAuthCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialAuthCallbackComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAuthCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
