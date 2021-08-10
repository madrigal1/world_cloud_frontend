import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordCloudFormComponent } from './wordcloud-form/wordcloud-form.component';
import { WordCloudComponent } from './wordcloud/wordcloud.component';

const routes: Routes = [
  { path: "", component: WordCloudFormComponent },
  { path: "wordcloud/result", component: WordCloudComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
