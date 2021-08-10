import { Component, OnInit } from '@angular/core';
import { getWordCloudResponse, WordCloudService } from '../wordcloud.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.scss']
})
export class WordCloudComponent implements OnInit {
  imgb64Src!: SafeResourceUrl
  freq_data!: Array<[string, number]>
  total_relevant_words!: number
  loading: boolean
  constructor(
    private wordcloudService: WordCloudService,
    private _sanitizer: DomSanitizer
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.wordcloudService.fetchWordCloud()
      .subscribe((data: getWordCloudResponse) => {
        this.loading = false;
        this.imgb64Src = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
          + data.plot_url);
        this.freq_data = data.freq_data;
        this.total_relevant_words = data.total_relevant_words;
        console.log(data);
      })
  }

}
