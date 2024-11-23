import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SubForm = ({ formFields, onchange, clearEntries }) => {
  const [entries, setEntries] = useState([]);
  const [SubFormData, setSubFormData] = useState({});
  const [alert, setalert] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = formFields.every((field) =>
      field.required ? SubFormData[field.name] : true
    );

    if (!isValid) {
      setalert({ type: "danger", msg: "Please fill all the details" });
      setTimeout(() => {
        setalert(null);
      }, 1500);
      return;
    }

    setEntries((prev) => [...prev, SubFormData]);
    setSubFormData({});
    setalert({ type: "success", msg: "Successfully Added" });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };

  useEffect(() => {
    setEntries([]);
  }, [clearEntries]);

  useEffect(() => {
    onchange(entries);
  }, [entries]);

  const handleDelete = (index) => {
    setEntries((prev) => prev.filter((_, i) => i != index));
  };

  const handleChange = (e, field) => {
    const Value = e.target.value;
    if (field?.validation && !field.validation(Value)) {
      setalert({
        type: "danger",
        msg: `You cannot exceed limit of ${field.name}`,
      });
      setTimeout(() => {
        setalert(null);
      }, 1500);
      return;
    }

    const { name, value } = e.target;
    setSubFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {entries &&
        entries.length > 0 &&
        entries.map((entry, index) => (
          <Preview key={index}>
            {formFields.map((field, index) => (
              <PrevSubInputBox key={index}>
                <Strong>{field.label}:</Strong>
                <SubLabel>{entry[field.name]}</SubLabel>
              </PrevSubInputBox>
            ))}
            <DelSubButtonBox>
              <DelSubButton onClick={() => handleDelete(index)}>
                Delete
              </DelSubButton>
            </DelSubButtonBox>
          </Preview>
        ))}

      <SubData>
        {formFields.map((field, index) => (
          <SubInputBox key={field.name}>
            <SubLabel htmlFor={field.name}>{field.label}:</SubLabel>
            {field.type === "select" ? (
              <Select
                id={field.name}
                name={field.name}
                value={(SubFormData && SubFormData[field.name]) || ""}
                onChange={(e) => handleChange(e, field)}
              >
                <Option value="">Select {field.label}</Option>
                {field.options.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            ) : field.type === "date" ? (
              <SubInput
                type="date"
                name={field.name}
                value={(SubFormData && SubFormData[field.name]) || ""}
                onChange={(e) => handleChange(e, field)}
                max={new Date().toISOString().split("T")[0]}
              />
            ) : (
              <SubInput
                id={field.name}
                type={field.type}
                name={field.name}
                value={(SubFormData && SubFormData[field.name]) || ""}
                onChange={(e) => handleChange(e, field)}
              ></SubInput>
            )}
          </SubInputBox>
        ))}

        {alert && (
          <div
            className={`alert alert-${alert.type}`}
            role="alert"
            style={{ marginInline: "1rem" }}
          >
            {alert.msg}
          </div>
        )}

        <SubButtonBox>
          <SubButton onClick={(e) => handleSubmit(e)}>Add</SubButton>
        </SubButtonBox>
      </SubData>
    </>
  );
};

const SubData = styled.div`
  max-height: max-content;
  border-radius: 10px;
  max-width: 100%;
`;

const SubInputBox = styled.div`
  max-height: max-content;
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 0.5rem;
  align-items: center;

  @media (max-width: 450px) {
    margin-top: 0.5rem;
  }
`;

const PrevSubInputBox = styled(SubInputBox)`
  grid-template-columns: 1fr 2fr;
`;

const Select = styled.select`
  margin: 1rem 0 1rem 1rem;
  height: 25px;
  border-radius: 40px;
  padding-left: 0.5rem;
  max-width: 80%;
`;

const Option = styled.option`
  max-height: max-content;
`;

const SubInput = styled.input`
  width: 90%;
  border: none;
  outline: none;
  display: block;
  margin: 1rem 0 1.5rem 1rem;
  border-bottom: 2px solid black;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  max-width: 80%;
  width: 100%;
`;

const SubLabel = styled.label`
  max-height: max-content;
  margin-left: 1.5rem;
`;

const Strong = styled.strong`
  max-height: max-content;
  margin-left: 1.5rem;
`;

const SubButtonBox = styled.div`
  max-height: max-content;
  display: flex;
  justify-content: flex-end;
  width: 90%;
`;

const DelSubButtonBox = styled(SubButtonBox)``;

const SubButton = styled.button`
  max-height: max-content;
  background-color: #63c5da;
  padding: 0.5rem 1.5rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  font-weight: 700;
`;

const DelSubButton = styled(SubButton)`
  background-color: red;
  color: white;
  margin-bottom: 0.5rem;
`;

const Preview = styled(SubData)`
  padding: 1rem 0rem;
`;

export default SubForm;
