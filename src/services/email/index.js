import useAxios from 'hooks/useAxios';
import { date } from 'yup/lib/locale';

//  ________ Handling templates & sending emails ________

export const getAllTemplates = async () => {
  const api = useAxios();
  try {
    return await api.get('/sendgrid/get-all-templates?generations=dynamic&pageSize=200');
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const getTemplate = async (id) => {
  const api = useAxios();
  try {
    return await api.get(`/sendgrid/${id}`);
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const sendCustomEmail = async (emails, customEmailTemplate, subject) => {
  const api = useAxios();
  try {
    return await api.post('/sendgrid/send-user-custom-email', {
      emails,
      customEmailTemplate,
      subject
    });
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const sendTemplateEmails = async (emails, templateId) => {
  const api = useAxios();
  try {
    return await api.post('/sendgrid/send-user-template-email', {
      emails,
      templateId
    });
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const creteTemplate = async (templateName, htmlContent, subject, active, versionName, generation) => {
  const api = useAxios();
  try {
    const data = {
      templateName,
      htmlContent,
      subject
    };
    if (generation) {
      date.generation = generation;
    }
    if (active) {
      date.active = active;
    }
    if (versionName) {
      date.versionName = versionName;
    }
    return await api.post('/sendgrid/create-template', data);
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const editTemplate = async (templateId, templateName, htmlContent, subject, active, versionName, generation) => {
  const api = useAxios();
  try {
    const data = {
      templateName: templateName,
      htmlContent: htmlContent,
      subject
    };
    if (generation) {
      date.generation = generation;
    }
    if (active) {
      date.active = active;
    }
    if (versionName) {
      date.versionName = versionName;
    }
    return await api.patch(`/sendgrid/${templateId}`, data);
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const deleteTemplate = async (templateId) => {
  const api = useAxios();
  try {
    return await api.delete(`/sendgrid/${templateId}`);
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

//  ________ Getting players & their emails ________

export const getPlayersWithEmails = async (limit = 20, page = 1, filters) => {
  const api = useAxios();
  const params = {
    limit: limit,
    page: page,
    sortBy: 'createdAt:DESC'
  };
  try {
    if (typeof filters == 'object') {
      if (Object.keys(filters).length) {
        if (filters?.search != null) {
          params['search'] = filters.search;
        }
        if (filters?.isChecked != null) {
          params['isDemo'] = filters.isChecked;
        }
        if (filters?.isSubscribed != null) {
          params['isSubscribed'] = filters.isSubscribed;
        }
        if (filters?.emails?.length) {
          params['id'] = `${filters.emails.map((u) => u.id).toString()}`;
        }
      }
    }

    const unformattedData = await api.get('/admin/users/newsletter-pagination', {
      params: params
    });

    return {
      data: unformattedData.data.data.map((x) => {
        return {
          id: x.id,
          nickname: x.nickname,
          time_spent: x.time_spent,
          email: x.email,
          current_balance: x.current_balance,
          starting_balance: x.starting_balance,
          money_spent: x.money_spent,
          money_cashed_out: x.money_cashed_out,
          wallet: x.walletId,
          location: x.lastLocation,
          kyc_status: x.kycState,
          isDemo: x.isDemo,
          createdDate: x.createdDate
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

export const getPlayersEmails = async (filters) => {
  const api = useAxios();
  const params = {};
  filters.emailOnly = true;
  try {
    if (typeof filters == 'object') {
      if (Object.keys(filters).length) {
        if (filters?.search != null) {
          params['search'] = filters.search;
        }
        if (filters?.isChecked != null) {
          params['isDemo'] = filters.isChecked;
        }
        if (filters?.isSubscribed != null) {
          params['isSubscribed'] = filters.isSubscribed;
        }
        if (filters?.emailOnly != null) {
          params['emailOnly'] = filters.emailOnly;
        }
      }
    }

    const unformattedData = await api.get('/admin/users/newsletter', {
      params: params
    });

    return {
      data: unformattedData
    };
  } catch (err) {
    console.error(err);
    return {
      data: []
    };
  }
};
