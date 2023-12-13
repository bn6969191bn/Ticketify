export interface Event {
  _id?: string;
  event_name: string;
  date_and_time: Date;
  location: string;
  description: string;
  organizer: string;
  category: string;
}
