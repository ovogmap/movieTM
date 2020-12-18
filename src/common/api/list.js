import fetchData from "../util/fetchData";

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
