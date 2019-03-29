import { Component, OnInit } from '@angular/core';
import { ContactinfoService } from 'src/app/services/contactinfo.service';
import { ContactDto } from 'src/app/models/contact.models';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public contactData: Array<ContactDto>;
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
