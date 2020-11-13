import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ModalSectionComponent } from '../../modules/modal/modal-section/modal-section.component';
import { DataService } from '../../services/data.service';
import { ISection } from '../../modules/section/section/isection';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
/**
 * Класс компонента контейнера.
 */
export class ContainerComponent implements OnInit {
  iconPlus = faPlus;
  sections: ISection[] = [];
  @ViewChild('modalForSection', { read: ViewContainerRef }) container;

  constructor(private dataService: DataService, private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.update();
  }

   /**
    * Создание динамического компонента модального окна для добавления секции.
    */
  addSection(): void {
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

  removeSection(id: number): void {
    this.dataService.removeSection(id);
    this.update();
  }

  private update(): void {
    this.dataService.getAllSections().subscribe(value => {
      this.sections = value;
    });
  }
}
