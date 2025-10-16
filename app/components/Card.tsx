import Link from "next/link"

type CardProps = {
    category: string
    pointValue: string
  }
  
export default function Card({ category, pointValue }: CardProps) {
  return (
    <div
      className="bg-white border border-gray-300 rounded-lg shadow-md p-4 m-2 w-[175px] 
      flex flex-col items-center text-center cursor-pointer transition-transform 
      duration-300 ease-in-out hover:scale-105 gap-2"
    >
      <h2 className="text-xl font-semibold m-0 p-0">
        <Link href={`/board/${category}/${pointValue}`} className="text-inherit hover:underline">
          {pointValue}
        </Link>
      </h2>
    </div>
  )
}  