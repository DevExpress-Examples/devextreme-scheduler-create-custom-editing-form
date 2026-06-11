import { bootstrapApplication } from '@angular/platform-browser';
import config from 'devextreme/core/config';
import { AppComponent } from './app/app.component';
import { licenseKey } from './devextreme-license';

config({ licenseKey });

bootstrapApplication(AppComponent)
  .catch((err) => {
    document.body.innerHTML = `<h1 style="color:red">Error: ${err}</h1>`;
  });
