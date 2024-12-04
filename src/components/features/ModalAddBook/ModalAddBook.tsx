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
import { useStoreContext } from "../../../context/MyContext";
import styles from "./ModalAddBook.module.scss";
import { FaPlus } from "react-icons/fa";

const { RangePicker } = DatePicker;

const ModalAddBook = ({
  visible,
  onCancel,
  onSubmit,
  title = "Thêm sản phẩm mới",
  item,
}: any) => {
  const [form] = Form.useForm();
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const { options } = useStoreContext();

  const handleImageUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result as string);
    };
    reader.onerror = () => {
      message.error("Failed to upload image");
    };
    reader.readAsDataURL(file);
    return false; // Chặn upload mặc định của antd
  };

  const handleSubmit = (values: any) => {
    onSubmit({ ...values, image: imageBase64 });
    form.resetFields();
    onCancel(false);
  };

  const handleCancel = () => {
    onCancel(false);
    form.resetFields();
    setImageBase64(null);
  };

  useEffect(() => {
    if (item) {
      form.setFieldsValue(item);
      setImageBase64(item?.image);
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
              name="category"
              label="Danh mục"
              rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
            >
              <Select placeholder="Chọn danh mục" style={{ height: '40px' }}>
                {options?.brands?.map((item: any) => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.name}
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
              <Input placeholder="Nhập tên sản phẩm" style={{ height: '40px' }} />
            </Form.Item>

            <Form.Item
              name="author"
              label="Tác giả"
              rules={[
                { required: true, message: "Vui lòng nhập tên tác giả" },
              ]}
            >
              <Input placeholder="Nhập tên tác giả" style={{ height: '40px' }} />
            </Form.Item>

            <Form.Item
              name="manufacturer"
              label="Nhà xuất bản"
              rules={[
                { required: true, message: "Vui lòng nhập tên nhà xuất bản" },
              ]}
            >
              <Input placeholder="Nhập tên nhà xuất bản" style={{ height: '40px' }} />
            </Form.Item>

            <Form.Item
              name="published_at"
              label="Ngày xuất bản"
              rules={[
                { required: true, message: "Vui lòng chọn ngày xuất bản" },
              ]}
            >
              <RangePicker format="YYYY-MM-DD" style={{ height: '40px', width: '100%' }} />
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
                  style={{ width: "100%", height: '40px' }}
                  min={0}
                />
              </Form.Item>


              <Form.Item
                name="isbn"
                label="Mã ISBN"
                rules={[
                  { required: true, message: "Vui lòng nhập mã ISBN" },
                ]}
              >
                <Input placeholder="Nhập mã ISBN" style={{ height: '40px' }} />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <div style={{ textAlign: "center", marginBottom: "8px" }}>
              Tải Ảnh Lên
            </div>
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
          label="Mô Tả"
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
