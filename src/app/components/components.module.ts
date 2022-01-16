import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListNewsComponent } from './list-news/list-news.component';
import { NewsComponent } from './news/news.component';



@NgModule({
  declarations: [ListNewsComponent, NewsComponent],
  imports: [CommonModule, IonicModule],
  exports: [ListNewsComponent],
})
export class ComponentsModule {}
