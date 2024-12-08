import { Button, message, Table, TableColumnsType } from "antd";
import DashboardLayout from "../../components/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface FetchedDataType {
  key: string;
  color: string;
  common_account: string;
  area: string;
  client: string;
  collector: string;
  status: string;
  bin_code: string;
  bin_name: string;
}
const Bin: React.FC = () => {
  const [bins, setBins] = useState<FetchedDataType[]>([]);
  const [binsLength, setBinsLength] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortField, setSortField] = useState<string>("date");
  const [orderField, setOrderField] = useState<"desc" | "asc">("desc");
  const [pageField, setPageField] = useState<number>(1);
  const [filterField, setFilterField] = useState<string>("");
  const [isActiveField, setIsActiveField] = useState<"all" | "true" | "false">(
    "all"
  );
  const navigate = useNavigate();

  const authToken = localStorage.getItem("auth_token");
  if (!authToken) {
    message.error("You are not authorized!");
    return;
  }
  const fetchBins = async () => {
    const queryString = `?sort=${sortField}&order=${orderField}&page=${pageField}&pageSize=10&filter=${filterField}&isActive=${isActiveField}`;
    try {
      const response = await fetch(
        `https://api.daiwer.com/api/v1.0/bins${queryString}`,
        {
          method: "GET",
          headers: {
            "Client-key": "Ph!no!icApp",
            "Content-Type": "application/json",
            "X-Auth": authToken,
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.code === "0000") {
        if (result.data) {
          const fetchedBins: FetchedDataType[] = result.data.data.map(
            (bin: any) => ({
              key: bin._id,
              bin_name: bin.bin_name,
              bin_code: bin.bin_code,
              color: bin.color,
              common_account: bin.common_account.username,
              area: bin.location.address,
              client: bin.clients.username,
              collector: bin.expert,
              status: bin.is_active ? "Active" : "Inactive",
            })
          );
          setBins(fetchedBins);
          setBinsLength(result.data.total_count);
        } else {
          setBins([]);
        }
        setLoading(false);
      } else {
        console.log("failed to get bins data");
      }
    } catch (error) {
      message.error("error from fetching bins");
    }
  };
  useEffect(() => {
    fetchBins();
  }, [sortField, orderField, pageField, filterField, isActiveField]);

  const handleCreateButton = () => {
    navigate("/bins/create");
  };

  const columns: TableColumnsType<FetchedDataType> = [
    {
      title: "Bin Name",
      dataIndex: "bin_name",
      key: "bin_name",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Bin Code",
      dataIndex: "bin_code",
      key: "bin_code",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Bin Color",
      dataIndex: "color",
      key: "color",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Common Account Name",
      dataIndex: "common_account",
      key: "common_account",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Collector",
      dataIndex: "collector",
      key: "collector",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      sorter: false,
      ellipsis: false,
      render: (_, record) => (
        <div>
          <EyeOutlined
            style={{ color: "#1890ff", cursor: "pointer", marginRight: "10px" }}
            onClick={() => handleView(record)}
          />
          <EditOutlined
            style={{ color: "#52c41a", cursor: "pointer", marginRight: "10px" }}
            onClick={() => handleEdit(record)}
          />
          <DeleteOutlined
            style={{ color: "#ff4d4f", cursor: "pointer", marginRight: "10px" }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  const handleView = (record: FetchedDataType) => {
    navigate(`/bins/view/${record.key}`);
  };

  const handleEdit = (record: FetchedDataType) => {
    navigate(`/bins/edit/${record.key}`);
  };

  const handleDelete = async (record: FetchedDataType) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${record.bin_name}"?`
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `https://api.daiwer.com/api/v1.0/bins/${record.key}`,
          {
            method: "DELETE",
            headers: {
              // "Client-key": "S^M@Rt_B!N",
              "Client-key": "Ph!no!icApp",
              "Content-Type": "application/json",
              "X-Auth": authToken,
              Accept: "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.code === "0000") {
          message.success("Bin deleted successfully!");
          fetchBins(); // Refresh data after deletion
        } else {
          message.error("Failed to delete bin.");
        }
      } catch (error) {
        console.log("error: ", error);
        message.error("Error occurred while deleting bin.");
      }
    }
  };

  const handleTableChange = (pagination: any, filter: any, sorter: any) => {
    setSortField(sorter.field || sortField);
    setOrderField(sorter.order === "ascend" ? "asc" : "desc");
    setPageField(pagination.current);
  };

  return (
    // <DashboardLayout>
    <div>
      <Button onClick={handleCreateButton}>Create</Button>
      <Table<FetchedDataType>
        columns={columns}
        dataSource={bins}
        loading={loading}
        onChange={handleTableChange}
        pagination={{
          current: pageField,
          pageSize: 10,
          total: binsLength,
        }}
      />
    </div>
    // </DashboardLayout>
  );
};

export default Bin;
