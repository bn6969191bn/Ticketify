import { Ticket } from './ticket.model';
import { User } from './user.model';

export interface Purchase {
  ticket: Ticket;
  user: User;
  purchase_date: Date;
  total_price: number;
  id: string;
}
