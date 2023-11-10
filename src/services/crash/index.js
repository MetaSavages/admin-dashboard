import useAxios from 'hooks/useAxios';

export const getCrashTable = async (tableId) => {
  try {
    const api = useAxios();

    const res = await api.get(`crash/${tableId}`, {});

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const updateCrashTable = async (table) => {
  const api = useAxios();
  try {
    const unformattedData = await api.patch(`/crash/update`, table);
    return unformattedData.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
