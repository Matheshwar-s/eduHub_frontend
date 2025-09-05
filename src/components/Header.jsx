export default function Header({ username }) {
  return (
    <div className="flex justify-between items-center p-6 bg-gray-800 text-white rounded-b-2xl">
      <h2 className="text-2xl font-semibold">Welcome, {username}</h2>
      <div className="flex items-center gap-4">
        <span>🔔</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
}
