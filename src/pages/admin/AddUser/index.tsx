import { Button, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser, getAllRole } from '../../../api/user';
import IRole from '../../../types/IRole';
import IUser from '../../../types/IUser';

export default function AddUser() {
  const [roles, setRoles] = useState<IRole[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRole().then(({ data }) => setRoles(data));
  }, []);

  const onFinish = (values: IUser) => {
    addUser(values).then(() => {
      alert('Thêm sản phẩm thành công!');
      navigate('/admin/user');
    });
  };

  type FieldType = {
    name: string;
    password: string;
    roleId: number;
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
        label='Tên'
        name='name'
        rules={[
          { required: true, message: 'Vui lòng nhập tên ' },
          { min: 3, message: 'Ít nhất 3 ký tự' },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label='Mật khẩu'
        name='password'
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu ' },
          { min: 6, message: 'Ít nhất 6 ký tự' },
        ]}>
        <Input.Password />
      </Form.Item>
      <Form.Item<FieldType>
        label='Quyền'
        name='roleId'
        rules={[{ required: true, message: 'Vui lòng chọn quyền ' }]}>
        <Select
          options={roles?.map((role) => ({ value: role.id, label: role.name }))}
        />
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
