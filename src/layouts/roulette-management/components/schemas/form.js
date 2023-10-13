/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const form = {
  formId: 'new-baccarat-table',
  formField: {
    casinoName: {
      name: 'casinoName',
      label: 'Casino Name',
      type: 'text',
      errorMsg: 'Casino name is required.'
    },
    casinoProvider: {
      name: 'casinoProvider',
      label: 'Casino Provider',
      type: 'text',
      errorMsg: 'Casino provider is required.'
    },
    minBet: {
      name: 'minBet',
      label: 'Min Bet',
      type: 'number',
      errorMsg: 'The number need to be positive.',
      errorMsgLess: 'The number need to be less then max number.'
    },
    maxBet: {
      name: 'maxBet',
      label: 'Max Bet',
      type: 'number',
      errorMsg: 'The number need to be positive.',
      errorMsgMore: 'The number need to be more then min number.'
    }
  }
};

export default form;
