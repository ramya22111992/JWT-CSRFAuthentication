import { TestBed } from '@angular/core/testing';

import { RouteActivateService } from './route-activate.service';

describe('RouteActivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteActivateService = TestBed.get(RouteActivateService);
    expect(service).toBeTruthy();
  });
});
