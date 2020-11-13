import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-modal-section',
  templateUrl: './modal-section.component.html',
  styleUrls: ['./modal-section.component.scss']
})
/**
 * Класс компонента модального окна для секции.
 */
export class ModalSectionComponent implements OnInit {
  iconClose = faTimes;
  idSection: number;
  rename: boolean;
  currTitle: string;

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<void>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.form = formBuilder.group({
      sectionTitle: new FormControl('', Validators.required)
    });
  }

  /**
   * Обрабатка события отправки формы. Редактирование и добавление новой секции.
   */
  onSection(): void {
    if (!this.rename) {
      this.dataService.addSection(this.form.value.sectionTitle);
    }
    else {
      this.dataService.getSection(this.idSection).sectionTitle = this.form.value.sectionTitle;
    }
    this.submitForm.emit();
  }

  ngOnInit(): void {
    if (this.rename) {
      this.form.patchValue({
        sectionTitle: this.currTitle
      });
    }
  }
}
