import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent)
  .catch((err) => {
    document.body.innerHTML = `<h1 style="color:red">Error: ${err}</h1>`;
  });
