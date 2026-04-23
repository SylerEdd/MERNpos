import pos_sys_image from "../../assets/pos_sys_image.png";

export function LoginPage() {
  return (
    <div
      className="h-screen w-screen flex"
      style={{
        background: "linear-gradient(to right, #628897 27%, #0C2B4E 74%)",
      }}
    >
      <div className="grid grid-cols-2 place-items-center h-full w-full">
        <div className="m-auto">
          <img
            src={pos_sys_image}
            // This image has created by AI
            alt="POS System"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-6 h-full w-full px-12">
          <div className="w-full max-w-2xl p-8 bg-white rounded-4xl shadow-lg">
            <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-2xl font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 text-2xl block w-full px-7 py-5 border border-dark rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-pointer hover:ring-2 hover:ring-blue-500"
                  placeholder="Enter your username"
                  required
                />
                <label
                  htmlFor="password"
                  className="block text-2xl font-medium text-gray-700 mt-4"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 text-2xl block w-full px-7 py-5 border border-dark rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-pointer hover:ring-2 hover:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-7 w-full py-5 px-7 text-2xl rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="w-full max-w-2xl px-8 py-5 bg-white rounded-4xl shadow-lg">
            <div className="flex items-center gap-6">
              <span className="text-xl font-semibold text-gray-800 w-1/3">
                Quick Login:
              </span>
              <div className="grid grid-cols-5 justify-items-center w-full">
                <button className="pb-3 text-gray-500 hover:text-gray-800 text-5xl">
                  &#8249;
                </button>
                <div className="w-15 h-15 rounded-full bg-gray-200 cursor-pointer hover:ring-2 hover:ring-blue-500" />
                <div className="w-15 h-15 rounded-full bg-gray-200 cursor-pointer hover:ring-2 hover:ring-blue-500" />
                <div className="w-15 h-15 rounded-full bg-gray-200 cursor-pointer hover:ring-2 hover:ring-blue-500" />
                <button className="pb-3 text-gray-500 hover:text-gray-800 text-5xl">
                  &#8250;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
