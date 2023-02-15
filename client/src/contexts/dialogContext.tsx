import React, { useReducer } from "react"

type ChoiceState = "signup" | "login" | "reset_password_mail" | null | "new_user"

// initial state
const initialState: ChoiceState = null

// action
export enum ChoiceActions {
  signup = "signup",
  login = "login",
  reset_password_mail = "reset_password_mail",
  close = "close",
  new_user = "new_user"
}
type Action = {
  type: ChoiceActions.signup | ChoiceActions.login | ChoiceActions.reset_password_mail | ChoiceActions.close | ChoiceActions.new_user
}
// reducer
function reducer(state: ChoiceState, action: Action) {
  let type = action.type
  switch (type) {
    case ChoiceActions.login: return type
    case ChoiceActions.signup: return type
    case ChoiceActions.reset_password_mail: return type
    case ChoiceActions.new_user: return type
    case ChoiceActions.close: return null
    default: return state
  }
}
// context
type Context = {
  choice: ChoiceState,
  setChoice: React.Dispatch<Action>
}
export const ChoiceContext = React.createContext<Context>(
  {
    choice: null,
    setChoice: () => null
  }
)
// provider
export function ChoiceProvider(props: { children: JSX.Element | JSX.Element[] }) {
  const [choice, setChoice] = useReducer(reducer, initialState)
  return (
    <ChoiceContext.Provider value={{ choice, setChoice }}>
      {props.children}
    </ChoiceContext.Provider>
  )

}
