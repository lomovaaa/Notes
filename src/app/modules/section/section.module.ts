import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';

import { SectionComponent } from '../section/section/section.component';
import { NoteComponent } from '../section/note/note.component';

import { Routes, RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const appRoutes: Routes = [
  { path: '', component: SectionComponent }
];

@NgModule({
  declarations: [
    SectionComponent,
    NoteComponent,
    // DropdownMenuComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ColorPickerModule,
    RouterModule.forRoot(appRoutes),
    DragDropModule,
    HttpClientModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        defaultLanguage: 'ru'
      }
    )
  ],
  exports: [
    SectionComponent,
    NoteComponent
  ]
})
export class SectionModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

