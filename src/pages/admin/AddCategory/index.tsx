import { Button, Form, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';
import { addCourse } from '../../../api/courses';
import { ICourses } from '../../../types/ICourses';
import { addCategory } from '../../../api/categories';
import ICategory from '../../../types/ICategory';

export default function AddCategory() {
  const navigate = useNavigate();

  const onFinish = (values: ICategory) => {
    addCategory(values).then(() => {
      alert('Thêm sản phẩm thành công!');
      navigate('/admin/category');
    });
  };

  type FieldType = {
    name: string;
  };
  return (
    <Form
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
          { required: true, message: 'Vui lòng nhập tên sản phẩm' },
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
          onClick={() => navigate('/admin')}>
          Back
        </Button>
      </Form.Item>
    </Form>
  );
}
