import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';

import { SectionModule } from './modules/section/section.module';
import { ModalModule } from './modules/modal/modal.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent
  ],
  imports: [
    ModalModule,
    SectionModule,
    BrowserModule,
    FontAwesomeModule,
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
  bootstrap: [AppComponent],
  exports: [ TranslateModule]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
