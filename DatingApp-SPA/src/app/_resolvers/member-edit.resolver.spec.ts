import { TestBed } from '@angular/core/testing';

import { MemberEditResolver } from './member-edit.resolver';

describe('MemberEditResolver', () => {
  let resolver: MemberEditResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MemberEditResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
