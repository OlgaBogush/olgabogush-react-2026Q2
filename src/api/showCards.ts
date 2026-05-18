const showCards = async (page: number | '') => {
  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );

    if (res.status >= 400 && res.status < 500) {
      throw new Error(
        'Something went wrong. No data was found, please, try again later.'
      );
    } else if (res.status >= 500) {
      throw new Error('The server has failed, please, try again later.');
    }

    const data = await res.json();

    if (data?.results) {
      return data.results;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default showCards;
