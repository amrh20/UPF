import { TestBed, inject } from '@angular/core/testing';

import { I18nService } from './i18n.service';

describe('I18nService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18nService]
    });
  });

  it('should be created', inject([I18nService], (service: I18nService) => {
    expect(service).toBeTruthy();
  }));

  it('translation return correct name', inject([I18nService], function(service: I18nService) {
    expect(service.translate('profileInfo.directManager')).toBe('Direct Manager' || 'المدير المباشر');
  }));
});
