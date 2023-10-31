import useAxios from 'hooks/useAxios';

export const getGameTables = async (game, casinoId) => {
  try {
    const api = useAxios();

    const res = await api.get(`admin/metrics/table-metrics`, {
      params: {
        limit: 20,
        sortBy: 'createdAt:DESC',
        game: game,
        casinoId: casinoId
      }
    });

    const data = {
      bets: res.data.game_bets ? res.data.game_bets : '0',
      bet_amounts: res.data.game_bet_amounts ? res.data.game_bet_amounts : '0',
      bets: res.data.game_bets ? res.data.game_bets : '0',
      bet_amounts: res.data.game_bet_amounts ? res.data.game_bet_amounts : '0',
      wins: res.data.game_wins ? res.data.game_wins : '0',
      win_amounts: res.data.game_win_amounts ? res.data.game_win_amounts : '0',
      loses: res.data.game_loses ? res.data.game_loses : '0',
      lose_amounts: res.data.game_lose_amounts ? res.data.game_lose_amounts : '0',
      sessions_started: res.data.sessions_started ? res.data.sessions_started : '0',
      sessions_ended: res.data.sessions_ended ? res.data.sessions_ended : '0'
    };

    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getBlackjackTables = async () => {
  const api = useAxios();
  let casinoId = window.location.pathname.split('/').pop();
  try {
    const unformattedData = await api.get('admin/metrics/table-metrics-by-table', {
      params: {
        limit: 20,
        page: 1,
        sortBy: 'createdAt:DESC',
        game: 'blackjack',
        casinoId: casinoId
      }
    });
    
    const data = unformattedData.data.items.map((game) => {
      return {
        id: game.game_id ? game.game_id : '0',
        min_bet: game.min_bet ? game.min_bet : '0',
        max_bet: game.max_bet ? game.max_bet : '0',
        bet_amounts: game.game_bet_amounts ? game.game_bet_amounts : '0',
        win_amounts: game.game_win_amounts ? game.game_win_amounts : '0',
        lose_amounts: game.game_lose_amounts ? game.game_lose_amounts : '0',
        sessions_started: game.sessions_started ? game.sessions_started : '0',
        sessions_ended: game.sessions_ended ? game.sessions_ended : '0'
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

export const getBaccaratTables = async () => {
  const api = useAxios();
  let casinoId = window.location.pathname.split('/').pop();
  try {
    const unformattedData = await api.get('admin/metrics/table-metrics-by-table', {
      params: {
        limit: 20,
        page: 1,
        sortBy: 'createdAt:DESC',
        game: 'baccarat',
        casinoId: casinoId
      }
    });

    const data = unformattedData.data.items.map((game) => {
      return {
        id: game.game_id ? game.game_id : '0',
        min_bet: game.min_bet ? game.min_bet : '0',
        max_bet: game.max_bet ? game.max_bet : '0',
        bet_amounts: game.game_bet_amounts ? game.game_bet_amounts : '0',
        win_amounts: game.game_win_amounts ? game.game_win_amounts : '0',
        lose_amounts: game.game_lose_amounts ? game.game_lose_amounts : '0',
        sessions_started: game.sessions_started ? game.sessions_started : '0',
        sessions_ended: game.sessions_ended ? game.sessions_ended : '0'
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

export const getRouletteTables = async () => {
  const api = useAxios();
  let casinoId = window.location.pathname.split('/').pop();
  try {
    const unformattedData = await api.get('admin/metrics/table-metrics-by-table', {
      params: {
        limit: 20,
        page: 1,
        sortBy: 'createdAt:DESC',
        game: 'roulette',
        casinoId: casinoId
      }
    });

    const data = unformattedData.data.items.map((game) => {
      return {
        id: game.game_id ? game.game_id : '0',
        min_bet: game.min_bet ? game.min_bet : '0',
        max_bet: game.max_bet ? game.max_bet : '0',
        bet_amounts: game.game_bet_amounts ? game.game_bet_amounts : '0',
        win_amounts: game.game_win_amounts ? game.game_win_amounts : '0',
        lose_amounts: game.game_lose_amounts ? game.game_lose_amounts : '0',
        sessions_started: game.sessions_started ? game.sessions_started : '0',
        sessions_ended: game.sessions_ended ? game.sessions_ended : '0'
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

export const getJetpackTables = async () => {
  const api = useAxios();
  let casinoId = window.location.pathname.split('/').pop();
  try {
    const unformattedData = await api.get('admin/metrics/table-metrics-by-table', {
      params: {
        limit: 20,
        page: 1,
        sortBy: 'createdAt:DESC',
        game: 'jetpack',
        casinoId: casinoId
      }
    });

    const data = unformattedData.data.items.map((game) => {
      return {
        id: game.game_id ? game.game_id : '0',
        min_bet: game.min_bet ? game.min_bet : '0',
        max_bet: game.max_bet ? game.max_bet : '0',
        bet_amounts: game.game_bet_amounts ? game.game_bet_amounts : '0',
        win_amounts: game.game_win_amounts ? game.game_win_amounts : '0',
        lose_amounts: game.game_lose_amounts ? game.game_lose_amounts : '0',
        sessions_started: game.sessions_started ? game.sessions_started : '0',
        sessions_ended: game.sessions_ended ? game.sessions_ended : '0'
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

export const getSlotTables = async () => {
  const api = useAxios();
  let casinoId = window.location.pathname.split('/').pop();
  try {
    const unformattedData = await api.get('admin/metrics/table-metrics-by-table', {
      params: {
        limit: 20,
        page: 1,
        sortBy: 'createdAt:DESC',
        game: 'slots',
        casinoId: casinoId
      }
    });

    const data = unformattedData.data.items.map((game) => {
      return {
        id: game.game_id ? game.game_id : '0',
        min_bet: game.min_bet ? game.min_bet : '0',
        max_bet: game.max_bet ? game.max_bet : '0',
        bet_amounts: game.game_bet_amounts ? game.game_bet_amounts : '0',
        win_amounts: game.game_win_amounts ? game.game_win_amounts : '0',
        lose_amounts: game.game_lose_amounts ? game.game_lose_amounts : '0',
        sessions_started: game.sessions_started ? game.sessions_started : '0',
        sessions_ended: game.sessions_ended ? game.sessions_ended : '0'
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

export const getCrashTables = async () => {
  const api = useAxios();
  let casinoId = window.location.pathname.split('/').pop();
  try {
    const unformattedData = await api.get('admin/metrics/table-metrics-by-table', {
      params: {
        limit: 20,
        page: 1,
        sortBy: 'createdAt:DESC',
        game: 'crash',
        casinoId: casinoId
      }
    });

    const data = unformattedData.data.items.map((game) => {
      return {
        id: game.game_id ? game.game_id : '0',
        min_bet: game.min_bet ? game.min_bet : '0',
        max_bet: game.max_bet ? game.max_bet : '0',
        bet_amounts: game.game_bet_amounts ? game.game_bet_amounts : '0',
        win_amounts: game.game_win_amounts ? game.game_win_amounts : '0',
        lose_amounts: game.game_lose_amounts ? game.game_lose_amounts : '0',
        sessions_started: game.sessions_started ? game.sessions_started : '0',
        sessions_ended: game.sessions_ended ? game.sessions_ended : '0'
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

export const updateTable = async (game, tableId, minBet, maxBet) => {
  const api = useAxios();
  try {
    return await api.patch(`/${game}/update`, {
      tableId: tableId,
      minBet: minBet,
      maxBet: maxBet
    });
  } catch (err) {
    console.log(err);
    return {
      data: {
        action: '',
        object: ''
      }
    };
  }
};

export const getBlackjackTableById = async (id) => {
  let casinoId = window.location.pathname.split('/')[2];
  const api = useAxios();
  try {
    return await api.get(`/admin/metrics/table-metrics-by-table-id/`, {
      params: {
        game: 'blackjack',
        casinoId: casinoId,
        id: id
      }
    });
  } catch (err) {
    console.log(err);
    return {
      data: {
        action: '',
        object: ''
      }
    };
  }
};

export const getBaccaratTableById = async (id) => {
  let casinoId = window.location.pathname.split('/')[2];
  const api = useAxios();
  try {
    return await api.get(`/admin/metrics/table-metrics-by-table-id/`, {
      params: {
        game: 'baccarat',
        casinoId: casinoId,
        id: id
      }
    });
  } catch (err) {
    console.log(err);
    return {
      data: {
        action: '',
        object: ''
      }
    };
  }
};

export const getRouletteTableById = async (id) => {
  let casinoId = window.location.pathname.split('/')[2];
  const api = useAxios();
  try {
    return await api.get(`/admin/metrics/table-metrics-by-table-id/`, {
      params: {
        game: 'roulette',
        casinoId: casinoId,
        id: id
      }
    });
  } catch (err) {
    console.log(err);
    return {
      data: {
        action: '',
        object: ''
      }
    };
  }
};

export const getSlotsTableById = async (id) => {
  let casinoId = window.location.pathname.split('/')[2];
  const api = useAxios();
  try {
    return await api.get(`/admin/metrics/table-metrics-by-table-id/`, {
      params: {
        game: 'slots',
        casinoId: casinoId,
        id: id
      }
    });
  } catch (err) {
    console.log(err);
    return {
      data: {
        action: '',
        object: ''
      }
    };
  }
};

export const getJetpackTableById = async (id) => {
  let casinoId = window.location.pathname.split('/')[2];
  const api = useAxios();
  try {
    return await api.get(`/admin/metrics/table-metrics-by-table-id/`, {
      params: {
        game: 'jetpack',
        casinoId: casinoId,
        id: id
      }
    });
  } catch (err) {
    console.log(err);
    return {
      data: {
        action: '',
        object: ''
      }
    };
  }
};

export const getCrashTableById = async (id) => {
  let casinoId = window.location.pathname.split('/')[2];
  const api = useAxios();
  try {
    return await api.get(`/admin/metrics/table-metrics-by-table-id/`, {
      params: {
        game: 'crash',
        casinoId: casinoId,
        id: id
      }
    });
  } catch (err) {
    console.log(err);
    return {
      data: {
        action: '',
        object: ''
      }
    };
  }
};
