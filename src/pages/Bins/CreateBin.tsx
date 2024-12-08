// import DashboardLayout from "../../components/DashboardLayout";

// const CreateBin: React.FC = () => {
//   return (
//     <DashboardLayout>
//       <h1>Create bin page</h1>
//     </DashboardLayout>
//   );
// };

// export default CreateBin;
import React, { useState } from "react";
import { Input, List, Typography } from "antd";

const { Title } = Typography;

const CreateBin: React.FC = () => {
  const data = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
    { id: 4, name: "Date" },
    { id: 5, name: "Elderberry" },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState(data);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
    setIsDropdownVisible(true);
  };

  const handleSelect = (item: string) => {
    setSearchTerm(item);
    setIsDropdownVisible(false);
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <Title level={4} style={{ textAlign: "center" }}>
        Dynamic Dropdown List
      </Title>
      <Input
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setIsDropdownVisible(true)}
        onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #d9d9d9",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      />
      {isDropdownVisible && (
        <List
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
            marginTop: "5px",
            maxHeight: "200px",
            overflowY: "auto",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          dataSource={filteredData}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: "10px 15px",
                cursor: "pointer",
                backgroundColor: "white",
                borderBottom: "1px solid #f0f0f0",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
              onClick={() => handleSelect(item.name)}
            >
              <span
                style={{
                  fontWeight:
                    searchTerm &&
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                      ? "bold"
                      : "normal",
                  color: "#333",
                }}
              >
                {item.name}
              </span>
            </List.Item>
          )}
          locale={{ emptyText: "No items found" }}
        />
      )}
    </div>
  );
};

export default CreateBin;
