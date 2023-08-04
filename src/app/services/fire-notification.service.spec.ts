import { TestBed } from '@angular/core/testing';

import { FireNotificationService } from './fire-notification.service';

describe('FireNotificationService', () => {
  let service: FireNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
