const UPDATE_WEEKS_COUNT = 'UPDATE_WEEKS_COUNT'

const initialState = {
  count: 0,
  averageAge: 100,
  weekInYear: 52,
  content: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WEEKS_COUNT: {
      return {
        ...state,
        count: action.weeksCount,
        content: new Array(state.averageAge * state.weekInYear).fill(0).map((item, index) => {
          return index < action.weeksCount ? 1 : 0
        })
      }
    }
    default:
      return state
  }
}

export function updateWeeksCount(weeksCount) {
  return { type: UPDATE_WEEKS_COUNT, weeksCount }
}
