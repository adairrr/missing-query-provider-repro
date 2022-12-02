import { defaultContext, useQueries, useQuery } from '@tanstack/react-query'
import { fromAscii, toAscii } from '@cosmjs/encoding'
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import {
  CombinedQueries,
  QueryOptions,
  ReactQueryOptions,
  useCombinedQueries,
} from 'react-query-helpers'
import { useRpcClients } from '../contexts'

type RawQueryParams = {
  address: string
  key: string
}

interface RawQuery<TResponse, TData> extends ReactQueryOptions<TResponse, TData> {
  args: RawQueryParams
}

/**
 * Static query keys for raw queries.
 */
export const rawQueryKeys = {
  contract: (address: string, key: string) =>
    ['queryContractRaw', JSON.stringify({ address, key })] as const,
}

export const rawQuery = async <TResponse = unknown>({
  readOnlyClient,
  address,
  key,
}: {
  readOnlyClient: CosmWasmClient | undefined
  address: string
  key: string
}): Promise<TResponse> => {
  if (!readOnlyClient) return Promise.reject(new Error('No readonly client'))
  return readOnlyClient
    .queryContractRaw(address, toAscii(key))
    .then((response) => (response ? JSON.parse(fromAscii(response)) : response))
}

/**
 * Execute a raw query on a cosmwasm contract.
 * @param client
 * @param options
 * @param args key can be a string! This will encode it
 */
export const useRawQuery = <TResponse = unknown, TData = TResponse>({
  options,
  args,
}: RawQuery<TResponse, TData>) => {
  const { readOnlyClient } = useRpcClients()

  const { address, key } = args
  return useQuery<TResponse, Error, TData>(
    rawQueryKeys.contract(address, key),
    (): Promise<TResponse> => rawQuery({ readOnlyClient, address, key }),
    {
      context: defaultContext,
      ...options,
      ...QueryOptions.DISABLE_WITHOUT(readOnlyClient, options?.enabled),
    }
  )
}

interface RawQueries {
  addresses: string[]
  key: string
  options?: {
    enabled: boolean
  }
}

export const useRawQueries = <TResponse = unknown>({
  addresses,
  key,
  options,
}: RawQueries): CombinedQueries<TResponse, string> => {
  const { readOnlyClient } = useRpcClients()

  const queries = useQueries({
    queries: addresses.map((address) => ({
      queryKey: rawQueryKeys.contract(address, key),
      queryFn: (): Promise<TResponse> => rawQuery({ readOnlyClient, address, key }),
      ...QueryOptions.DISABLE_WITHOUT(readOnlyClient, options?.enabled),
      retry: false,
    })),
  })

  return useCombinedQueries({ keys: addresses, queries })
}
