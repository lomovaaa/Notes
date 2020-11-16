import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-modal-section',
  templateUrl: './modal-section.component.html',
  styleUrls: ['./modal-section.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Модальное окно.
 * Используется для редактирования и добавления секций.
 */
export class ModalSectionComponent implements OnInit {
  public icons = {
    close: faTimes
  };

  public idSection: number;
  public rename: boolean;
  public currTitle: string;

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<void>();

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private translate: TranslateService) {
    this.form = formBuilder.group({
      sectionTitle: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.rename) {
      this.form.patchValue({ sectionTitle: this.currTitle });
    }
  }

  /**
   * Обрабатывает событие отправки формы в зависимости от добавления или редактирования секции.
   */
  public onSection(): void {
    if (!this.rename) {
      this.dataService.addSection(this.form.value.sectionTitle);
    }
    else {
      this.dataService.getSection(this.idSection).sectionTitle = this.form.value.sectionTitle;
    }
    this.submitForm.emit();
  }
}
