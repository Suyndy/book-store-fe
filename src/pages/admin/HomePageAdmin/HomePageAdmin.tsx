import { FaStore } from 'react-icons/fa'

const HomePageAdmin = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-16 rounded-lg shadow-lg max-w-4xl w-full">
        <FaStore className="mx-auto text-8xl text-colorBrand mb-6" />
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Chào mừng bạn đến với VITAMIN A STORE</h1>
        <p className="text-2xl text-gray-600">Đây là trang dành riêng cho quản trị viên.</p>
      </div>
    </div>
  )
}

export default HomePageAdmin
