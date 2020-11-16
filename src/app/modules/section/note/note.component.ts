import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../../services/data.service';
import { ModalNoteComponent } from '../../modal/modal-note/modal-note.component';
import { INote } from './inote';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  public icons = {
    trash: faTrashAlt,
    edit: faEdit
  };
  public note: INote;

  @Input() sectionId: number;
  @Input() noteId: number;
  @Output() outRemoveNote = new EventEmitter<any>();
  @ViewChild('modalForNote', { read: ViewContainerRef }) containerModal;

  constructor(private dataService: DataService, private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.note = this.dataService.getNote(this.sectionId, this.noteId);
  }

  public removeNote(): void {
    this.outRemoveNote.emit(this.note.noteId);
  }

  /**
   * Создает динамический компонент модального окна для редактирования заметки.
   */
  public editNote(): void {
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
