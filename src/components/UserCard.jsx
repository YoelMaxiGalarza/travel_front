function UserCard({ user }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
          <span className="text-primary-700 font-semibold text-lg">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{user.username}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
          }`}>
            {user.role}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Email: {user.email}
        </p>
      </div>
    </div>
  );
}

export default UserCard;