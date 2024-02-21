import { createReducer, on, Action } from "@ngrx/store";
import { createticket, editticket } from "./layout.actions";
import { initialLayoutState } from "./layout.state";

const _layoutReducer = createReducer(
  initialLayoutState,

  on(createticket, (state, action) => {
    const updatedTicketsArray = [...state.ticketsArray, action.ticket];

    const updatedState = {
      ...state,
      ticketsArray: updatedTicketsArray,
    };

    localStorage.setItem("layoutState", JSON.stringify(updatedState));
    return updatedState;
  }),

  on(editticket, (state, action) => {
    return {
      ...state,
      ticketsArray:action.tickets
    }
  })
);

export function layoutReducer(state: any, action: Action) {
  return _layoutReducer(state, action);
}