import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.scss'],
})
export class ListNewsComponent implements OnInit {
  @Input() articles: Article[] = [];

  constructor() {}

  ngOnInit() {}
}
