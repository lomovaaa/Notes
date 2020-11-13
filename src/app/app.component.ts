import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DataService } from './services/data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Notes';
  constructor(private dataService: DataService, private translate: TranslateService) {
    translate.use('ru');
  }
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.dataService.sections, event.previousIndex, event.currentIndex);
    this.dataService.updateLocalStorage();
  }
}
