import { TestBed } from '@angular/core/testing';

import { UsersUtilsService } from './users-utils.service';

describe('UsersUtilsService', () => {
  let service: UsersUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
