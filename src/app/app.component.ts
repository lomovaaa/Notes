import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private dataService: DataService) {}

  public dropSections(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.dataService.sections, event.previousIndex, event.currentIndex);
    this.dataService.updateLocalStorage();
  }
}
