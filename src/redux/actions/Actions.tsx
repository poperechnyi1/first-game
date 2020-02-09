/*
 * action types
 */
export const GENERATE_FIELD = "GENERATE_FIELD";
export const SET_FOUNDATION = "SET_FOUNDATION"


export function setFoundation(number:string) {
  return { type: SET_FOUNDATION, number };
}


