const LOADING = "detail/LOADING";
const SUCCESS = "detail/SUCCESS";
const ERROR = "detail/ERROR";

export const onLoading = () => ({ type: LOADING });
export const getData = (data) => ({ type: SUCCESS, data });
export const onError = (error) => ({ type: ERROR, error });

const INITIAL_STATE = {
  loading: false,
  error: null,
  result: {
    backdrop_path: "",
    id: "",
    title: "",
    tagline: "",
    poster_path: "",
    overview: "",
    runtime: "",
    vote_average: "",
    gens: [],
    casts: [
      {
        name: "",
        character: "",
        profile_path: "",
      },
    ],
    similars: [
      {
        title: "",
        poster_path: "",
      },
    ],
    videos: [
      {
        key: "",
        thumbnail: "",
      },
    ],
  },
};

export default function list(state = INITIAL_STATE, action) {
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
        result: action.data,
        error: null,
      };
    case ERROR:
      return {
        loading: false,
        result: null,
        error: action.e,
      };
    default:
      return state;
  }
}
