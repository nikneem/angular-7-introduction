import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, SharedModule]
})
export class HomeModule {}
