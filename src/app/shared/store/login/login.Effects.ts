import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadlogin, loadloginsuccess } from "./login.actions";
import { EMPTY, catchError, exhaustMap, map } from "rxjs";
import { TicketsService } from "src/app/services/tickets.service";

@Injectable()
export class loginEffects {
  constructor(private action$: Actions, private ticketService: TicketsService) {}

  _login = createEffect(() =>
    this.action$.pipe(
      ofType(loadlogin),
      exhaustMap((action) =>
        this.ticketService.getLoginCreds().pipe(
          map((data) => loadloginsuccess({ logincreds: data })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
