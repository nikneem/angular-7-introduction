export class ContactDto {
  public businessEntityID: number;
  public firstName: string;
  public lastName: string;
  public middleName: string;
  public telephoneNumber: string;
  public street: string;
  public city: string;
  public stateProvince: string;
  public postalCode: string;
  public countryRegion: string;
  public eMailAddress: string;
  public modifiedDate: Date;

  constructor(init?: Partial<ContactDto>) {
    Object.assign(this, init);
  }
}

export class ContactFilterDto {
  public sort: string;
  public page: number;
  public pageSize: number;
  public name: string;
  public address: string;
  public dateFrom: Date;
  public dateTo: Date;

  constructor(init?: Partial<ContactFilterDto>) {
    Object.assign(this, init);
  }
}

export class DateRangeDto {
  public from?: Date;
  public to?: Date;

  constructor(init?: Partial<DateRangeDto>) {
    Object.assign(this, init);
  }
}
