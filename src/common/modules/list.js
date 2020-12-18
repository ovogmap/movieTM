const LOADING = "list/LOADING";
const SUCCESS = "list/SUCCESS";
const ERROR = "list/ERROR";

export const onLoading = () => ({ type: LOADING });
export const getData = (data) => ({ type: SUCCESS, data });
export const onError = (error) => ({ type: ERROR, error });

const INITIAL_STATE = {
  loading: null,
  erorr: null,
  result: {
    upcoming: [],
    popular: [],
    topRateds: [],
  },
};

export default function home(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOADING:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case SUCCESS:
      return {
        loading: false,
        result: {
          upcoming: action.data.upcoming,
          popular: action.data.popular,
          topRateds: action.data.topRateds,
        },
        error: null,
      };
    case ERROR:
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}
