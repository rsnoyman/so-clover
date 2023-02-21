const fetcher = async (endpoint: string) => {
  const response = await fetch(endpoint);
  const json = await response.json();

  return json;
};

export default fetcher;
