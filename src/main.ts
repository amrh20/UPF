import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
else {
  (window as any).wmConfig = environment.formConfigNew;
}

(window as any).wmConfig = JSON.parse(atob((window as any).wmConfig));

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
