const BASE_URL = 'https://api.tawsoft.com';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Request failed');
  }

  return response.json();
};

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return handleResponse(response);
};

export const placeOrder = async (orderData) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });

  return handleResponse(response);
};