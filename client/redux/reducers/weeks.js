const UPDATE_WEEKS_COUNT = "UPDATE_WEEKS_COUNT";
const UPDATE_DATES = "UPDATE_DATES";

const initialState = {
  count: 0,
  averageAge: 100,
  weekInYear: 52,
  content: [],
  startDate: "",
  currentDate: "",
  endDate: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WEEKS_COUNT: {
      return {
        ...state,
        count: action.weeksCount,
        content: new Array(state.averageAge * state.weekInYear)
          .fill(0)
          .map((item, index) => {
            return index < action.weeksCount ? 1 : 0;
          }),
      };
    }
    case UPDATE_DATES: {
      return {
        ...state,
        startDate: action.start,
        currentDate: action.current,
        endDate: action.end,
      };
    }
    default:
      return state;
  }
};

export function updateWeeksCount(weeksCount) {
  return { type: UPDATE_WEEKS_COUNT, weeksCount };
}

export function updateDates(start, current, end) {
  return { type: UPDATE_DATES, start, current, end };
}
