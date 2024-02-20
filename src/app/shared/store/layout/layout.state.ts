import { Ticket } from "src/app/models/ticket.model";

export interface AppState {
  ticketsArray: Ticket[];
}

export const initialLayoutState: AppState = {
  ticketsArray: []
}