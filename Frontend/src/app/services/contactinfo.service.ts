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
    let splitCharacter = '?';
    let qs = '';
    if (!filter) {
      return '';
    }
    if (filter.page) {
      qs = qs + `${splitCharacter}page=${filter.page}`;
      splitCharacter = '&';
    }
    if (filter.pageSize > 0) {
      qs = qs + `${splitCharacter}pageSize=${filter.pageSize}`;
      splitCharacter = '&';
    }
    if (filter.address) {
      qs = qs + `${splitCharacter}address=${filter.address}`;
      splitCharacter = '&';
    }
    if (filter.name) {
      qs = qs + `${splitCharacter}name=${filter.name}`;
      splitCharacter = '&';
    }
    if (filter.sort) {
      qs = qs + `${splitCharacter}sort=${filter.sort}`;
      splitCharacter = '&';
    }
    if (filter.dateFrom && filter.dateFrom instanceof Date) {
      qs = qs + `${splitCharacter}dateFrom=${filter.dateFrom.toISOString()}`;
      splitCharacter = '&';
    }
    if (filter.dateTo) {
      qs = qs + `${splitCharacter}dateTo=${filter.dateTo.toISOString()}`;
      splitCharacter = '&';
    }
    return qs;
  }
}
