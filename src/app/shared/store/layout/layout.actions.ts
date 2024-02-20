import { createAction, props } from "@ngrx/store";
import { Ticket } from "src/app/models/ticket.model";
import { Project } from "src/app/models/project.model";

export const createticket = createAction('[layout page] create ticket',props<{ticket:Ticket}>());
export const editticket = createAction('[layout page] edit ticket',props<{ticket:Ticket}>())

// export const moveTicket = createAction(
//     '[layout page] move ticket',
//     props<{ ticket: Ticket; newIndex: number }>()
//   );
// export const handleTicket = createAction('[Ticket] Handle Ticket', props<{ ticket: Ticket}>());
// export const projectBasedTickets = createAction('[Ticket] Project Based Tickets', props<{ project?: Project }>());
// export const updateLocalStorage = createAction('[Ticket] Update Local Storage', props<{ tickets: Ticket[] }>());
