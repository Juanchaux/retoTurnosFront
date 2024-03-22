import { AsesorProvider } from '@/context/asesorContext'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AsesorProvider>
        <Component {...pageProps} />
      </AsesorProvider>
    </QueryClientProvider>
  )
}

export default MyApp
