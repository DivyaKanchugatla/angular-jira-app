// import { Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { createticket, createticketsuccess } from "./layout.actions";
// import { TicketsService } from "src/app/services/tickets.service";
// import { catchError, exhaustMap, map, switchMap } from "rxjs/operators";
// import { of } from "rxjs"; // Import 'of' from RxJS
// import { EMPTY } from "rxjs";
// import { pipe } from "rxjs";
// import { Pipe } from "@angular/core";

// @Injectable()
// export class loginEffects {
//   constructor(private action$: Actions, private ticketService: TicketsService) {}

//   _login = createEffect(() =>
//     this.action$.pipe(
//       ofType(createticket),
//       exhaustMap((action) =>
//         this.ticketService.handleTickets(action.ticket)
//           .pipe(
//             switchMap(() => of(createticketsuccess({ ticket: action.ticket }))), // Emit a new action after handleTickets
//             catchError(() => EMPTY)
//           )
//       )
//     )
//   );
// }
