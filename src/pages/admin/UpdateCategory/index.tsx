import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneCategory, updateCategory } from '../../../api/categories';
import ICategory from '../../../types/ICategory';
import { ICourses } from '../../../types/ICourses';

export default function UpdateCategory() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<ICategory>();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    getOneCategory(id).then(({ data }) => {
      setCategory(data);
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      name: category?.name,
    });
  }, [category]);

  const onFinish = (values: ICourses) => {
    updateCategory({ ...values, id }).then(() => {
      alert('Cập nhật sản phẩm thành công!');
      return navigate('/admin/category');
    });
  };

  type FieldType = {
    name: string;
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
        label='Tên danh mục'
        name='name'
        rules={[
          { required: true, message: 'Vui lòng nhập tên danh mục' },
          { min: 3, message: 'Ít nhất 3 ký tự' },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
        <Button
          type='primary'
          danger
          style={{ marginLeft: '8px' }}
          onClick={() => navigate('/admin/category')}>
          Back
        </Button>
      </Form.Item>
    </Form>
  );
}
