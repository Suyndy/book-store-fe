import { Button, Image, Input, message, Table } from "antd";
import styles from "./ManageBook.module.scss";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaPenToSquare } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { columns } from "./utils";
import ModalAddBook from "../../../components/features/ModalAddBook/ModalAddBook";
import { useEffect, useState } from "react";
import { bookService } from "../../../core/services/book.service";
import dayjs from "dayjs";
const { Search } = Input;

const ManageBook = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  const { data: dataBook, refetch } = useQuery({
    queryKey: ["books", name],
    queryFn: () =>
      bookService.getAllBook({
        search: name,
        per_page: 1000,
      }),
    // enabled: true,
  });

  useEffect(() => {
    if (dataBook) {
      setData(dataBook?.data);
    }
  }, [dataBook]);

  const { mutate: deleteMutation } = useMutation({
    mutationFn: bookService.deleteBook,
    onSuccess: () => {
      message.success("Xóa thành công.");
      refetch();
    },
    onError: () => {
      message.error("Xóa thất bại, đã có lỗi xảy ra.");
    },
  });

  const datas: any = data?.map((item: any) => {
    return {
      key: item?.id,
      image: <Image src={item?.image} preview={false} width={60} height={60} />,
      title: item?.title,
      description: item?.description,
      author: item?.author,
      price: item?.price,
      quantity: item?.quantity,
      published_at: item?.published_at
        ? dayjs(item?.published_at).format("YYYY-MM-DD")
        : null,
      action: (
        <div className={styles.table_action}>
          <FaPenToSquare
            onClick={() => {
              setIsShowUpdate(true);
              set_id(item?.id);
            }}
            size={20}
            color="green"
          />{" "}
          <AiOutlineDelete
            onClick={() => deleteMutation(item?.id)}
            size={20}
            color="red"
          />
        </div>
      ),
    };
  });

  const { mutate: addNewBook } = useMutation({
    mutationFn: bookService.createBook,
    onSuccess: () => {
      message.success("Sách mới được tạo thành công.");
      refetch();
    },
    onError: (err: any) => {
      console.log(err?.response?.data?.errors?.isbn[0]);
      if (err?.response?.data?.errors?.isbn) {
        message.error("Mã ISBN đã bị trùng");
      } else {
        message.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    },
  });

  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [_id, set_id] = useState(null);

  const { mutate: updateBook } = useMutation({
    mutationFn: bookService.updateBook,
    onSuccess: () => {
      message.success("Cập nhật thông tin thành công.");
      refetch();
    },
    onError: (err: any) => {
      console.log(err?.response?.data?.errors?.isbn[0]);
      if (err?.response?.data?.errors?.isbn) {
        message.error("Mã ISBN đã bị trùng");
      } else {
        message.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    },
  });

  const { data: item } = useQuery({
    queryKey: ["book", _id],
    queryFn: () => (_id ? bookService.getOneBook(_id) : null),
    enabled: !!_id,
  });

  const handleUpdate = (values: any) => {
    updateBook({ data: values, id: _id });
  };

  return (
    <div className={styles.container}>
      <ModalAddBook
        onSubmit={addNewBook}
        visible={isShowModal}
        onCancel={setIsShowModal}
      />
      <ModalAddBook
        onSubmit={handleUpdate}
        visible={isShowUpdate}
        onCancel={setIsShowUpdate}
        title={`Chỉnh sửa thông tin sách`}
        item={item}
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
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default ManageBook;
