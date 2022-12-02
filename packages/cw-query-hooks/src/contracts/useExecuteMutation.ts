import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ExecuteResult, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { useMergeDefaultMutationOptions } from 'react-query-helpers'

interface ExecuteParams {
  client: SigningCosmWasmClient
  sender: string
  contractAddress: string
  msg: Record<string, unknown>
  memo?: string
}

/**
 * Execute a msg on a contract.
 * Merges the default mutation options with the provided options.
 * @param options
 */
export const useExecuteMutation = (
  options?: Omit<UseMutationOptions<ExecuteResult, Error, ExecuteParams>, 'mutationFn'>
) => {
  const { mergeWithDefaults } = useMergeDefaultMutationOptions({ context: options?.context })
  const execMutation = useMutation<ExecuteResult, Error, ExecuteParams>(
    ({ client, sender, contractAddress, msg, memo }: ExecuteParams) =>
      client.execute(sender, contractAddress, msg, 'auto', memo),
    mergeWithDefaults(options)
  )

  return {
    execMutation,
  }
}
