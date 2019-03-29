import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FiltersModule } from './filters/filters.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, FiltersModule],
  exports: [MaterialModule, FiltersModule]
})
export class SharedModule {}
