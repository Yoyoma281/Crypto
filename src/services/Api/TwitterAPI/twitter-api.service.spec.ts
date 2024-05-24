import { TestBed } from '@angular/core/testing';

import { TwitterAPIService } from './twitter-api.service';

describe('TwitterAPIService', () => {
  let service: TwitterAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitterAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
