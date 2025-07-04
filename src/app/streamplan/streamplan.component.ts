import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var html2canvas: any;

export interface StreamDay {
  name: string;
  startTime: string;
  activity: string;
  isOffDay: boolean;
  emote: string | null;
}

export interface Schedule {
  weekRange: string;
  days: StreamDay[];
}

@Component({
  selector: 'app-streamplan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './streamplan.component.html',
  styleUrls: ['./streamplan.component.css']
})
export class StreamplanComponent implements OnInit {
  public schedule: Schedule = { weekRange: '', days: [] };
  public editMode = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadScheduleFromLocalStorage();
  }

  loadScheduleFromLocalStorage(): void {
    const savedSchedule = localStorage.getItem('streamSchedule');
    if (savedSchedule) {
      this.schedule = JSON.parse(savedSchedule);
    } else {
      this.http.get<Schedule>('assets/schedule.json').subscribe(defaultSchedule => {
        this.schedule = defaultSchedule;
        this.saveScheduleToLocalStorage();
      });
    }
  }

  saveScheduleToLocalStorage(): void {
    localStorage.setItem('streamSchedule', JSON.stringify(this.schedule));
    this.editMode = false;
  }

  downloadAsImage(): void {
    const elementToCapture = document.getElementById('streamplan-container');
    const buttons = document.querySelector('.actions-toolbar') as HTMLElement;

    if (elementToCapture && buttons) {
      buttons.style.display = 'none';

      html2canvas(document.body, { 
        useCORS: true,
        height: window.innerHeight,
        width: window.innerWidth,
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
      }).then((canvas: any) => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'streamplan.png';
        link.click();
        
        buttons.style.display = 'block';
      });
    }
  }
}
