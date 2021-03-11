import { TestBed } from '@angular/core/testing';

import { SurveyService } from './survey.service';

describe('UploadService', () => {
  let service: SurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
