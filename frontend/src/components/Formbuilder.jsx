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
  const [formState, setformState] = useState(new Map());
  const [fileStates, setFileStates] = useState(new Map());
  const [image, setImage] = useState(null);
  const [preview, setpreview] = useState(null);
  const [alert, setalert] = useState([]);
  const [loading, setloading] = useState(false);
  const [clearEntries, setclearEntries] = useState(false);

  const [clearFile, setclearFile] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [clearFile]);

  useEffect(() => {
    if (alert.length > 0) {
      const timer = setTimeout(() => {
        setalert((prev) => prev.slice(1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const showAlert = (alert) => {
    setalert((prev) => [...prev, alert]);
  };

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

        showAlert({ type: "success", msg: "Form submitted successfully!" });

        setformState(new Map());
        setloading(false);
        setImage(null);
        setpreview(null);
        setclearFile(!clearFile);
        setclearEntries(!clearEntries);
      } catch (error) {
        showAlert({ type: "danger", msg: "Error submitting the form!" });
      }
    } else {
      showAlert({ type: "danger", msg: "Please Upload the Image" });
    }
  };

  const HandleChange = (key, value) => {
    setformState((prev) => {
      const NewformState = new Map(prev);
      NewformState.set(key, value);
      return NewformState;
    });
  };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedHandleChange = debounce(
    (key, value) => HandleChange(key, value),
    10
  );

  const handleChange = (e, field) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    const Value = e.target.value;
    if (field?.validation && !field.validation(Value)) {
      return;
    }

    const { name, value } = e.target;
    debouncedHandleChange(name, value);
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    setFileStates((prev) => {
      const newFileStates = new Map(prev);
      newFileStates.set(field.name, file);
      return newFileStates;
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setpreview((prev) => ({ ...prev, [field.name]: reader.result }));
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
                  {preview && <Image src={preview[field.name]} alt="Preview" />}
                  <Input
                    name={field.name}
                    ref={fileInputRef}
                    type={field.type}
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, field)}
                  />
                </FieldContainer>
              );
            }

            if (field.type === "textarea") {
              return (
                <FieldContainer key={index}>
                  <Label>{field.label}</Label>
                  <Desc
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formState.get(field.name) || ""}
                    onChange={(e) => handleChange(e, field)}
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
                  value={formState.get(field.name) || ""}
                  onChange={(e) => handleChange(e, field)}
                  required={field.required}
                />
              </FieldContainer>
            );
          })}

          {alert.length > 0 && (
            <div className={`alert alert-${alert[0].type}`} role="alert">
              {alert[0].msg}
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
