import React, { useState } from "react";
import { styled } from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FormFields } from "./DataArray";
import SubForm from "./SubForm";

const firebaseConfig = {
  apiKey: "AIzaSyCCEvPulWoPOep_9rtoSxQxch599sPZqJk",
  authDomain: "forms-c4eb8.firebaseapp.com",
  projectId: "forms-c4eb8",
  storageBucket: "forms-c4eb8.firebasestorage.app",
  messagingSenderId: "293870870373",
  appId: "1:293870870373:web:9cc9808710c0893bc60b8c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Formbuilder = () => {
  const [entries, setEntries] = useState([]);
  const [formState, setformState] = useState({});
  const [alert, setalert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "formSubmissions"), formState);
      setalert({ type: "success", msg: "Form submitted successfully!" });
      setformState({});
      setEntries({});
    } catch (error) {
      setalert({ type: "danger", msg: "Error submitting the form!" });
    }
  };

  const HandleChange = (key, value) => {
    setformState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChange = (e, field) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    const Value = e.target.value;
    if (field?.validation && !field.validation(Value)) {
      return;
    }

    const { name, value } = e.target;
    HandleChange(name, value);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Hero>
          <H1>Faculty Curriculum Vitae</H1>
          <P>
            for UVCE Website<A href="/www.uvce.ac.in">www.uvce.ac.in</A>
          </P>
          {FormFields.map((field, index) => {
            if (field.type === "textarea") {
              return (
                <FieldContainer key={index}>
                  <Label>{field.label}</Label>
                  <Desc
                    placeholder={field.placeholder}
                    value={(formState && formState[field.name]) || ""}
                    onChange={(e) => handleChange(e, field)}
                    name={field.name}
                    spellCheck="true"
                    required={field.required}
                  />
                </FieldContainer>
              );
            }

            if (field.type === "subform") {
              return (
                <FieldContainer key={index}>
                  <Label>{field.label}</Label>
                  <SubForm
                    formFields={field.fields}
                    onchange={(data) => HandleChange(field.name, data)}
                    entries={entries}
                    setEntries={setEntries}
                  />
                </FieldContainer>
              );
            }

            return (
              <FieldContainer key={index}>
                <Label>{field.label}</Label>
                <Input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={(formState && formState[field.name]) || ""}
                  onChange={(e) => handleChange(e, field)}
                  required={field.required}
                />
              </FieldContainer>
            );
          })}

          {alert && (
            <div className={`alert alert-${alert.type}`} role="alert">
              {alert.msg}
            </div>
          )}

          <Button type="submit">Submit</Button>
        </Hero>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  max-height: max-content;
  width: 100%;
`;

const Form = styled.form`
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  scrollbar-width: none;
  border-radius: 10px;
  overflow-y: auto;
  height: 100vh;
  max-width: 40%;
  margin: auto;
  padding: 2rem;

  @media (max-width: 450px) {
    max-width: 100%;
    padding: 1.2rem;
  }
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

const Hero = styled.div`
  max-height: max-content;
`;

const H1 = styled.h1`
  max-height: max-content;
  text-align: center;
`;

const Label = styled.label`
  border-radius: 10px 10px 0 0;
  background-color: black;
  max-height: max-content;
  padding: 0.5rem;
  width: 100%;
  color: white;
`;

const P = styled.p`
  max-height: max-content;
  text-align: center;
`;

const A = styled.a`
  max-height: max-content;
  margin-left: 0.5rem;
`;

const Desc = styled.textarea`
  width: 90%;
  border: none;
  outline: none;
  display: block;
  resize: none;
  margin: 0.5rem 0 1rem 1rem;
  border-bottom: 2px solid black;
`;

const Input = styled.input`
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
`;

const Button = styled.button`
  background-color: cyan;
  max-height: max-content;
  border-radius: 10px;
  font-weight: 700;
  margin: 1rem 0;
  width: 100%;
`;

export default Formbuilder;
