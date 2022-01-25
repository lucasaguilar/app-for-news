import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models';
import { Browser } from '@capacitor/browser';
import { ActionSheetController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  @Input() article: Article = null;
  @Input() indice = 0;

  constructor(
    private platform: Platform,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {}

  openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      Browser.open({ url: this.article.url });
    } else {
      // this line only work in web browsers
      window.open(this.article.url, '_blank');
    }
  }

  async onOpenMenu() {
    const action = await this.actionSheetController.create({
      header: 'Options',
      buttons: [
        {
          text: 'Share',
          icon: 'share-outline',
          handler: () => {
            this.sharedArticle();
          },
        },
        {
          text: 'Add to favorites',
          icon: 'heart-outline',
          handler: () => {
            this.addToFavorites();
          },
        },
        {
          text: 'Cancel',
          icon: 'exit-outline',
          handler: () => {
            this.cancel();
          },
        },
      ],
    });

    await action.present();
  }

  sharedArticle() {
    console.log('article to by shared...');
  }

  addToFavorites() {
    console.log('addToFavorites...');
  }

  cancel() {
    console.log('cancel...');
  }
}
