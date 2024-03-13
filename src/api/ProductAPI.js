import HTTP from "../lib/HTTP"

export const getProducts = async () => {
  const res = await HTTP.get(`/products`);

  return res.data;
}

export const getOneProduct = async (data) => {
  const res = await HTTP.get(`/products/${data}`);

  return res.data;
}

export const createProduct = async (data) => {
  const res = await HTTP.post('/products', data.formData, { headers: { "Content-Type": "multipart/form-data" } });

  return res.data;
}

export const updateProduct = async (data) => {
  const res = await HTTP.patch(`/products/${data.id}`, data.formData, { headers: { "Content-Type": "multipart/form-data" } });

  return res.data;
}

export const removeProduct = async (id) => {
  const res = await HTTP.delete(`/products/${id}`);
  
  return res.data;
}
