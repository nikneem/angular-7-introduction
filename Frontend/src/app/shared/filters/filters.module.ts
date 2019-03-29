import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameFilterComponent } from './name-filter/name-filter.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { AddressFilterComponent } from './address-filter/address-filter.component';
import { DaterangeFilterComponent } from './daterange-filter/daterange-filter.component';

@NgModule({
  declarations: [
    NameFilterComponent,
    FilterBarComponent,
    AddressFilterComponent,
    DaterangeFilterComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [FilterBarComponent]
})
export class FiltersModule {}
