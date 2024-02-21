import { createAction, props } from "@ngrx/store";
import { Ticket } from "src/app/models/ticket.model";
import { Project } from "src/app/models/project.model";

export const createticket = createAction('[layout page] create ticket',props<{ticket:Ticket}>());
export const editticket = createAction('[layout page] edit ticket',props<{tickets:Ticket[]}>())

