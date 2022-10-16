const ordernate = (a: any, b: any, order: 'asc' | 'desc') => {
  if (order === 'desc') {
    if (a < b) return 1;
    if (a > b) return -1;
  } else {
    if (a < b) return -1;
    if (a > b) return 1;
  }

  return 0;
};

export default ordernate;
