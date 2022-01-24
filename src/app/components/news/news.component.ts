import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models';
import { Browser } from '@capacitor/browser';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  @Input() article: Article = null;
  @Input() indice = 0;

  constructor(private platform: Platform) {}

  ngOnInit() {}

  openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      Browser.open({ url: this.article.url });
    } else {
      // this line only work in web browsers
      window.open(this.article.url, '_blank');
    }
  }
}
