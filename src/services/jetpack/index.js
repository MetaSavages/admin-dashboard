import useAxios from 'hooks/useAxios';

export const getJetpackTable = async (tableId) => {
  try {
    const api = useAxios();

    const res = await api.get(`jetpack/${tableId}`, {});

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const updateJetpackTable = async (table) => {
  const api = useAxios();
  try {
    const unformattedData = await api.patch(`/jetpack/update`, table);
    return unformattedData.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
