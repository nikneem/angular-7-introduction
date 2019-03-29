import { Component, OnInit } from '@angular/core';
import { ContactinfoService } from 'src/app/services/contactinfo.service';
import { ContactDto, ContactFilterDto } from 'src/app/models/contact.models';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  private filter: ContactFilterDto;
  public contactData: Array<ContactDto>;
  displayedColumns: string[] = [
    'businessEntityID',
    'firstName',
    'lastName',
    'street',
    'postalCode'
  ];

  constructor(
    private service: ContactinfoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.filter = new ContactFilterDto({ pageSize: 5, page: 1 });
  }

  setNameFilter(value) {
    this.filter.name = value === '' ? undefined : value;
    this.updateParams();
    this.loadContacts();
  }

  private loadContacts() {
    const self = this;
    self.service.get(self.filter).subscribe(data => {
      self.contactData = data;
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.filter = Object.assign(this.filter, params);
      if (this.filter.page <= 1) {
        this.filter.page = 1;
      }
      if (this.filter.pageSize <= 1) {
        this.filter.pageSize = 5;
      }
    });
    this.loadContacts();
  }

  updateParams() {
    const p: Params = {
      name: this.filter.name,
      address: this.filter.address,
      dateFrom: this.filter.dateFrom,
      dateTo: this.filter.dateTo,
      sort: this.filter.sort,
      page: this.filter.page,
      pageSize: this.filter.pageSize
    };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: p,
      queryParamsHandling: 'merge' // remove to replace all query params by provided
    });
  }
}
