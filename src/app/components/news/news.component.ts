import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  @Input() article: Article = null;
  @Input() indice = 0;

  constructor() {}

  ngOnInit() {}

  openArticle() {
    // this line only work in web browsers
    window.open(this.article.url, '_blank');
  }
}
