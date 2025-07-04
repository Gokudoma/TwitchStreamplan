import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // WICHTIG: Hinzufügen für [(ngModel)]

// Interfaces bleiben gleich
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
  imports: [CommonModule, FormsModule], // WICHTIG: FormsModule hier importieren
  templateUrl: './streamplan.component.html',
  styleUrls: ['./streamplan.component.css']
})
export class StreamplanComponent implements OnInit {
  public schedule: Schedule = { weekRange: '', days: [] };
  public editMode = false; // Steuert den Bearbeiten-Modus

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadScheduleFromLocalStorage();
  }

  /**
   * Versucht den Plan aus dem Browser-Speicher zu laden.
   * Wenn keiner vorhanden ist, wird der Standardplan aus der JSON-Datei geladen.
   */
  loadScheduleFromLocalStorage(): void {
    const savedSchedule = localStorage.getItem('streamSchedule');
    if (savedSchedule) {
      this.schedule = JSON.parse(savedSchedule);
    } else {
      // Lade den Standardplan, wenn die Seite zum ersten Mal besucht wird
      this.http.get<Schedule>('assets/schedule.json').subscribe(defaultSchedule => {
        this.schedule = defaultSchedule;
        this.saveScheduleToLocalStorage(); // Und speichere ihn direkt
      });
    }
  }

  /**
   * Speichert den aktuellen Plan im Browser-Speicher und beendet den Bearbeiten-Modus.
   */
  saveScheduleToLocalStorage(): void {
    localStorage.setItem('streamSchedule', JSON.stringify(this.schedule));
    this.editMode = false; // Bearbeiten-Modus nach dem Speichern verlassen
  }
}
