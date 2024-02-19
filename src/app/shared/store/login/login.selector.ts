import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginUser } from "src/app/models/loginUser.model";

export const getLoginCreds = createFeatureSelector<LoginUser>('login');

