import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { ModalNoteComponent } from './modal-note/modal-note.component';
import { ModalSectionComponent } from './modal-section/modal-section.component';

@NgModule({
  declarations: [
    ModalSectionComponent,
    ModalNoteComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    ModalSectionComponent,
    ModalNoteComponent
  ],
  entryComponents: [ModalSectionComponent, ModalNoteComponent]
})
export class ModalModule { }
