import { TestBed } from '@angular/core/testing';

import { BookRoutingResolverService } from './book-routing-resolver.service';

describe('BookRoutingResolverService', () => {
  let service: BookRoutingResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRoutingResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
