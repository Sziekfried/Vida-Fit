import {ID_GERENTE, TOKEN_GERENTE} from '../types'

export default (state, action) =>{
  const {payload, type} = action;
  switch(type){
    case TOKEN_GERENTE:
      return {
        ...state,
        token: payload
      }
    case ID_GERENTE:
      return {
       ...state,
        id: payload
      }
      default:
        return state;
    }
}

