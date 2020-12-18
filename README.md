
# Movie App with TMDB open API & React

<br>

## 긴급

<br>

>  아이폰 flexbox 이슈 대응중에 있습니다. <br>아이폰으로 접속시 flex박스 깨짐현상이 있습니다.

<br>
<br>

## 소개글

<br>

> TMDB에서 제공하는 open API와 React를 사용해 제작한 영화 소개및 검색 웹앱입니다. 반응형으로 구현하였고 상태관리는 Redux를 사용하였습니다, 좋아요 리스트는 로컬스토리지를 사용해 구현하였습니다.

<br>
<br>


## 제작기간

<br>

> 2020.12.11 ~ 2020.12.19 <br>참여인원 1명

<br>
<br>


## 사용한 기술스택

<br>

> redux를 사용한 상태관리 <br> styled-components기반 Css-in-Js 스타일링 <br> TMDB 오픈API를 사용한 데이터및 요청관리 <br> React-router-dom을 사용한 라우팅

<br>
<br>


## 페이지별 기능

<br>

> 총 5개의 페이지로 제작되었습니다.

<br>
<br>

### 메인페이지

- 화면이 refresh될때마다 랜덤으로 영화를 소개해줍니다.

```
async function introApi() {
let result = await axios
  .get(
    `${BASE_URL}trending/movie/week?api_key=${API_KEY}&language=${LANGUAGE}`
  )
  .then((response) => response);
result = result.data.results;
let id = result[Math.floor(Math.random() * result.length)].id;

const response = await fetchData(`${id}`);
const introMovie = response.data;
let randomMivie = {
  backdropPath: `${IMG_PATH}${introMovie.backdrop_path}`,
  title: introMovie.title,
  tagline: introMovie.tagline,
  id: introMovie.id,
  poster_path: `${IMG_PATH}${introMovie.poster_path}`,
};

return randomMivie;
}
```

우선 영화리스트를 요청하고 Math.random함수를 사용해 랜덤값을 인덱스에 넣어줘 영화를 선정합니다.
랜덤 선정된 영화의 id값을 사용해 detail api를 요청합니다. response에서 필요한 값만 객체로 만들어
리턴하여 메인페이지에서 사용합니다.

<br>
<br>

### 디테일페이지

- 메인 페이지에서 보러가기를 누르거나 영화리스트 페이지에서 영화를 클릭하여 디테일페이지로 이동할 수 있습니다.

```
 function getDetailMovie() {
   //... 영화가져오는 로직
 }
 function getVideos() {
   //... 예고편 가져오는 로직
 }
 //...나머지 동일

export default async function detailApi(id) {
 const movieDetails = await getDetailMovie(id);
 const movieVideos = await getVideos(id);
 const movieCasts = await getCasts(id);
 const movieSimilars = await getSimilars(id);

 const movie = {};
 Object.assign(movie, movieDetails);
 movie.casts = movieCasts;
 movie.videos = movieVideos;
 movie.similars = movieSimilars;
 movie.id = id;

 return movie;
}
```

디테일 페이지에서 필요로 하는 데이터는 한번의 요청으로 가져올수 없었습니다.
예고편, 출연자, 비슷한 영화등의 데이터는 각각의 API요청 URI를 가지고 있어
`detilApi()` 함수를 호출하면 비동기적으로 각각의 데이터를 요청하게 작성하고
하나의 객체로 가공하여 `return`할 수 있도록 했습니다.
비슷한 영화는 `Router`의 `Link`태그를 사용해 클릭시 선택한 영화의 디테일페이지로
이동할 수 있도록 하였습니다.

<br>

```
// 초기값은 null로 넣어주었습니다.
const [isLike, setIsLike] = useState(null);

// 디테일페이지가 렌더링되면 로컬스토리지에 id값이 있는지 비교후 isLike값을   // 변경시켜줍니다.
useEffect(() => {
    setIsLike(localStorage.getItem(id) !== null);
  }, [id]);

// 하트를 누르면 좋아요와 취소를 할 수 있는 토글기능을 작성한 함수 입니다.
const onLikeToggle = () => {
  const newLike = localStorage.getItem(id) === null;
  if (newLike) {
    localStorage.setItem(
      result.id,
      JSON.stringify({
        id: result.id,
        title: result.title,
        poster_path: result.poster_path,
      })
    );
  } else {
    localStorage.removeItem(id);
  }
  setIsLike(newLike);
};
```

<br>
<br>

### 영화리스트

- 영화리스트 페이지에서는 카테고리별 리스트를 요청하고 정열해주었습니다.

```
const fetchListData = async (func) => {
  const res = await fetchData(func);
  console.log(func, res);
  const result = res.data.results.splice(0, 4);
  return result;
};

export default async function listApi() {
  const upcoming = await fetchListData("upcoming");
  const popular = await fetchListData("popular");
  const topRateds = await fetchListData("top_rated");

  let list = {};
  list.upcoming = upcoming;
  list.popular = popular;
  list.topRateds = topRateds;
  return list;
}
```

동일한 작업을하는 함수를 작성하고 파라미터의 값으로 Api path값을 넣어줘 각각의 데이터를 요청하고 리스폰스를 받을 수 있었습니다. 마찬가지로 하나의 객체로 가공하여 `return`하도록 하였습니다.

<br>
<br>

### 좋아요리스트 페이지

- 로컬스토리지를 사용해 유저가 좋아요를 누른영화를 저장해두고 좋아요리스트 페이지로
  진입할때 `useEffect`를 사용해 로컬스토리지에 저장된 좋아요리스트를 불러오고 화면에 보여지도록 하였씁니다.

```
// for..of..문을 사용해 로컬스토리지에 저장된 key값이 정숫값일 경우 배열에   // 담아주는 함수 입니다.
const getAllLikes = () => {
  const likes = [];
  for (const [key, value] of Object.entries(localStorage)) {
    if (!Number.isSafeInteger(Number(key))) continue;
    likes.push(JSON.parse(value));
  }
  return likes;
};

const [isLikes, setIsLikes] = useState([]);
// 페이지가 렌더링될때 반환된 값을 state에 담아줍니다.
useEffect(() => {
    setIsLikes(getAllLikes());
  }, []);

// 좋아요 취소를 눌렀을때 로컬스토리지에서 제거후 state값을 변경해주는 로직.
const onDelete = (e) => {
    const { id } = e.target.dataset;
    localStorage.removeItem(id);
    setIsLikes(getAllLikes());
  };

```

로컬스토리지의 값을 빈배열에 push해줘 반환하도록 하고 반환된 배열을 state에 담아주었습니다.

<br>
<br>

### 검색페이지

- TMDB에서 제공하는 serach api를 사용하여 검색기능을 구현하였습니다.

```
const [onSearch, setOnSearch] = useState("");
const [getQuery, setGetQuery] = useState(null);

// input의 value를 Query로 받아 api를 요청하고 state에 respose값을 담아주었습니다.
const serachRun = async () => {
    const movie = onSearch;
    const response = await getSearchMovie(movie);
    setGetQuery(response.data?.results);
  };

```

검색요청후 `response`를 받아 `map`함수를 이용해 화면에 결과리스트를 보여주었습니다.
