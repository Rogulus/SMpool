import { TestBed } from '@angular/core/testing';

import { AdminRegistrationGuard } from './admin-registration.guard';

describe('AdminRegistrationGuard', () => {
  let guard: AdminRegistrationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminRegistrationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
