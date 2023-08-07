import { Button, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllRole, getOneUser, updateUser } from '../../../api/user';
import IUser from '../../../types/IUser';
import IRole from '../../../types/IRole';

export default function UpdateUser() {
  const { id } = useParams<{ id: string }>();
  const [roles, setRoles] = useState<IRole[]>([]);
  const [user, setUser] = useState<IUser>();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    getOneUser(id).then(({ data }) => {
      setUser(data);
    });
    getAllRole().then(({ data }) => setRoles(data));
  }, [id]);
  console.log(user);

  useEffect(() => {
    form.setFieldsValue({
      name: user?.name,
      password: user?.password,
      roleId: user?.roleId,
    });
  }, [user, form]);

  const onFinish = (values: IUser) => {
    updateUser({ ...values, id }).then(() => {
      alert('Cập nhật sản phẩm thành công!');
      return navigate('/admin/user');
    });
  };

  type FieldType = {
    name: string;
    password: string;
    roleId: number;
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
