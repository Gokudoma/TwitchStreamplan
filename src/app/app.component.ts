import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamplanComponent } from './streamplan/streamplan.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StreamplanComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'schiddii-streamplan';
}
