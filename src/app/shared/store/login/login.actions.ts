import { createAction,props  } from "@ngrx/store";
import { LoginUser } from "src/app/models/loginUser.model";

export const loadlogin = createAction('[login page] load login',props<{loginObj:LoginUser}>());
export const loadloginsuccess = createAction('[login page] login success',props<{logincreds:LoginUser}>());