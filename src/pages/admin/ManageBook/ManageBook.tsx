import { Button, Image, Input, message, Popover, Table } from "antd";
import styles from "./ManageBook.module.scss";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { laptopService } from "../../../core/services/laptop.service";
import { FaPenToSquare } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { columns } from "./utils";
import ModalAddBook from "../../../components/features/ModalAddBook/ModalAddBook";
import { useState } from "react";
import { useStoreContext } from "../../../context/MyContext";
const { Search } = Input;


const ManageBook = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const { options } = useStoreContext();
  const [name, setName] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["laptops", name],
    queryFn: () =>
      laptopService.getAllLaptop({
        name,
      }),
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: laptopService.deleteLaptop,
    onSuccess: () => {
      message.success("Xóa thành công.");
      refetch();
    },
    onError: () => {
      message.error("Xóa thất bại, đã có lỗi xảy ra.");
    },
  });

  const getNamebyKeyOptions = (key: string, label: string) => {
    const data = options?.[label].find((item: any) => item.key === key);
    return data?.name;
  };

  const renderContent = (item: any) => {
    return (
      <div className={styles.content_popover}>
        <p>
          <span>Bộ Xử Lý:</span>{" "}
          {getNamebyKeyOptions(item?.specs.processor, "processors")}
        </p>
        <p>
          {" "}
          <span>Bộ Nhớ RAM:</span> {getNamebyKeyOptions(item?.specs.ram, "ram")}
        </p>
        <p>
          <span>Dung Lượng Lưu Trữ:</span>{" "}
          {getNamebyKeyOptions(item?.specs.storage, "storage")}
        </p>
        <p>
          <span>Kích Thước Màn Hình:</span>{" "}
          {getNamebyKeyOptions(item?.specs.screen, "screenSizes")}
        </p>
        <p>
          <span>Thời Lượng Pin:</span>{" "}
          {getNamebyKeyOptions(item?.specs.battery, "battery")}
        </p>
        <p>
          <span>Trọng Lượng (kg):</span> {item?.specs.weight}
        </p>
      </div>
    );
  };

  const datas: any = data?.map((item: any) => {
    return {
      key: item?._id,
      image: <Image src={item?.image} preview={false} width={60} />,
      name: item?.name,
      brand: item?.brand,
      description: item?.description,
      price: item?.price,
      quantity: item?.quantity,
      action: (
        <div className={styles.table_action}>
          <FaPenToSquare
            onClick={() => {
              setIsShowUpdate(true);
              set_id(item?._id);
            }}
            size={20}
            color="green"
          />{" "}
          <AiOutlineDelete
            onClick={() => deleteMutation(item?._id)}
            size={20}
            color="red"
          />
        </div>
      ),
      infor: (
        <Popover content={renderContent(item)}>
          <div style={{ cursor: "pointer" }}>Xem thêm</div>
        </Popover>
      ),
    };
  });

  const { mutate: addNewLaptop } = useMutation({
    mutationFn: laptopService.createLaptop,
    onSuccess: () => {
      message.success("Laptop mới được tạo thành công.");
      refetch();
    },
    onError: (err: any) => {
      const error = err.response.data.error;
      message.error(error);
    },
  });

  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [_id, set_id] = useState(null);

  const { mutate: updateLaptop } = useMutation({
    mutationFn: laptopService.updateLaptop,
    onSuccess: () => {
      message.success("Cập nhật thông tin thành công.");
      refetch();
    },
    onError: (err: any) => {
      const error = err.response.data.error;
      message.error(error);
    },
  });

  const { data: item } = useQuery({
    queryKey: ["item-laptop", _id],
    queryFn: () => (_id ? laptopService.getOneLaptop(_id) : null),
  });

  const handleUpdate = (values: any) => {
    updateLaptop({ data: values, id: _id });
  };

  return (
    <div className={styles.container}>
      <ModalAddBook
        onSubmit={addNewLaptop}
        visible={isShowModal}
        onCancel={setIsShowModal}
      />
      <ModalAddBook
        onSubmit={handleUpdate}
        visible={isShowUpdate}
        onCancel={setIsShowUpdate}
        title={`CHỈNH SỬA THÔNG TIN LAPTOP`}
        item={item?.laptop}
      />
      <div className={styles.big_title}>Tất cả sách</div>
      <div className={styles.top}>
        <div>
          <Search
            allowClear
            onSearch={(value) => setName(value)}
            placeholder="Tìm kiếm"
          />
        </div>
        <Button type="default" onClick={() => setIsShowModal(true)}>
          <FaPlus /> Thêm mới
        </Button>
      </div>
      <div className={styles.bottom}>
        <Table
          columns={columns}
          dataSource={datas}
          pagination={{ pageSize: 7 }}
        />
      </div>
    </div>
  );
};

export default ManageBook;
