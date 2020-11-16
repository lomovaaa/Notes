import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from '../../../services/data.service';
import { INote } from '../../section/note/inote';

@Component({
  selector: 'app-modal-note',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Модальное окно.
 * Используется для редактирования и добавления заметок.
 */
export class ModalNoteComponent implements OnInit {
  public icons = {
    close: faTimes
  };

  public sectionId: number;
  public noteId: number;
  public edit: boolean;
  public currNote: INote;

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<void>();

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private translate: TranslateService) {
    this.form = formBuilder.group({
      noteTitle: new FormControl('', Validators.required),
      noteText: new FormControl('', Validators.required),
      noteDate: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if (!this.edit) {
      this.form.patchValue({
        noteDate: this.getDate(new Date())
      });
    }
    else {
      this.form.patchValue({
        noteTitle: this.currNote.noteTitle,
        noteText: this.currNote.noteText,
        noteDate: this.getDate(this.currNote.noteDate)
      });
    }
  }

  /**
   * Обрабатывает событие отправки формы в зависимости от добавления или редактирования заметки.
   */
  public onNote(): void {
    if (!this.edit) {
      this.dataService.addNote(this.sectionId, {
        title: this.form.value.noteTitle,
        text: this.form.value.noteText,
        date: this.toDate(this.form.value.noteDate)
      });
      console.log(this.toDate(this.form.value.noteDate));
    }
    else {
      this.dataService.getNote(this.sectionId, this.noteId).noteTitle = this.form.value.noteTitle;
      this.dataService.getNote(this.sectionId, this.noteId).noteText = this.form.value.noteText;
      this.dataService.getNote(this.sectionId, this.noteId).noteDate = this.toDate(this.form.value.noteDate);
    }
    this.submitForm.emit();
  }

  /**
   * Преобразует дату в объект Date.
   */
  private toDate(date: any): Date {
    if (typeof date === 'object') {
      return date;
    }
    else {
      return new Date(date);
    }
  }

  /**
   * Возвращает объект даты в формате YYYY-MM-DDTHH:mm UTC+3.
   */
  private getDate(date: any): string {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().substring(0, 16);
  }
}
