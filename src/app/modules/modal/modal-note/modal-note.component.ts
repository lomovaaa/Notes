import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../../services/data.service';
import { INote } from '../../section/note/inote';

@Component({
  selector: 'app-modal-note',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.scss']
})
/**
 * Класс компонента модального окна для заметки.
 */
export class ModalNoteComponent implements OnInit {
  iconClose = faTimes;

  sectionId: number;
  noteId: number;
  edit: boolean;
  currNote: INote;

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<void>();

  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.form = formBuilder.group({
      noteTitle: new FormControl('', Validators.required),
      noteText: new FormControl('', Validators.required),
      noteDate: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if (!this.edit) {
      this.form.patchValue({
        noteDate: new Date()
      });
    }
    else {
      this.form.patchValue({
        noteTitle: this.currNote.noteTitle,
        noteText: this.currNote.noteText,
        noteDate: this.currNote.noteDate
      });
    }
  }

  editDate(date: any): Date {
    if (typeof date === 'object') {
      return date;
    }
    else {
      return new Date(date);
    }
  }

  /**
   * Обрабатка события отправки формы. Редактирование и добавление новой заметки.
   */
  onNote(): void {
    if (!this.edit) {
      // this.dataService.addNote(this.sectionId, {
      //   noteId: this.dataService.setIdForNote(this.sectionId),
      //   noteTitle: this.form.value.noteTitle,
      //   noteText: this.form.value.noteText,
      //   noteDate: this.editDate(this.form.value.noteDate)
      // });
      this.dataService.addNote(this.sectionId, {
        title: this.form.value.noteTitle,
        text: this.form.value.noteText,
        date: this.editDate(this.form.value.noteDate)
      });
    }
    else {
      this.dataService.getNote(this.sectionId, this.noteId).noteTitle = this.form.value.noteTitle;
      this.dataService.getNote(this.sectionId, this.noteId).noteText = this.form.value.noteText;
      this.dataService.getNote(this.sectionId, this.noteId).noteDate = this.editDate(this.form.value.noteDate);
    }
    this.submitForm.emit();
  }
}
