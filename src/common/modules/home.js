const LOADING = "home/LOADING";
const SUCCESS = "home/SUCCESS";
const ERROR = "home/ERROR";

export const onLoading = () => ({ type: LOADING });
export const getData = (data) => ({ type: SUCCESS, data });
export const onError = (error) => ({ type: ERROR, error });

const INITIAL_STATE = {
  loading: null,
  erorr: null,
  result: {
    backdropPath: "",
    id: "",
    tagline: "",
    title: "",
    poster_path: "",
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
          backdropPath: action.data.backdropPath,
          id: action.data.id,
          tagline: action.data.tagline,
          title: action.data.title,
          poster_path: action.data.poster_path,
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
