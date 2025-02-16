import { useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Oops!</h1>
        <p className="text-gray-600">
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      </div>
    </div>
  );
}
