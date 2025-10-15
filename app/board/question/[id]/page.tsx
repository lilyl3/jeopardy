type QuestionPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function Question({ params }: QuestionPageProps) {
  const { id } = await params
  return <h1>Question ID: {id}</h1>
}