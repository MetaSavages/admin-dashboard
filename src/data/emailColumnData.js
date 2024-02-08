import { Checkbox } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const label = { inputProps: { 'aria-label': 'Checkbox player' } };

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const emailColumnData = [
  {
    width: 20,
    Header: (data) => {
      if (data?.data.length > 0) {
        const moreData = data.data[0].additionalData;

        if (
          moreData.queryPageIndex !== undefined &&
          moreData.queryPageIndex !== null &&
          moreData.queryPageSize !== undefined &&
          moreData.queryPageSize !== null
        ) {
          moreData.setQueryPageIndex(moreData.queryPageIndex);
          moreData.setQueryPageSize(moreData.queryPageSize);
        }
      }

      return (
        <Checkbox
          sx={{ marginLeft: '25px' }}
          {...label}
          icon={icon}
          checkedIcon={checkedIcon}
          checked={data?.data[0]?.additionalData?.headerCheck ? data?.data[0]?.additionalData?.headerCheck : false}
          onChange={(e) => {
            data.data[0].additionalData.setHeaderCheck(e.target.checked);
            if (e.target.checked) {
              const allEmails = data.data.map((item) => item.email);
              data.data[0].additionalData.setHeaderCheck(true);
              data.data[0].additionalData.setArrayOfEmails((old) => {
                return [...new Set([...old, ...allEmails])];
              });
            } else {
              const existingEmails = data.data.map((item) => item.email);
              const currentEmailsInSet = data.data[0].additionalData.arrayOfEmails;
              const validEmails = currentEmailsInSet.filter((email) => !existingEmails.includes(email));

              data.data[0].additionalData.setArrayOfEmails(validEmails);
              data.data[0].additionalData.setHeaderCheck(false);
            }
          }}
        />
      );
    },
    id: 'checked',
    Cell: ({ row }) => {
      return (
        <Checkbox
          {...label}
          icon={icon}
          checkedIcon={checkedIcon}
          checked={row.original.additionalData.arrayOfEmails.some((el) => el == row.original.email)}
          onChange={(e) => {
            if (e.target.checked) {
              row.original.additionalData.setArrayOfEmails([
                ...row.original.additionalData.arrayOfEmails,
                row.original.email
              ]);
            } else {
              const newArray = row.original.additionalData.arrayOfEmails.filter((item) => item !== row.original.email);
              row.original.additionalData.setArrayOfEmails(newArray);
            }
          }}
        />
      );
    },

    SubCell: () => null
  },
  {
    Header: 'Username',
    accessor: 'nickname'
  },
  {
    Header: 'email',
    accessor: 'email'
  },
  {
    Header: 'Wallet',
    accessor: 'wallet'
  },
  {
    Header: 'Location',
    accessor: 'location'
  },
  {
    Header: 'KYC Status',
    accessor: 'kyc_status'
  }
];

export default emailColumnData;
