export const getCurrentPage = (page: number) => {
  return isNaN(page) || page < 1 ? 1 : page;
};
