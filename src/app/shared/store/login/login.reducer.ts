import { createReducer, on } from "@ngrx/store"
import { loginState } from "./login.state"
import { loadlogin, loadloginsuccess } from "./login.actions"

const _loginReducer = createReducer(loginState, on(loadlogin, (state, action) => {
    return {
        //     ...state,
        //   userId: action.loginObj.userId+1,
        //   emailId: action.loginObj.emailId,
        //   fullName: action.loginObj.fullName,
        //   password: action.loginObj.password
        ...action.loginObj
    }
}),
    on(loadloginsuccess, (state, action) => {
        localStorage.setItem('jiraLoginDetails', JSON.stringify(action.logincreds));
        return {
            ...action.logincreds
        }
    }),
)

export function loginReducer(state: any, action: any) {
    return _loginReducer(state, action)
}