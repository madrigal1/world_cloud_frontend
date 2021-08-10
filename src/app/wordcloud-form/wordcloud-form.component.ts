import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { WordCloudService } from '../wordcloud.service';

@Component({
  selector: 'app-wordcloud-form',
  templateUrl: './wordcloud-form.html',
  styleUrls: ['./wordcloud-form.scss']
})
export class WordCloudFormComponent implements OnInit {
  input_text: string;
  file: any;
  constructor(
    private wordcloudService: WordCloudService,
    private router: Router,
  ) {
    this.input_text = "";
  }
  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.input_text.length <= 1) {
      alert("Too few characters in text input. \n Please input more than 1 character")
      return;
    }
    this.wordcloudService.setSourceText(this.input_text);
    this.input_text = "";
    this.file = null;
    this.router.navigate(["wordcloud/result"]);
  }

  handleDocument(e: any): void {
    this.file = e.target?.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.input_text = fileReader.result as string;
    }
    fileReader.readAsText(this.file);
  }

}
