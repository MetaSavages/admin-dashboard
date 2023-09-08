import useAxios from 'hooks/useAxios';

export const getEventTypes = async () => {
    const api = useAxios();
    try {
      const unformattedData = await api.get('/metrics/types');
      
      const data = unformattedData.data.map((type) => {
        return {
          ...type,
          value: type?.id ? type.id : '-',
          label: type?.name ? type.name : '-'
        };
      });

      return data;
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

export const getAllCasinos = async () => {
    const api = useAxios();
    try {
      const unformattedData = await api.get('/admin/casinos');
      
      const data = unformattedData.data.data.map((casino) => {
        return {
          ...casino,
          value: casino?.id ? casino.id : '-',
          label: casino?.name ? casino.name : '-'
        };
      });

      return data;
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

export const getAllPlayers = async (nickname) => {
    const api = useAxios();
    try {
      const unformattedData = await api.get('/user/autocomplete', {
        params: {
            search: nickname
        }
      });

      const data = unformattedData.data.data.map((user) => {
        return {
          ...user,
          value: user?.id ? user.id : '-',
          label: user?.nickname ? user.nickname : '-'
        };
      });

      return data;
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