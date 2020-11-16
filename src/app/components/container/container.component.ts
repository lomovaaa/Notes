import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

import { ModalSectionComponent } from '../../modules/modal/modal-section/modal-section.component';
import { ISection } from '../../modules/section/section/isection';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  public icons = {
    plus: faPlus
  };
  public showLangList = false;
  public sections: ISection[] = [];

  @ViewChild('modalForSection', { read: ViewContainerRef }) container;

  constructor(private dataService: DataService, private resolver: ComponentFactoryResolver, private translate: TranslateService) {
    translate.use('ru');
  }

  ngOnInit(): void {
    this.update();
  }

  public openLangList(): void {
    this.showLangList = !this.showLangList;
  }

  public changeLang(lang: string): void {
    this.translate.use(lang);
    this.showLangList = !this.showLangList;
  }

   /**
    * Создает динамический компонент модального окна для добавления секции.
    */
  public addSection(): void {
    this.container.clear();
    const modalFactory = this.resolver.resolveComponentFactory(ModalSectionComponent);
    const component = this.container.createComponent(modalFactory);
    component.instance.rename = false;
    component.instance.closeModal.subscribe( () => {
      this.container.clear();
    });
    component.instance.submitForm.subscribe( () => {
      this.container.clear();
      this.update();
    });
  }

  public deleteSection(id: number): void {
    this.dataService.deleteSection(id);
    this.update();
  }

  private update(): void {
    this.dataService.getAllSections().subscribe(value => {
      this.sections = value;
    });
  }
}
