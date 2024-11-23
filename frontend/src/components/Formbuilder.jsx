import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FormFields } from "./DataArray";
import DotSpinner from "./Spinner_1";
import SubForm from "./SubForm";
import axios from "axios";

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
  const [formState, setformState] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setpreview] = useState(null);
  const [alert, setalert] = useState(null);
  const [loading, setloading] = useState(false);
  const [clearEntries, setclearEntries] = useState(false);

  const [clearFile, setclearFile] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [clearFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      setloading(true);
      const cloudName = "duozomapm";
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "UVCE_FORM_PRESET");

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );

        const docRef = await addDoc(collection(db, "formSubmissions"), {
          ...formState,
          Profile: res.data.secure_url,
        });

        setalert({ type: "success", msg: "Form submitted successfully!" });
        setTimeout(() => {
          setalert(null);
        }, 1000);

        setformState({});
        setloading(false);
        setImage(null);
        setpreview(null);
        setclearFile(!clearFile);
        setclearEntries(!clearEntries);
      } catch (error) {
        setalert({ type: "danger", msg: "Error submitting the form!" });
        setTimeout(() => {
          setalert(null);
        }, 1000);
      }
    } else {
      setalert({ type: "danger", msg: "Please Upload the Image" });
      setTimeout(() => {
        setalert(null);
      }, 1000);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setpreview(reader.result);
    };
    reader.readAsDataURL(file);
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
            if (field.type === "file") {
              return (
                <FieldContainer key={index}>
                  <Label>{field.label}</Label>
                  {preview && <Image src={preview} alt="Preview" />}
                  <Input
                    ref={fileInputRef}
                    type={field.type}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </FieldContainer>
              );
            }

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
                    clearEntries={clearEntries}
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

          <Button type="submit">{loading ? <DotSpinner /> : "Submit"}</Button>
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
  padding: 1rem;
  width: 100%;
`;

const Image = styled.img`
  max-height: max-content;
  width: 100%;
`;

export default Formbuilder;
