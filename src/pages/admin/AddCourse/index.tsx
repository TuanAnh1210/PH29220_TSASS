import { Button, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import { addCourse } from "../../../api/courses";
import { ICourses } from "../../../types/ICourses";
import ICategory from "../../../types/ICategory";
import { getAllCategory } from "../../../api/categories";
import { useEffect, useState } from "react";

export default function AddCourse() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategory().then(({ data }) => setCategories(data));
  }, []);

  const onFinish = (values: ICourses) => {
    addCourse(values).then(() => {
      alert("Thêm sản phẩm thành công!");
      navigate("/admin/course");
    });
  };

  type FieldType = {
    name: string;
    price: number;
    old_price: number;
    image: string;
    description: string;
    categoryId: number;
  };
  return (
    <>
      <h2>Thêm mới khóa học</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên sản phẩm" },
            { min: 3, message: "Ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Danh mục"
          name="categoryId"
          rules={[{ required: true, message: "Vui lòng chọn danh mục " }]}
        >
          <Select
            options={categories?.map((category: ICategory) => ({
              value: category.id,
              label: category.name,
            }))}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giá gốc"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Giá bán"
          name="old_price"
          rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Ảnh"
          name="image"
          rules={[
            { required: true, message: "Vui lòng nhập giá sản phẩm" },
            { min: 1, message: "Vui lòng nhập giá sản phẩm" },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Mô tả"
          name="description"
          rules={[
            { required: true, message: "Vui lòng nhập mô tả sản phẩm" },
            { min: 6, message: "Vui lòng nhập ít nhất 6 kí tự" },
          ]}
        >
          <TextArea style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            type="primary"
            danger
            style={{ marginLeft: "8px" }}
            onClick={() => navigate("/admin/course")}
          >
            Back
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
