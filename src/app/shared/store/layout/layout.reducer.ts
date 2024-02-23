import { createReducer, on, Action } from "@ngrx/store";
import { createticket, editticket,getData } from "./layout.actions";
import { AppState } from "./layout.state";

const stored = JSON.parse(localStorage.getItem('layoutState') || '[]') || [];
export const initialLayoutState: AppState = {
  ticketsArray: stored
}

const _layoutReducer = createReducer(
  initialLayoutState,

  on(createticket, (state, {projectName,assignedTo,priority,storyPoints,sprintReport,status,summary,ticketId,ticketType,createdDate,createdBy}) => {
    const updatedTicketsArray = {
      ...state,
      ticketsArray:[...state.ticketsArray,{projectName,assignedTo,priority,storyPoints,sprintReport,status,summary,ticketId,ticketType,createdDate,createdBy}]
    }
  
    // Update localStorage with the updated array
    localStorage.setItem("layoutState", JSON.stringify(updatedTicketsArray.ticketsArray));
  
    // Return the updated state with the new ticket appended
    return {...state,ticketsArray:updatedTicketsArray.ticketsArray}
  }),
  

  on(getData, (state, { data }) => {
    return { ...state, ticketsArray: data };
  }),


  
  on(editticket, (state, action) => {
    localStorage.setItem("layoutState",JSON.stringify(action.tickets))
    return {
      ...state,
      ticketsArray:action.tickets
    }
  }),
);

export function layoutReducer(state: any, action: Action) {
  return _layoutReducer(state, action);
}