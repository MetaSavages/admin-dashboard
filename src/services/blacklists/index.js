import useAxios from 'hooks/useAxios';

export const getBlacklistedCountries = async () => {
  try {
    const api = useAxios();

    const res = await api.get(`admin/allowed-countries/get-allowed-countries`, {
      params: {
        limit: 20,
        page: 1
      }
    });

    const data = res.data.map((country) => {
      return {
        casinoId: country.casino?.id ? country.casino.id : '-',
        casino: country.casino?.name ? country.casino.name : '-',
        country: country.country?.countryCode ? country.country?.countryCode : '-',
        countryId: country.country?.id ? country.country?.id : '-',
        blacklisted: country.enabled ? country.enabled : false
      };
    });

    return {
      data: data,
      meta: {
        totalItems: data.length
      }
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const updateBlacklistedCountry = async (checkedValue, countryCode, casinoId) => {
  const api = useAxios();

  try {
    if (checkedValue) {
      return await api.post(`/admin/allowed-countries/remove-from-whitelist`, {
        countryCode: countryCode,
        casinoId: casinoId
      });
    } else {
      return await api.post(`/admin/allowed-countries/add-to-whitelist`, {
        countryCode: countryCode,
        casinoId: casinoId
      });
    }
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

export const getCountryFilterNames = async () => {
  try {
    const api = useAxios();

    const res = await api.get(`admin/allowed-countries`, {
      params: {
        //   limit: 20,
        //   page: 1
      }
    });
    console.log(res);
    const data = res.data.data.map((country) => {
      return {
        id: country?.id ? country.id : '-',
        value: country?.id ? country.id : '-',
        country: country?.countryCode ? country.countryCode : '-',
        label: country?.countryCode ? country.countryCode : '-'
      };
    });

    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getCasinoFilterNames = async () => {
  const api = useAxios();
  try {
    const unformattedData = await api.get('/admin/casinos');

    const data = unformattedData.data.data.map((casino) => {
      return {
        casino: casino.name ? casino.name : '-',
        label: casino.name ? casino.name : '-',
        casinoId: casino.id ? casino.id : '-',
        value: casino.id ? casino.id : '-'
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
