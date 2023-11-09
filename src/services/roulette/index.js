import useAxios from 'hooks/useAxios';

export const getRouletteTable = async (tableId) => {
  try {
    const api = useAxios();

    const res = await api.get(`roulette/${tableId}`, {});

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const updateRouletteTable = async (table) => {
  const api = useAxios();
  try {
    const unformattedData = await api.patch(`/roulette/update`, table);
    return unformattedData.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
