import { LSMap } from '@/lib/LocalStorage'
import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

function getMap() {
  return typeof window !== "undefined" ? new LSMap("cache", 60 * 60 * 24 * 30) : new Map()
}



export default function MyApp({ Component, pageProps }: AppProps) {
  return <SWRConfig         value={{provider: getMap,}}>
    <Component {...pageProps} />
  </SWRConfig>
}

