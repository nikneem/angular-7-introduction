import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameFilterComponent } from './name-filter/name-filter.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NameFilterComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [NameFilterComponent]
})
export class FiltersModule {}
