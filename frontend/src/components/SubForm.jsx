import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SubForm = ({ formFields, onchange, clearEntries }) => {
  const [entries, setEntries] = useState([]);
  const [SubFormData, setSubFormData] = useState({});
  const [alert, setalert] = useState([]);

  useEffect(() => {
    if (alert.length > 0) {
      const timer = setTimeout(() => {
        setalert((prev) => prev.slice(1));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const showAlert = (alert) => {
    setalert((prev) => [...prev, alert]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = formFields.every((field) =>
      field.required ? SubFormData[field.name] : true
    );

    if (!isValid) {
      showAlert({ type: "danger", msg: "Please fill all the details" });
      return;
    }

    setEntries((prev) => [...prev, SubFormData]);
    setSubFormData({});
    showAlert({ type: "success", msg: "Successfully Added" });
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

  const handleDate = (data) => {
    showAlert({ type: data.type, msg: data.msg });
  };

  const handleChange = (e, field) => {
    const Value = e.target.value;
    if (
      field?.validation &&
      !field.validation(Value, SubFormData, (data) => handleDate(data))
    ) {
      return;
    }

    const { name, value } = e.target;
    setSubFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleChange = (key, value) => {
    setSubFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      {entries &&
        entries.length > 0 &&
        entries.map((entry, entryIndex) => (
          <Preview key={entryIndex}>
            {formFields.map((field, fieldIndex) => (
              <SubPreviews key={fieldIndex}>
                {field.type === "subform" && entry[field.name] ? (
                  entry[field.name].map((subEntry, subIndex) => (
                    <SubPreviews key={subIndex}>
                      {field.fields.map((subField, subFieldIndex) => (
                        <SubPreviews key={subFieldIndex}>
                          {subField.type === "subform" &&
                          subEntry[subField.name] ? (
                            subEntry[subField.name].map(
                              (miniSubEntry, miniSubIndex) => (
                                <SubPreviews key={miniSubIndex}>
                                  {subField.fields.map(
                                    (miniSubField, miniSubFieldIndex) => (
                                      <PrevSubInputBox key={miniSubFieldIndex}>
                                        <Strong>{miniSubField.label}:</Strong>
                                        <SubLabel>
                                          {miniSubEntry[miniSubField.name]}
                                        </SubLabel>
                                      </PrevSubInputBox>
                                    )
                                  )}
                                </SubPreviews>
                              )
                            )
                          ) : (
                            <PrevSubInputBox key={subFieldIndex}>
                              <Strong>{subField.label}:</Strong>
                              <SubLabel>{subEntry[subField.name]}</SubLabel>
                            </PrevSubInputBox>
                          )}
                        </SubPreviews>
                      ))}
                    </SubPreviews>
                  ))
                ) : (
                  <PrevSubInputBox key={fieldIndex}>
                    <Strong>{field.label}:</Strong>
                    <SubLabel>{entry[field.name]}</SubLabel>
                  </PrevSubInputBox>
                )}
              </SubPreviews>
            ))}
            <DelSubButtonBox>
              <DelSubButton onClick={() => handleDelete(entryIndex)}>
                Delete
              </DelSubButton>
            </DelSubButtonBox>
          </Preview>
        ))}

      <SubData>
        {formFields.map((field, index) => (
          <SubForms key={index}>
            {field.type === "subform" ? (
              <FormInputBox>
                <FieldContainer key={index}>
                  <Label>{field.label}</Label>
                  <SubForm
                    formFields={field.fields}
                    onchange={(data) => HandleChange(field.name, data)}
                    clearEntries={clearEntries}
                  />
                </FieldContainer>
              </FormInputBox>
            ) : (
              <SubInputBox>
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
            )}
          </SubForms>
        ))}

        {alert.length > 0 && (
          <div
            className={`alert alert-${alert[0].type}`}
            role="alert"
            style={{ marginInline: "1rem" }}
          >
            {alert[0].msg}
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

const Label = styled.label`
  border-radius: 10px 10px 0 0;
  background-color: black;
  max-height: max-content;
  padding: 0.5rem;
  width: 100%;
  color: white;
`;

const FieldContainer = styled.div`
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  max-height: max-content;
  padding-bottom: 0.5rem;
  border-radius: 10px;
  margin: 2rem 0;

  @media (max-width: 450px) {
    margin: 1.5rem 0;
  }
`;

const FormInputBox = styled.div`
  max-height: max-content;
  padding: 0 1.5rem;
  @media (max-width: 450px) {
    margin-top: 0.5rem;
  }
`;

const SubForms = styled.div`
  max-height: max-content;
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

const SubPreviews = styled.div`
  max-height: max-content;
`;

export default SubForm;
