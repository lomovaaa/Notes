import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { ModalModule } from './modules/modal/modal.module';
import { SectionModule } from './modules/section/section.module';

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
  exports: [TranslateModule]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
