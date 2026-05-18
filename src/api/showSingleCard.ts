const showSingleCard = async (id: number) => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

    if (res.status >= 400 && res.status < 500) {
      throw new Error('The character was not found, please, try again later.');
    } else if (res.status >= 500) {
      throw new Error('The server has failed, please, try again later.');
    }

    const data = await res.json();
    if (data) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export default showSingleCard;
