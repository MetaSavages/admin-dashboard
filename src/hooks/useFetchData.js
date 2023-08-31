import { useState, useEffect, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useFetchData = (
  queryPageIndex,
  queryPageSize,
  queryPageCount,
  queryKey,
  fetchData,
  search = '',
  setTotalCount,
  renderAgain 
) => {
  const [data, setData] = useState({
    data: []
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    // We want to make sure the current page is less than the total page left
    if (queryPageIndex + 1 < queryPageCount) {
      // By using prefetchingQuery we want to fetch whatever the next page is
      const nextPage = queryPageIndex + 2;
      // important to make sure the prefetchQuery query-keys needs to be identical with the useQuery.
      // The only exception is that we are passing on the "next page" as the index position #1 of the query-key array
      queryClient.prefetchQuery([queryKey, nextPage, queryPageCount, search], () =>
        fetchData(queryPageSize, nextPage, search)
      );
    }
  }, [queryPageIndex, queryPageSize, queryPageCount, search,renderAgain]);

  const {
    data: resData,
    isSuccess,
    isFetching,
    ...rest
  } = useQuery(
    [queryKey, queryPageIndex, queryPageSize, queryPageCount, search,renderAgain],
    () => fetchData(queryPageSize, queryPageIndex + 1, search),
    {
      keepPreviousData: true,
      staleTime: Infinity
    }
  );
  useEffect(() => {
    setData({
      data: []
    });

    if (isSuccess && resData) {
      setTotalCount({
        totalCountChangedValue: resData.meta.totalItems
      });
      setData(resData);
    }
  }, [isSuccess, resData]);
  return { data, ...rest };
};

export default useFetchData;
