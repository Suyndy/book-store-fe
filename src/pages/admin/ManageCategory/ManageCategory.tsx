import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message, Table } from "antd";
import { categoryService } from "../../../core/services/category.service";
import { FaPenToSquare } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";

const ManageCategory = () => {
  const [action, setAction] = useState<"save" | "update">("save");
  const [itemCate, setItemCate] = useState<any>(null);

  const { data: categoryData, refetch } = useQuery({
    queryKey: ["category"],
    queryFn: categoryService.getAllCategory,
  });

  const [form] = useForm();

  const { mutate: saveCategory } = useMutation({
    mutationFn: categoryService.saveCategory,
    onSuccess: () => {
      message.success("Tạo category thành công");
      form.resetFields();
      refetch();
    },
    onError: () => {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại sau.");
    },
  });

  useEffect(() => {
    if (itemCate) {
      form.setFieldsValue({
        name: itemCate?.name,
        description: itemCate?.description,
      });
    } else {
      form.resetFields();
    }
  }, [itemCate]);

  const { mutate: deleteCategory } = useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: () => {
      message.success("Xóa category thành công");
      form.resetFields();
      refetch();
    },
    onError: () => {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại sau.");
    },
  });

  console.log(action);

  const { mutate: updateCategory } = useMutation({
    mutationFn: categoryService.updateCategory,
    onSuccess: () => {
      message.success("Cập nhật category thành công");
      form.resetFields();
      refetch();
      setAction("save");
    },
    onError: () => {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại sau.");
    },
  });

  const handleSaveCategory = (values: any) => {
    if (action === "save") {
      saveCategory(values);
    } else if (action === "update") {
      updateCategory({ id: itemCate?.id, data: values });
    }
  };

  const columns: any = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
    },
  ];

  function formatDate(isoString: any) {
    // Create a Date object from the ISO string
    const date = new Date(isoString);

    // Extract day, month, year, hours, minutes, and seconds
    const day = String(date.getDate()).padStart(2, "0"); // Ensure day is two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0"); // Ensure hours are two digits
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Ensure minutes are two digits
    const seconds = String(date.getSeconds()).padStart(2, "0"); // Ensure seconds are two digits

    // Return the date and time in dd-mm-yyyy hh:mm:ss format
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const datas: any = categoryData?.map((item: any) => {
    return {
      key: item?.id,
      id: item?.id,
      name: item?.name,
      description: item?.description,
      created_at: formatDate(item?.created_at),
      updated_at: formatDate(item?.updated_at),
      action: (
        <div className="flex gap-4 justify-center">
          <FaPenToSquare
            onClick={() => {
              setAction("update");
              setItemCate(item);
            }}
            size={20}
            color="green"
          />{" "}
          <AiOutlineDelete
            onClick={() => deleteCategory(item?.id)}
            size={20}
            color="red"
            className="cursor-pointer"
          />
        </div>
      ),
    };
  });
  return (
    <div className="bg-white p-5 grid grid-cols-1 rounded-md">
      <div className="font-bold">Danh mục sách</div>
      <div className="grid grid-cols-3 gap-5">
        <div>
          <Form
            onFinish={handleSaveCategory}
            layout="vertical"
            className="space-y-4"
            form={form}
          >
            <Form.Item
              name="name"
              label="Tên danh mục"
              className="font-semibold text-lg text-gray-700"
              rules={[
                { required: true, message: "Vui lòng nhập tên danh mục." },
              ]}
            >
              <Input
                placeholder="Nhập tên danh mục"
                className="border-gray-300 shadow-sm"
              />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              className="font-semibold text-lg text-gray-700"
            >
              <Input
                placeholder="Nhập mô tả"
                className="border-gray-300 shadow-sm"
              />
            </Form.Item>
            <div className="flex space-x-4">
              <Button
                onClick={() => {
                  form.resetFields();
                  setAction("save");
                  setItemCate(null);
                }}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Hủy
              </Button>
              <Button
                htmlType="submit"
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Lưu
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <div>Danh sách danh mục</div>
          <Table
            columns={columns}
            dataSource={datas}
            pagination={{ pageSize: 5 }}
            className="h-[400px] overflow-y-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
