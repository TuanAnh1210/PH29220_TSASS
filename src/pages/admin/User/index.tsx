import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, getAllRole, getAllUser } from '../../../api/user';
import IUser from '../../../types/IUser';
import IRole from '../../../types/IRole';
interface DataType {
  [x: string]: any;
  key: string;
  name: string;
}

const User = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    getAllUser().then((res) => setUsers(res.data));
    getAllRole().then((res) => setRoles(res.data));
  }, []);

  const newUser = useMemo(() => {
    return users.map((user) => {
      const role = roles.find((role) => role.id === user.roleId);
      return {
        ...user,
        roleId: role?.name,
      };
    });
  }, [users]);

  const handleDelete = (id: number) => {
    if (confirm('Bạn chắc chắn muốn xóa')) {
      deleteUser(id).then(() => {
        setUsers(users.filter((user: IUser) => user.id !== id));
      });
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Role',
      dataIndex: 'roleId',
      key: 'roleId',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Link to={`/admin/update-user/${record.id}`}>
            <Button type='primary'>Edit</Button>
          </Link>
          <Button onClick={() => handleDelete(record.id)} type='primary' danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Link to={'/admin/add-user'}>
        <Button type='primary' ghost>
          Add new User
        </Button>
      </Link>
      <Table
        style={{ marginTop: '20px' }}
        columns={columns}
        dataSource={newUser}
      />
    </>
  );
};

export default User;
