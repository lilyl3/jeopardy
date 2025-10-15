export default function Home(){
  const isActive = true;
  return (
    <h2 className={`font-bold ${isActive ? "text-red-500" : ""}`}
>Home</h2>
  );
}