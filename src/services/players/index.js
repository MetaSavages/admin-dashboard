import useAxios from 'hooks/useAxios';

export const getPlayers = async (limit = 20, page = 1, filters = '') => {
  const api = useAxios();
  try {
    const params = {
      limit: limit, 
      page: page,     
      sortBy: 'createdAt:DESC',
    }
    
    if(Object.keys(filters).length) {
      if(filters.users.length){
        params['id'] = `${(filters.users.map((u) => u.id)).toString()}`
      }
      if(filters?.isDemo != null){
        params['isDemo'] = filters.isDemo;
      }
    }

    const unformattedData = await api.get('/admin/metrics/players', {
      params: params
    });

    return {
      data: unformattedData.data.items.map((x) => {
        return {
          id: x.u_id,
          nickname: x.u_nickname,
          time_spent: x.time_spent,
          current_balance: x.current_balance,
          starting_balance: x.starting_balance,
          money_spent: x.money_spent,
          money_cashed_out: x.money_cashed_out,
          wallet: x.u_walletId,
          location: x.u_lastLocation,
          kyc_status: x.u_kycState,
          isDemo: x.u_isDemo
        };
      }),
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

export const getPlayerAggregated = async (id) => {
  const api = useAxios();
  try {
    const res = await api.get(`/admin/metrics/players/${id}`);
    return res.data.map((x) => {
      return {
        nickname: x.casino_name,
        time_spent: x.time_spent,
        current_balance: x.current_balance,
        starting_balance: x.starting_balance,
        money_spent: x.money_spent,
        money_cashed_out: x.money_cashed_out
      };
    });
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

export const getPlayer = async (id) => {
  const api = useAxios();
  try {
    const res = await api.get(`/admin/metrics/players/?id=${id}`);
    return res.data.items[0];
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

export const deletePlayer = async (id) => {
  const api = useAxios();
  try {
    const response = await api.delete('admin/users', {
      data: { userId: id },
    });
    if (response.status === 200) {
      console.log(`User with ID ${id} deleted successfully.`);
      alert(`User with ID ${id} deleted successfully.`);
    } else {
      console.error(`Error deleting user: Unexpected status code ${response.status}`);
      alert(`Error deleting user: Unexpected status code ${response.status}`);
    }
  } catch (err) {
    console.error(`Error deleting user:`, err);
    alert(`Error deleting user: ${err.message}`);
  }
};

export const updatePlayerName = async (id, name) => {
  const api = useAxios();
  try {
    const response = await api.post('admin/users/update-nickname', {
      userId:id, nickname: name 
    });
    if (response.status === 201) {
      console.log(`User with ID ${id} deleted successfully.`);
      alert(`Player has new name now: ${name}` );
    } else {
      console.error(`Error updating user: Unexpected status code ${response.status}`);
      alert(`Error updating user: Unexpected status code ${response.status}`);
    }
  } catch (err) {
    console.error(`Error updating user:`, err);
    alert(`Error updating user: ${err.message}`);
  }
};





