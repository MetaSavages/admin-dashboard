import useAxios from 'hooks/useAxios';

export const getSlots = async (limit = 20, page = 1) => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('/admin/slots/slots', {
      params: { limit: limit, page: page }
    });

    return {
      data: unformattedData.data.data.map((slot) => {
        return {
          id: slot?.gameId ?? '-',
          name: slot?.name ?? '-',
          provider: slot?.provider ?? 'N/A',
          rtp: slot?.rtp ?? 0,
          promoIndex: slot?.promoIndex ?? 0,
          isUnreal: slot?.isUnreal ? 'Yes' : 'No'
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

export const getSlot = async (id) => {
  const api = useAxios();
  try {
    const unformattedData = await api.get(`/admin/slots/slots/${id}`);

    return {
      data: {
        id: unformattedData?.data.gameId ?? '-',
        name: unformattedData?.data.name ?? '-',
        provider: unformattedData?.data.provider ?? 'N/A',
        rtp: unformattedData?.data.rtp ?? 0,
        promoIndex: unformattedData?.data.promoIndex ?? 0,
        isUnreal: unformattedData?.data.isUnreal ?? 'N/A'
      },
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

export const updateSlot = async (id, promoIndex, isUnreal) => {
  const api = useAxios();
  try {
    return await api.patch(`/admin/slots/slots/${id}`, {
      promoIndex: promoIndex,
      isUnreal: isUnreal
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
