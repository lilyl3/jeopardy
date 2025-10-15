import Link from "next/link"

type CardProps = {
    src?: string
    points: string
    id: number
  }
  
export default function Card({ src, points, id }: CardProps) {
    return (
      <div
        className="border border-gray-300 rounded-lg shadow-md p-4 m-2 w-[175px] flex flex-col items-center text-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 gap-2"
      >
        {src ? (
          <img
            className="w-full max-h-[120px] object-cover block"
            src={src}
            alt="image"
          />
        ) : null}
  
        <h2 className="text-xl font-semibold m-0 p-0">
          <Link href={`/board/question/${id}`} className="text-inherit hover:underline">
            {points}
          </Link>
        </h2>
      </div>
    )
}  