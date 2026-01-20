import { Component } from '@angular/core';

import { UploadsComponent } from "./components/uploads/uploads.component";

@Component({
  selector: 'app-root',
  imports: [UploadsComponent],
  templateUrl: './app.html',
  styleUrl: './app.less',
  standalone: true
})
export class AppComponent{
  title = 'upload-app';
}