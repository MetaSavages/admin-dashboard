import useAxios from 'hooks/useAxios';

export const getBaccaratTable = async (tableId) => {
  try {
    const api = useAxios();

    const res = await api.get(`baccarat/${tableId}`, {});

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const updateBaccaratTable = async (table) => {
  const api = useAxios();
  try {
    const unformattedData = await api.patch(`/baccarat/update`, table);
    return unformattedData.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
