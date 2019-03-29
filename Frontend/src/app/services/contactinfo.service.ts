import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactFilterDto, ContactDto } from '../models/contact.models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactinfoService {
  constructor(private http: HttpClient) {}

  public get(filter: ContactFilterDto): Observable<Array<ContactDto>> {
    const url = `${
      environment.backendUrl
    }/api/contactinfo${this.generateQuerystring(filter)}`;

    return this.http.get<Array<ContactDto>>(url);
  }

  private generateQuerystring(filter: ContactFilterDto): string {
    if (!filter) {
      return '';
    }
    let qs = `?page=${filter.page}`;
    if (filter.pageSize > 0) {
      qs = qs + `&pageSize=${filter.pageSize}`;
    }
    if (filter.address) {
      qs = qs + `&address=${filter.address}`;
    }
    if (filter.name) {
      qs = qs + `&name=${filter.name}`;
    }
    if (filter.sort) {
      qs = qs + `&sort=${filter.sort}`;
    }
    if (filter.dateFrom) {
      qs = qs + `&dateFrom=${filter.dateFrom}`;
    }
    if (filter.dateTo) {
      qs = qs + `&dateTo=${filter.dateTo}`;
    }
    return qs;
  }
}
