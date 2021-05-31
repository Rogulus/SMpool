import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreatorComponent } from './admin-creator.component';

describe('AdminCreatorComponent', () => {
  let component: AdminCreatorComponent;
  let fixture: ComponentFixture<AdminCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
