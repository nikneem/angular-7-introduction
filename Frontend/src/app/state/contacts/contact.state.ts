import { ContactDto, ContactFilterDto } from 'src/app/models/contact.models';

export interface ContactState {
  errorMessage: string;
  isLoading: boolean;
  listItems: Array<ContactDto>;
  filter: ContactFilterDto;
}

export const INITIAL_CONTACT_STATE: ContactState = {
  errorMessage: null,
  isLoading: false,
  listItems: null,
  filter: null
};
