import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RpcClientProvider } from 'cw-query-hooks'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // useErrorBoundary: true,
      staleTime: 300000, // 300 seconds
      // cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RpcClientProvider rpcUrl={'https://rpc.uni.junonetwork.io'} >
    <QueryClientProvider client={queryClient} >
    <App />
    </QueryClientProvider>
    </RpcClientProvider>
  </React.StrictMode>
)
