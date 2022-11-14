import React, {FC, useContext, useEffect, useMemo, useState} from 'react'
import {useQuery} from 'react-query'
import {useQueryRequest} from './QueryRequestProvider'
import {
  createResponseContext,
  ID,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  stringifyRequestQuery,
} from '../../../_metronic/helpers'

type Props = {
  id: string
  requestFunction: any
  requestId?: ID | string
}

const QueryResponseContext = createResponseContext<any>(initialQueryResponse)
const QueryResponseProvider: FC<React.PropsWithChildren<Props>> = ({
  id,
  requestFunction,
  requestId,
  children,
}) => {
  const {state} = useQueryRequest()

  const [enabled, setEnabled] = useState<boolean>(true)
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
      setEnabled(true)
    }
  }, [query, updatedQuery])

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${id}-${query}`,
    () => {
      if (requestId) {
        return requestFunction(requestId, query).finally(() => setEnabled(false))
      } else {
        return requestFunction(query).finally(() => setEnabled(false))
      }
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false, enabled: enabled}
  )

  return (
    <QueryResponseContext.Provider
      value={{isLoading: isFetching, refetch, response, query, setEnabled}}
    >
      {children}
    </QueryResponseContext.Provider>
  )
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const {response} = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.data || []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  }

  const {response} = useQueryResponse()

  if (!response || !response.meta) {
    return defaultPaginationState
  }

  return response.meta
}

const useQueryResponseLoading = (): boolean => {
  const {isLoading} = useQueryResponse()
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
}
