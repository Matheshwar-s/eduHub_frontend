export default function QuickActions() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
        Upload Assignment
      </button>
      <button className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600">
        Join Next Class
      </button>
    </div>
  );
}
