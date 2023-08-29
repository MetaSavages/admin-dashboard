import useAxios from 'hooks/useAxios';

export const getSuccesfulWithdraws = async () => {
    const api = useAxios();
    try {
      const unformattedData = await api.get('/coins-paid/withdraws-success');

      const data = unformattedData.data.data.map((withdraw) => {
        return {
          ...withdraw,
          username: withdraw?.username ? withdraw.username : '-',
          amount: withdraw?.amount ? withdraw.amount : '-',
          casino: withdraw?.casino ? withdraw.casino : '-',
          date: withdraw?.date ? withdraw.date : '-',
        };
      });
  
      return {
        data: data,
        meta: unformattedData.data.meta
      };
    } catch (err) {
      console.log(err);
      return {
        data: [],
        meta: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: 0,
          totalPages: 0,
          currentPage: 0
        }
      };
    }
};

export const getPendingWithdraws = async () => {
    const api = useAxios();
    try {
      const unformattedData = await api.get('/coins-paid/withdraws-pending');

      const data = unformattedData.data.data.map((withdraw) => {
        return {
          ...withdraw,
          username: withdraw?.username ? withdraw.username : '-',
          amount: withdraw?.amount ? withdraw.amount : '-',
          casino: withdraw?.casino ? withdraw.casino : '-',
          date: withdraw?.date ? withdraw.date : '-',
        };
      });
  
      return {
        data: data,
        meta: unformattedData.data.meta
      };
    } catch (err) {
      console.log(err);
      return {
        data: [],
        meta: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: 0,
          totalPages: 0,
          currentPage: 0
        }
      };
    }
};

export const getFailedWithdraws = async () => {
    const api = useAxios();
    try {
      const unformattedData = await api.get('/coins-paid/withdraws-failed');

      const data = unformattedData.data.data.map((withdraw) => {
        return {
          ...withdraw,
          username: withdraw?.username ? withdraw.username : '-',
          amount: withdraw?.amount ? withdraw.amount : '-',
          casino: withdraw?.casino ? withdraw.casino : '-',
          date: withdraw?.date ? withdraw.date : '-',
          reason: withdraw?.reason ? withdraw.reason : '-',
        };
      });
  
      return {
        data: data,
        meta: unformattedData.data.meta
      };
    } catch (err) {
      console.log(err);
      return {
        data: [],
        meta: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: 0,
          totalPages: 0,
          currentPage: 0
        }
      };
    }
};