import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { getWordCloudResponse, WordCloudService } from '../wordcloud.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WordCloudComponent implements OnInit {
  imgb64Src!: SafeResourceUrl;
  imgsrc_raw!: string;
  pdfsrc_raw!: string;
  freq_data!: Array<[string, number]>;
  total_relevant_words!: number;
  loading: boolean
  title = 'appBootstrap';
  closeResult!: string;
  imgDownloadFileLink!: SafeResourceUrl;
  pdfDownloadFileLink!: SafeResourceUrl;
  constructor(
    private wordcloudService: WordCloudService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.wordcloudService.fetchWordCloud()
      .subscribe((data: getWordCloudResponse) => {
        this.loading = false;
        this.addData(data);
        console.log(data);
        localStorage.setItem("data", JSON.stringify(data));
      },
        (err) => {
          console.log("eror in reqest" + JSON.stringify(err))
          if (this.loading) {
            let cache: any = localStorage.getItem("data");
            if (cache != null) {
              cache = JSON.parse(cache);
              this.addData(cache);
              this.loading = false;
            }
          }
        })
  }
  transformUrl(url: string): SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  addData(data: any) {
    this.imgb64Src = this.transformUrl('data:image/jpg;base64,' + data.plot_url);
    this.imgsrc_raw = data.plot_url;
    this.pdfsrc_raw = data.plot_pdf;
    this.freq_data = data.freq_data;
    this.total_relevant_words = data.total_relevant_words;
    var imgDownloadURL = this.dataURLtoFile(`data:image/png;base64,${this.imgsrc_raw}`, 'wordcloud.png');
    console.log(imgDownloadURL);
    const imageDownloadFileLink = URL.createObjectURL(imgDownloadURL)
    console.log(imageDownloadFileLink);
    this.imgDownloadFileLink = this.transformUrl(imageDownloadFileLink);
    var pdfDownloadURL = this.dataURLtoFile(`data:application/pdf;base64,${this.pdfsrc_raw}`, 'wordcloud.pdf')
    console.log(pdfDownloadURL);
    const pdfDownloadFileLink = URL.createObjectURL(pdfDownloadURL);
    console.log(pdfDownloadFileLink);
    this.pdfDownloadFileLink = this.transformUrl(pdfDownloadFileLink);
    console.log(data);
  }
  dataURLtoFile(dataurl: string, filename: string) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/) as RegExpMatchArray,
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime[1] });
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
