import { Category } from './category.model';
import { Location } from './location.model';
import { User } from './user.model';

export interface Event {
  _id?: string;
  id: string;
  event_name: string;
  date: Date;
  location: Location;
  description: string;
  organizer: User;
  category: Category;
  maxNumberOfTickets: number;
  ticketPrice: number;
}
