import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import React, { FC, PropsWithChildren, useContext } from 'react'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { StargateClient } from '@cosmjs/stargate'
import {
  useCosmWasmClient,
  useStargateClient,
  useTendermintClient,
} from './useRpcClientHooks'

interface UseRpcClients {
  readOnlyClient: CosmWasmClient | undefined
  tmClient: Tendermint34Client | undefined
  stargateClient: StargateClient | undefined
}

const context = React.createContext<UseRpcClients>({} as UseRpcClients)

export const useRpcClients = () => {
  const c = useContext(context)
  if (!c) throw new Error(`ReadonlyClientProvider must be inside a provider with a value`)
  return c
}

const _ReadonlyClientProvider = context.Provider

interface ReadonlyClientProviderProps {
  rpcUrl: string
  suspense?: boolean
}
/**
 * Provides the "readonly" clients that simply connect with the RPC of the current network.
 */
export const RpcClientProvider: FC<PropsWithChildren<ReadonlyClientProviderProps>> = ({
  rpcUrl,
  suspense,
  children,
}) => {
  const { client: readOnlyClient } = useCosmWasmClient(rpcUrl, { suspense })
  const { client: stargateClient } = useStargateClient(rpcUrl, { suspense })
  const { client: tendermintClient } = useTendermintClient(rpcUrl, { suspense })

  return (
    <_ReadonlyClientProvider
      value={{
        readOnlyClient,
        stargateClient,
        tmClient: tendermintClient,
      }}
    >
      {children}
    </_ReadonlyClientProvider>
  )
}
