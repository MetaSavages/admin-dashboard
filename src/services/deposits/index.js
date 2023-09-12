import useAxios from 'hooks/useAxios';

export const getDepositData = async (startDate, endDate, orderStatus, sortBy) => {
  const api = useAxios();
  try {
    const result = await api.get('/orders/deposit/filtered', {
      params: { startDate: startDate, endDate: endDate, orderStatus: orderStatus, sortBy: sortBy }
    });

    return result;
  } catch (err) {
    throw new Error(err);
  }
};
