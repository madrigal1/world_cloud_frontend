import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../baseUrl';


export interface getWordCloudResponse {
  plot_url: string;
  freq_data: Array<[string, number]>;
  total_relevant_words: number;
}

@Injectable({
  providedIn: 'root'
})
export class WordCloudService {
  private source_text: string;
  constructor(private http: HttpClient) {
    this.source_text = "";
  }
  fetchWordCloud() {
    const headers = { 'content-type': 'application/json' };
    const body = { source_text: this.source_text };
    return this.http.post<getWordCloudResponse>(`${BASE_URL}/getWordCloud`, JSON.stringify(body), {
      responseType: 'json',
      headers
    })
  }
  setSourceText(arg_source_text: string) {
    this.source_text = arg_source_text;
  }
  getSourceText() {
    return this.source_text;
  }
}
