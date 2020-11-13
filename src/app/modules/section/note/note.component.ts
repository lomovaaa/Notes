import { Component, Input, Output, OnInit, EventEmitter, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { DataService } from '../../../services/data.service';
import { INote } from './inote';
import { ModalNoteComponent } from '../../modal/modal-note/modal-note.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
/**
 * Класс комнопента заметки.
 */
export class NoteComponent implements OnInit {
  iconTrash = faTrashAlt;
  iconEdit = faEdit;

  note: INote;
  @Input() sectionId: number;
  @Input() noteId: number;

  @ViewChild('modalForNote', { read: ViewContainerRef }) containerModal;
  @Output() outRemoveNote = new EventEmitter<any>();

  constructor(private dataService: DataService, private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.note = this.dataService.getNote(this.sectionId, this.noteId);
  }

  removeNote(): void {
    this.outRemoveNote.emit(this.note.noteId);
  }

  /**
   * Создание динамического компонента модального окна для редактирования заметки.
   */
  editNote(): void {
    this.containerModal.clear();
    const modalFactoryNote = this.resolver.resolveComponentFactory(ModalNoteComponent);
    const modal = this.containerModal.createComponent(modalFactoryNote);

    modal.instance.sectionId = this.sectionId;
    modal.instance.noteId = this.note.noteId;
    modal.instance.edit = true;
    modal.instance.currNote = this.note;

    modal.instance.closeModal.subscribe(() => {
      this.containerModal.clear();
    });
    modal.instance.submitForm.subscribe(() => {
      this.containerModal.clear();
      this.dataService.updateLocalStorage();
    });
  }
}
