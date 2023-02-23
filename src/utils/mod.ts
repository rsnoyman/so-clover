const mod = (n: number, m: number) => {
  const r = n % m;
  return r < 0 ? r + m : r;
};

export default mod;
