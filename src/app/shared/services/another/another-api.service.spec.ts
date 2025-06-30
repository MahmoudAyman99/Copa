import { TestBed } from '@angular/core/testing';

import { AnotherApiService } from './another-api.service';

describe('AnotherApiService', () => {
  let service: AnotherApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnotherApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
