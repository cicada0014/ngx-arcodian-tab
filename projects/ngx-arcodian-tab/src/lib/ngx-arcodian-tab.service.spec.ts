import { TestBed } from '@angular/core/testing';

import { NgxArcodianTabService } from './ngx-arcodian-tab.service';

describe('NgxArcodianTabService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxArcodianTabService = TestBed.get(NgxArcodianTabService);
    expect(service).toBeTruthy();
  });
});
