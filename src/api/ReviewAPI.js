import HTTP from "../lib/HTTP";

export const getReviews = async (id) => {
  const res = await HTTP.get(`/products/${id}/reviews`);

  return res.data;
}

export const createReview = async ({ id, ...data }) => {
  const res = await HTTP.post(`/products/${id}/reviews`, data);

  return res.data;
}
