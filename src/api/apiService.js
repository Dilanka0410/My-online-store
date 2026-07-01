const BASE_URL = 'https://api.tawsoft.com';

const handleResponse = async (response) => {
  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }

  if (!response.ok) {
    const err = (data && data.message) || response.statusText || 'Request failed';
    const error = new Error(err);
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return { status: response.status, data };
};

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  const result = await handleResponse(response);
  return result.data;
};

export const placeOrder = async (orderData) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });

  return handleResponse(response);
};

export const fetchOrders = async () => {
  const response = await fetch(`${BASE_URL}/orders`);
  const result = await handleResponse(response);
  return result.data;
};