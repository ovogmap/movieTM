import fetchData from "../util/fetchData";

const fetchListData = async (func) => {
  const res = await fetchData(func);
  const num = Math.floor(Math.random() * (res.data.results.length / 2));
  const result = res.data.results.splice(num, 4);
  return result;
};

export default async function listApi() {
  const upcoming = await fetchListData("upcoming");
  const popular = await fetchListData("popular");
  const topRateds = await fetchListData("top_rated");
  const nowplaying = await fetchListData("now_playing");

  let list = {};
  list.upcoming = upcoming;
  list.popular = popular;
  list.topRateds = topRateds;
  list.nowplaying = nowplaying;
  return list;
}
