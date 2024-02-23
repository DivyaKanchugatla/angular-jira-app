import { createAction, props } from "@ngrx/store";
import { Ticket } from "src/app/models/ticket.model";

export const createticket = createAction('[layout page] create ticket',props<{
    assignedTo: string;
    createdBy: string;
    createdDate: Date;
    projectName: string;
    ticketType: string;
    ticketId: number;
    summary: string;
    status: string;
    sprintReport: string;
    storyPoints: number;
    priority: string;
  }>());
export const editticket = createAction('[layout page] edit ticket',props<{tickets:Ticket[]}>())
export const getData = createAction('[Data] Set', props<{ data: any[] }>());