import useAxios from 'hooks/useAxios';

export const getSuccesfulDeposits = async () => {
    const api = useAxios();
    try {
      const unformattedData = await api.get('/coins-paid/deposits-success');

      const data = unformattedData.data.data.map((deposit) => {
        return {
          ...deposit,
          username: deposit?.username ? deposit.username : '-',
          amount: deposit?.amount ? deposit.amount : '-',
          casino: deposit?.casino ? deposit.casino : '-',
          date: deposit?.date ? deposit.date : '-',
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

export const getPendingDeposits = async () => {
    const api = useAxios();
    try {
      const unformattedData = await api.get('/coins-paid/deposits-pending');

      const data = unformattedData.data.data.map((deposit) => {
        return {
          ...deposit,
          username: deposit?.username ? deposit.username : '-',
          amount: deposit?.amount ? deposit.amount : '-',
          casino: deposit?.casino ? deposit.casino : '-',
          date: deposit?.date ? deposit.date : '-',
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

export const getFailedDeposits = async () => {
    const api = useAxios();
    try {
      const unformattedData = await api.get('/coins-paid/deposits-failed');

      const data = unformattedData.data.data.map((deposit) => {
        return {
          ...deposit,
          username: deposit?.username ? deposit.username : '-',
          amount: deposit?.amount ? deposit.amount : '-',
          casino: deposit?.casino ? deposit.casino : '-',
          date: deposit?.date ? deposit.date : '-',
          reason: deposit?.reason ? deposit.reason : '-',
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