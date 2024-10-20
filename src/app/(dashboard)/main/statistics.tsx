import Link from "next/link"

const Statistics = () => {
  return (
    <div className="w-full flex items-center gap-2 justify-between w-full mx-auto">
        <div className="rounded-xl bg-amber-700 text-white h-36 w-full p-3 flex flex-col justify-between font-medium">
            <h3 className="text-xs">Recent activity</h3>
            <p className="font-semibold text-lg">13 have been sold successfuly</p>
            <Link href={"#"} className="text-xs hover:text-white hover:underline text-zinc-100 flex">View all</Link>
        </div>
        <div className="rounded-xl border text-black h-36 w-full p-3 flex flex-col justify-between font-medium">
         <h3 className="text-xs">Total sales</h3>
            <div className="flex flex-col items-center">
                <p className="font-semibold text-4xl">300</p>
                <p>products</p>
            </div>
            <Link href={"#"} className="text-xs hover:text-black hover:underline text-zinc-400 flex">View all</Link>
        </div>
        <div className="rounded-xl border text-black h-36 w-full p-3 flex flex-col justify-between font-medium">
         <h3 className="text-xs">Total Income</h3>
            <div className="flex flex-col items-center">
                <p className="font-semibold text-4xl">Rp. 4 jt</p>
            </div>
            <Link href={"#"} className="text-xs hover:text-black hover:underline text-zinc-400 flex">View all</Link>
        </div>
    </div>
  )
}

export default Statistics