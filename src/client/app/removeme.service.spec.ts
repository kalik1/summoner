import { TestBed } from '@angular/core/testing';

import { RemovemeService } from './removeme.service';

describe('RemovemeService', () => {
  let service: RemovemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemovemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
