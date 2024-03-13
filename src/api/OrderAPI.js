import HTTP from "../lib/HTTP";

export const getOneOrder = async (id) => {
  const res = await HTTP.get(`/orders/${id}`);

  return res.data;
}

export const getOrderStatistics = async () => {
  const res = await HTTP.get(`/orders/statistics`);

  return res.data;
}

export const getOrders = async () => {
  const res = await HTTP.get(`/orders`);

  return res.data;
}

export const createOrder = async ({ ...data }) => {
  const res = await HTTP.post(`/orders`, data);;

  return res;
}

export const updateOrder = async (data) => {
  const res = await HTTP.patch(`/orders/${data.id}`, data.data);

  return res.data;
}