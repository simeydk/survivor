import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="h-screen flex flex-col relative bg-stone-200 overflow-auto">
      {/* <img src="https://wallpapercave.com/wp/wp5083769.jpg" className="absolute inset-0 object-fill saturate-[0.25] blur" /> */}
      {/* <div className="absolute inset-0 bg-[url('https://wallpapercave.com/wp/wp5083769. jpg')]"></div> */}
      <Head>
        <title>Survivor 42</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-full flex justify-center p-4">
        <div className="w-48 h-32">
          <Image src='/s42.png' width="394" height="253"  />        
        </div>
      </header>

      <main className="w-full p-8 flex gap-8 flex-wrap">
        <div className="w-full max-w-xs p-8 py-8 relative paper -rotate-1">
          {/* <div className="absolute inset-0 paper -rotate-1 shadow"></div> */}
          <div className="relative">
            <h2 className="font-survivor text-4xl rotate-1 text-amber-900">CARA</h2>
            <ul className="">
              <li>
                <h3 className="font-['courier_new'] font-bold text-2xl text-stone-700">Drea</h3>
                </li>
              <li>
                <h3 className="font-['courier_new'] font-bold text-2xl text-stone-700">Rocksroy</h3>
                </li>
              <li>
                <h3 className="font-['courier_new'] line-through font-bold text-2xl text-stone-700">Swati</h3>
                </li>
              <li>
                <h3 className="font-['courier_new'] font-bold text-2xl text-stone-700">Jonathan</h3>
                </li>
            </ul>
          </div>
        </div>
        <div className="w-full max-w-xs p-8 py-8 relative paper rotate-1">
          {/* <div className="absolute inset-0 paper -rotate-1 shadow"></div> */}
          <div className="relative">
            <h2 className="font-survivor text-4xl rotate-1 text-amber-900">RYAN</h2>
            <ul className="">
              <li>
                <h3 className="font-['courier_new'] font-bold text-2xl text-stone-700">Chanelle</h3>
                </li>
              <li>
                <h3 className="font-['courier_new'] font-bold text-2xl text-stone-700">Omar</h3>
                </li>
              <li>
                <h3 className="font-['courier_new'] line-through font-bold text-2xl text-stone-700">Maryanne</h3>
                </li>
              <li>
                <h3 className="font-['courier_new'] font-bold text-2xl text-stone-700">Lydia</h3>
                </li>
            </ul>
          </div>
        </div>
      </main>

  
    </div>
  )
}
