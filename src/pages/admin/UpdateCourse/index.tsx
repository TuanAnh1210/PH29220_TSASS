import { Button, Form, Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneCourse, updateCourse } from '../../../api/courses';
import { ICourses } from '../../../types/ICourses';
import { getAllCategory } from '../../../api/categories';
import ICategory from '../../../types/ICategory';

export default function UpdateCourse() {
  const { id } = useParams<{ id: string }>();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [course, setCourse] = useState<ICourses>();

  const [form] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategory().then(({ data }) => setCategories(data));
    getOneCourse(id).then(({ data }) => {
      setCourse(data);
    });
  }, [id]);

  useEffect(() => {
    form.setFieldsValue({
      name: course?.name,
      price: course?.price,
      old_price: course?.old_price,
      image: course?.image,
      description: course?.description,
      categoryId: course?.categoryId,
    });
  }, [course, form]);

  const onFinish = (values: ICourses) => {
    updateCourse({ ...values, id }).then(() => {
      alert('Cập nhật sản phẩm thành công!');
      return navigate('/admin/course');
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
    <Form
      form={form}
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete='off'>
      <Form.Item<FieldType>
        label='Tên sản phẩm'
        name='name'
        rules={[
          { required: true, message: 'Vui lòng nhập tên sản phẩm' },
          { min: 3, message: 'Ít nhất 3 ký tự' },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label='Danh mục'
        name='categoryId'
        rules={[{ required: true, message: 'Vui lòng chọn danh mục ' }]}>
        <Select
          options={categories?.map((category: ICategory) => ({
            value: category.id,
            label: category.name,
          }))}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label='Giá gốc'
        name='price'
        rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item<FieldType>
        label='Giá bán'
        name='old_price'
        rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item<FieldType>
        label='Ảnh'
        name='image'
        rules={[
          { required: true, message: 'Vui lòng nhập giá sản phẩm' },
          { min: 1, message: 'Vui lòng nhập giá sản phẩm' },
        ]}>
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item<FieldType>
        label='Mô tả'
        name='description'
        rules={[
          { required: true, message: 'Vui lòng nhập mô tả sản phẩm' },
          { min: 6, message: 'Vui lòng nhập giá sản phẩm' },
        ]}>
        <TextArea style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
        <Button
          type='primary'
          danger
          style={{ marginLeft: '8px' }}
          onClick={() => navigate('/admin/course')}>
          Back
        </Button>
      </Form.Item>
    </Form>
  );
}
