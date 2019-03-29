import { Component, OnInit } from '@angular/core';
import { ContactinfoService } from 'src/app/services/contactinfo.service';
import { ContactDto } from 'src/app/models/contact.models';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public contactData: Array<ContactDto> = [
    new ContactDto({
      businessEntityID: 293,
      firstName: 'Catherine',
      lastName: 'Abel',
      middleName: 'R.',
      telephoneNumber: '206-555-2222',
      street: 'P.O Box 5',
      city: 'Edmonds',
      stateProvince: 'WA',
      postalCode: '98431',
      countryRegion: 'USA',
      eMailAddress: 'Joe@sample.com',
      modifiedDate: new Date('2015-04-15T16:33:33.077')
    }),
    new ContactDto({
      businessEntityID: 295,
      firstName: 'Kim',
      lastName: 'Abercrombie',
      middleName: null,
      telephoneNumber: '605-555-9877',
      street: '990 5th Avenue',
      city: 'Redmond',
      stateProvince: 'WA',
      postalCode: '98052',
      countryRegion: 'USA',
      eMailAddress: 'Customer3@sample.com',
      modifiedDate: new Date('2015-04-15T16:33:33.077')
    })
  ];
  displayedColumns: string[] = [
    'businessEntityID',
    'firstName',
    'lastName',
    'street',
    'postalCode'
  ];

  constructor(private service: ContactinfoService) {}

  private loadContacts() {
    const self = this;
    self.service.get(null).subscribe(data => {
      self.contactData = data;
    });
  }

  ngOnInit() {
    this.loadContacts();
  }
}
