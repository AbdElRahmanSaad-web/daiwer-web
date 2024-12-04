import React, { useEffect, useState } from 'react';
import { Button, Space, Table, message } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import DashboardLayout from '../../components/DashboardLayout';

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  email: string;
  username: string;
  phone: string;
  joining_date: string;
  barcode: string;
}

const User: React.FC = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  
  const [params, setParams] = useState({
    sort: 'email',
    order: 'asc',
    page: 1,
    pageSize: 10,
    filter: '',
    fromDate: '',
    toDate: '',
  });

  // Fetch users from API with dynamic parameters
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const queryString = new URLSearchParams(params).toString(); // Dynamically build query string

    try {
      const response = await fetch(
        `https://api.daiwer.com/api/v1.0/users?${queryString}`, 
        {
          headers: {
            Accept: 'application/json',
            'X-Auth':localStorage.getItem("auth_token"),
            'Content-Type': 'application/json',
            'Client-key': 'Ph!no!icApp',
          },
        }
      );
      const result = await response.json();

      if (result.code === '0000') {
        const fetchedUsers = result.data.data.map((user: any) => ({
          key: user._id,
          email: user.email,
          username: user.username,
          phone: user.phone,
          joining_date: user.joining_date,
          barcode: user.barcodes[0]?.barcode || 'N/A',
        }));
        setUsers(fetchedUsers);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]); // Refetch data when parameters change

  const handleTableChange: OnChange = (pagination, filters, sorter) => {
    const newParams = {
      ...params,
      page: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
      sort: sorter?.columnKey || 'email',
      order: sorter?.order === 'ascend' ? 'asc' : 'desc',
    };
    setParams(newParams); // Update params dynamically
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setParams({
      sort: 'email',
      order: 'asc',
      page: 1,
      pageSize: 10,
      filter: '',
      fromDate: '',
      toDate: '',
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'username' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      ellipsis: true,
    },
    {
      title: 'Joining Date',
      dataIndex: 'joining_date',
      key: 'joining_date',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'joining_date' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
      ellipsis: true,
    },
  ];

  if (error) {
    message.error(error);
  }

  return (
    <>
      <DashboardLayout>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={clearFilters}>Clear Filters</Button>
          <Button onClick={clearAll}>Clear All</Button>
        </Space>
        <Table<DataType>
          columns={columns}
          dataSource={users}
          loading={loading}
          onChange={handleTableChange} // Handle dynamic table changes
          pagination={{
            current: params.page,
            pageSize: params.pageSize,
            total: 100, // Adjust total dynamically if available
          }}
        />
      </DashboardLayout>
    </>
  );
};

export default User;
