const UPDATE_DATE = "UPDATE_DATE";

const initialState = {
  averageAge: 100,
  weekInYear: 52,
  width: 300,
  height: 400,
  birthday: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DATE: {
      return {
        ...state,
        birthday: action.date,
      };
    }
    default:
      return state;
  }
};

export function updateDate(date) {
  return { type: UPDATE_DATE, date };
}
