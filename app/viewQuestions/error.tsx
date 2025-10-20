'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="text-red-500">
      Failed to load questions. Please try again later.
    </div>
  );
}
