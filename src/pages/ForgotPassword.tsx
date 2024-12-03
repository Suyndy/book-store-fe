const ForgotPassword = () => {
  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto border border-gray-300 px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">
          CẤP LẠI MẬT KHẨU
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Nhập địa chỉ email liên kết với tài khoản Bookstore của bạn.
        </p>
        <form action="#" method="post" autoComplete="off">
          <div className="space-y-2">
            <div>
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="Nhập email"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
            >
              Gửi email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
