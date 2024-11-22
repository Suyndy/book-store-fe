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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useStoreContext } from "../../../context/MyContext";
import styles from "./ModalFormLaptop.module.scss";
import { FaPlus } from "react-icons/fa";

const ModalFormLaptop = ({
  visible,
  onCancel,
  onSubmit,
  title = "THÊM LAPTOP MỚI",
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
              name="name"
              label="Tên Laptop"
              rules={[
                { required: true, message: "Vui lòng nhập tên sản phẩm" },
              ]}
            >
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>

            <Form.Item
              name="brand"
              label="Thương Hiệu"
              rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}
            >
              <Select placeholder="Chọn thương hiệu">
                {options?.brands?.map((item: any) => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
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
                  style={{ width: "100%" }}
                  min={0}
                />
              </Form.Item>
              <Form.Item
                name="quantity"
                label="Số Lượng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng sản phẩm",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Nhập số lượng"
                  style={{ width: "100%" }}
                  min={0}
                />
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
          <Input.TextArea placeholder="Nhập mô tả sản phẩm" rows={3} />
        </Form.Item>

        <Form.Item
          label={<div className={styles.session}>Thông Số Kỹ Thuật</div>}
        >
          <div className={styles.Specifications}>
            <Form.Item
              name={["specs", "processor"]}
              label="Bộ Xử Lý (Processor)"
              rules={[{ required: true, message: "Vui lòng chọn bộ xử lý" }]}
            >
              <Select placeholder="Chọn bộ xử lý">
                {options?.processors?.map((item: any) => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name={["specs", "ram"]}
              label="Bộ Nhớ RAM"
              rules={[{ required: true, message: "Vui lòng chọn RAM" }]}
            >
              <Select placeholder="Chọn RAM">
                {options?.ram?.map((item: any) => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name={["specs", "storage"]}
              label="Dung Lượng Lưu Trữ"
              rules={[
                { required: true, message: "Vui lòng chọn dung lượng lưu trữ" },
              ]}
            >
              <Select placeholder="Chọn dung lượng lưu trữ">
                {options?.storage?.map((item: any) => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className={styles.Specifications}>
            <Form.Item
              name={["specs", "screen"]}
              label="Kích Thước Màn Hình"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn kích thước màn hình",
                },
              ]}
            >
              <Select placeholder="Chọn kích thước màn hình">
                {options?.screenSizes?.map((item: any) => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name={["specs", "battery"]}
              label="Thời Lượng Pin"
              rules={[
                { required: true, message: "Vui lòng chọn thời lượng pin" },
              ]}
            >
              <Select placeholder="Chọn thời lượng pin">
                {options?.battery?.map((item: any) => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name={["specs", "weight"]}
              label="Trọng Lượng (kg)"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trọng lượng sản phẩm",
                },
              ]}
            >
              <Input placeholder="Nhập trọng lượng" />
            </Form.Item>
          </div>
        </Form.Item>

        <div className={styles.button}>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalFormLaptop;
