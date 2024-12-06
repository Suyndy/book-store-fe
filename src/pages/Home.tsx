import { Pagination } from "antd";
import CartProduct from "../components/features/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { bookService } from "../core/services/book.service";
import { useState } from "react";

const Home = () => {
  const [page, setPage] = useState(1);
  const currentItems = 8;

  const { data, refetch } = useQuery({
    queryKey: ["books-data", page],
    queryFn: () =>
      bookService.getAllBook({
        page: page,
        pageSize: currentItems,
      }),
  });

  return (
    <div>
      {/* Banner Section */}
      <div
        className="bg-cover bg-no-repeat bg-center py-20 mt-[145px]"
        style={{ backgroundImage: "url('assets/images/banner-bg.png')" }}
      >
        <div className="container">
          <h1 className="text-5xl text-gray-800 font-medium mb-4 capitalize">
            Bắt đầu hành trình tri thức <br /> ngay hôm nay!
          </h1>
          <p>
            Khám phá sách hay để mở rộng tri thức và thư giãn. <br />
            Từ kinh điển đến hiện đại, lựa chọn hoàn hảo cho bạn.
          </p>
          <div className="mt-12">
            <a
              href="#"
              className="bg-primary border border-primary text-white px-8 py-3 font-medium 
                    rounded-md hover:bg-transparent hover:text-primary"
            >
              Mua ngay
            </a>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
          <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
            <img
              src="assets/images/icons/delivery-van.svg"
              alt="Delivery"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h4 className="font-medium capitalize text-lg">Miễn phí ship</h4>
              <p className="text-gray-500 text-sm">Hóa đơn trên 500k</p>
            </div>
          </div>

          <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
            <img
              src="assets/images/icons/money-back.svg"
              alt="Money Return"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h4 className="font-medium capitalize text-lg">Hoàn trả</h4>
              <p className="text-gray-500 text-sm">Trong vòng 30 ngày</p>
            </div>
          </div>

          <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
            <img
              src="assets/images/icons/service-hours.svg"
              alt="24/7 Support"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h4 className="font-medium capitalize text-lg">Hỗ trợ 24/7</h4>
              <p className="text-gray-500 text-sm">Hỗ trợ khách hàng</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          Sách bán chạy
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data?.data?.slice(0, 4).map((item: any, index: number) => (
            <CartProduct key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          Đề xuất cho bạn
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data?.data?.map((item: any, index: number) => (
            <CartProduct key={index} item={item} />
          ))}
        </div>
        <div className="flex justify-center py-9">
          <Pagination
            size="default"
            pageSize={currentItems}
            total={data?.total || 0}
            onChange={(page: number) => {
              setPage(page);
              refetch();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
