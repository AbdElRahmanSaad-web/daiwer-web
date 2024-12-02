import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Button, Checkbox, message } from "antd";
import { signup } from "../../apis";
import { countries } from "country-data";

const { Option } = Select;

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [typeChecked, setTypeChecked] = useState<"0" | "1">("0");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [countryData, setCountryData] = useState<
    { country_code: string; countryCallingCode: string }[]
  >([]);


  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/register');
    } else {
      navigate('/');
    }
  }, []);

  const handleCheckboxChange = (option: "0" | "1") => {
    setTypeChecked(option);
  };

  // Fetch country data from country-data package
  useEffect(() => {
    const countryList = Object.values(countries.all).map((country: any) => ({
      country_code: country.alpha2,
      countryCallingCode: country.countryCallingCodes[0],
    }));
    setCountryData(countryList);
  }, []);

  // Monitor the form fields and checkboxes to control the button state
  useEffect(() => {
    const values = form.getFieldsValue();
    const allFieldsFilled =
      values.username &&
      values.email &&
      values.phone &&
      values.password &&
      values.confirm &&
      typeChecked &&
      values.privacy &&
      values.marketing &&
      values.terms &&
      values.updates;

    setIsButtonDisabled(!allFieldsFilled);
  }, [form, typeChecked]);

  const onFinish = async (values: any) => {
    console.log("Form Submitted:", values);

    const selectedCountry = countryData.find(
      (country) => country.countryCallingCode === values.prefix
    );

    const userData = {
      username: values.username,
      email: values.email,
      country_code: selectedCountry?.country_code || "",
      phone: `${values.prefix} ${values.phone}`,
      password: values.password,
      user_type: typeChecked,
    };
    console.log("userData: ", userData);

    try {
      const response = await fetch(signup, {
        method: "POST",
        headers: {
          "Client-key": "Ph!no!icApp",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.code === "0000") {
        message.success("Registration successful!");
        navigate("/login");
      } else {
        message.error("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error during api call", error);
      message.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: '90%',
          maxWidth: '400px',
        }}>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            prefix:
              countryData.length > 0 ? countryData[0].countryCallingCode : "+247", // Default to the first country calling code
          }}
          layout="vertical"
          style={{ maxWidth: "600px", margin: "0 auto" }}
          onValuesChange={() => {
            const values = form.getFieldsValue();
            const allFieldsFilled =
              values.username &&
              values.email &&
              values.phone &&
              values.password &&
              values.confirm &&
              typeChecked &&
              values.privacy &&
              values.marketing &&
              values.terms &&
              values.updates;

            setIsButtonDisabled(!allFieldsFilled);
          }}
        >
          {/* Username */}
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* Country Code and Phone Number */}
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please input your phone number!" }]}
          >
            <Input
              addonBefore={
                <Form.Item name="prefix" noStyle>
                  <Select style={{ width: 150 }}>
                    {countryData.map((country, index) => (
                      <Option
                        key={`${country.country_code}-${index}`}
                        value={country.countryCallingCode}
                      >
                        {country.countryCallingCode} {country.country_code}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              }
              placeholder="Enter your phone number"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters long!" },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          {/* Waste Generator and Collector Checkboxes */}
          <Form.Item label="Type" required>
            <Checkbox
              checked={typeChecked === "0"}
              onChange={() => handleCheckboxChange("0")}
            >
              Waste Generator
            </Checkbox>
            <Checkbox
              checked={typeChecked === "1"}
              onChange={() => handleCheckboxChange("1")}
            >
              Collector
            </Checkbox>
          </Form.Item>

          {/* Privacy Checkbox */}
          <Form.Item name="privacy" valuePropName="checked">
            <Checkbox>
              We care about your privacy and will not share your information with
              external parties.
            </Checkbox>
          </Form.Item>

          {/* Marketing Research Checkbox */}
          <Form.Item name="marketing" valuePropName="checked">
            <Checkbox>
              We allow you to use this information for marketing research purposes.
            </Checkbox>
          </Form.Item>

          {/* Terms & Conditions Checkbox */}
          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must accept the terms!")),
              },
            ]}
          >
            <Checkbox>I agreed on the Terms & Conditions</Checkbox>
          </Form.Item>

          {/* Updates Checkbox */}
          <Form.Item name="updates" valuePropName="checked">
            <Checkbox>I'd like to receive updates via email</Checkbox>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={isButtonDisabled}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
