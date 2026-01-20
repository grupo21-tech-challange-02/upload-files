import { bootstrapApplication } from '@angular/platform-browser';
import { UploadsComponent } from '../app/components/uploads/uploads.component';

bootstrapApplication(UploadsComponent)
  .catch(err => console.error(err));
