import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { WordCloudFormComponent } from './wordcloud-form/wordcloud-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WordCloudComponent } from './wordcloud/wordcloud.component'
import { HttpClientModule } from '@angular/common/http';

import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    WordCloudFormComponent,
    WordCloudComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
