type QuestionPageProps = {
  params: Promise<{
    category: string;
    pointValue: string;
  }>;
};

export default async function Question({ params }: QuestionPageProps) {
  const { category, pointValue } = await params;
  return <h1>Question {pointValue} in category {category}</h1>;
}
