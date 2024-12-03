const ChangePassword = () => {
  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto border border-gray-300 px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">Đổi mật khẩu</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Mật khẩu của bạn nên có ít nhất 8 ký tự và nên bao gồm chữ cái, số và
          ký tự đặc biệt.
        </p>
        <form action="#" method="post" autoComplete="off">
          <div className="space-y-2">
            <div>
              <label htmlFor="password" className="text-gray-600 mb-2 block">
                Mật khẩu mới
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="*******"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-600 mb-2 block">
                Xác nhận lại mật khẩu
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="*******"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
