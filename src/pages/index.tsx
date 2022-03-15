import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="bg-stone-200 h-screen flex flex-col">
      <Head>
        <title>Survivor 42</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-full flex justify-center p-4">
        <div className="w-64 h-42">
          <Image src='/s42.png' width="394" height="253" />        
        </div>
      </header>

      <main className="w-full p-8 flex gap-8 flex-wrap">
        <div className="w-full max-w-sm p-4 py-8 relative">
          <div className="absolute inset-0 paper -rotate-1 shadow"></div>
          <div className="relative">
            <h2 className="font-survivor text-4xl rotate-1 text-amber-900">CARA</h2>
            <ul className="">
              <li>
                <h3 className="font-sriracha text-xl text-stone-700">Drea</h3>
                </li>
            </ul>
          </div>
        </div>
      </main>

  
    </div>
  )
}
