// import { createReducer, on, Action } from "@ngrx/store";
// import { createticket, editticket} from "./layout.actions";
// import { initialLayoutState } from "./layout.state";

// const _layoutReducer = createReducer(
//   initialLayoutState,

//   on(createticket, (state, action) => {
//     const updatedState = {
//       ...state,
//       ticketsArray: [...state.ticketsArray, action.ticket],
//     };

//     // Save the updated state in local storage
//     localStorage.setItem("layoutState", JSON.stringify(updatedState));
//     const storedData = JSON.parse(localStorage.getItem("layoutState") || '{}');
//     return storedData;
//   }),
//   on(editticket,(state,action)=>{
//     const updatedState = {
//       ...state,
//       ticketsArray: state.ticketsArray.map((ticket)=>ticket.ticketId === action.ticket.ticketId ? action.ticket : ticket)
//     }
//     localStorage.setItem("layoutState", JSON.stringify(updatedState));
//     const storedData = JSON.parse(localStorage.getItem("layoutState") || '{}');
//     return storedData;
//   })
  
// );

// export function layoutReducer(state: any, action: Action) {
//   return _layoutReducer(state, action);
// }




import { createReducer, on, Action } from "@ngrx/store";
import { createticket, editticket } from "./layout.actions";
import { initialLayoutState } from "./layout.state";

const _layoutReducer = createReducer(
  initialLayoutState,

  on(createticket, (state, action) => {
    const updatedState = {
      ...state,
      ticketsArray: [...state.ticketsArray, action.ticket],
    };

    localStorage.setItem("layoutState", JSON.stringify(updatedState));
    return updatedState;
  }),

  on(editticket, (state, action) => {
    const updatedTicketsArray = state.ticketsArray.map((ticket) =>
      ticket.ticketId === action.ticket.ticketId ? action.ticket : ticket
    );

    const updatedState = {
      ...state,
      ticketsArray: updatedTicketsArray,
    };

    localStorage.setItem("layoutState", JSON.stringify(updatedState));
    return updatedState;
  })
);

export function layoutReducer(state: any, action: Action) {
  return _layoutReducer(state, action);
}





// on(gettickets, (state, action) => {
  //   const parsedtickets = JSON.parse(localStorage.getItem("layoutState") || '{"ticketsArray": []}');
  //   return {
  //     ...state,
  //     ticketsArray: parsedtickets.ticketsArray || [],
  //   };
  // }),