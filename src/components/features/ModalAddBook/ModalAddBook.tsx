import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  message,
  Avatar,
  Select,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./ModalAddBook.module.scss";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../../../core/services/category.service";
import dayjs from "dayjs";

const ModalAddBook = ({
  visible,
  onCancel,
  onSubmit,
  title = "Thêm sản phẩm mới",
  item,
}: any) => {
  const [form] = Form.useForm();
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const { data: categoryData, refetch } = useQuery({
    queryKey: ["category"],
    queryFn: categoryService.getAllCategory,
  });

  useEffect(() => {
    refetch();
  }, [categoryData, refetch]);

  const handleImageUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImageBase64(base64);
      form.setFieldsValue({ image: base64 });
    };
    reader.onerror = () => {
      message.error("Không thể tải hình ảnh lên");
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleSubmit = (values: any) => {
    const publishedAt = values.published_at
      ? values.published_at.format("YYYY-MM-DD HH:mm:ss")
      : null;

    onSubmit({ ...values, image: imageBase64, published_at: publishedAt });
    form.resetFields();
    onCancel(false);
    refetch();
  };

  const handleCancel = () => {
    onCancel(false);
    form.resetFields();
    setImageBase64(null);
  };

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        ...item,
        published_at: item?.published_at ? dayjs(item.published_at) : null,
      });
      setImageBase64(item?.image || null);
    } else {
      setImageBase64(null);
    }
  }, [item, visible]);

  return (
    <Modal
      onCancel={handleCancel}
      footer={false}
      title={<div className={styles.title}>{title}</div>}
      open={visible}
      width={"60%"}
      maskClosable={false}
      style={{ top: "24px" }}
    >
      <Form
        className={styles.form}
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
      >
        <div className={styles.session}>Thông tin chung</div>
        <div className={styles.name_brand_image}>
          <div>
            <Form.Item
              name="category_id"
              label="Danh mục"
              rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
            >
              <Select placeholder="Chọn danh mục" style={{ height: "40px" }}>
                {categoryData?.map((category: any) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="title"
              label="Tên sách"
              rules={[
                { required: true, message: "Vui lòng nhập tên sản phẩm" },
              ]}
            >
              <Input
                placeholder="Nhập tên sản phẩm"
                style={{ height: "40px" }}
              />
            </Form.Item>

            <Form.Item
              name="author"
              label="Tác giả"
              rules={[{ required: true, message: "Vui lòng nhập tên tác giả" }]}
            >
              <Input
                placeholder="Nhập tên tác giả"
                style={{ height: "40px" }}
              />
            </Form.Item>

            <Form.Item
              name="published_at"
              label="Ngày xuất bản"
              rules={[
                { required: true, message: "Vui lòng chọn ngày xuất bản" },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                style={{ height: "40px", width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name="isbn"
              label="Mã ISBN"
              rules={[{ required: true, message: "Vui lòng nhập mã ISBN" }]}
            >
              <Input placeholder="Nhập mã ISBN" style={{ height: "40px" }} />
            </Form.Item>

            <div className={styles.price_quantity}>
              <Form.Item
                name="price"
                label="Giá"
                rules={[
                  { required: true, message: "Vui lòng nhập giá sản phẩm" },
                ]}
              >
                <InputNumber
                  placeholder="Nhập giá sản phẩm"
                  style={{ width: "100%", height: "40px" }}
                  min={0}
                  className={styles.input_number}
                />
              </Form.Item>

              <Form.Item
                name="quantity"
                label="Số lượng"
                rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
              >
                <Input placeholder="Nhập số lượng" style={{ height: "40px" }} />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            name="image"
            rules={[
              {
                required: true,
                message: (
                  <div className="text-center mt-2.5 text-red-500">
                    Vui lòng tải lên ảnh
                  </div>
                ),
              },
            ]}
          >
            <div className="text-center mb-2">Tải ảnh lên</div>
            <div className={styles.image}>
              <Avatar shape="square" size={130} src={imageBase64}>
                <FaPlus size={24} />
              </Avatar>
              <Upload
                beforeUpload={handleImageUpload}
                showUploadList={false}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
              </Upload>
            </div>
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm" }]}
        >
          <Input.TextArea placeholder="Nhập mô tả sản phẩm" rows={4} />
        </Form.Item>

        <div className={styles.button}>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button className={styles.btn_save} type="default" htmlType="submit">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAddBook;
