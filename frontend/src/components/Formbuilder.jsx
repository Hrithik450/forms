import React, { useState } from "react";
import { styled } from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

const FormFields = [
  {
    name: "FullName",  /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "1. Full Name*",
    type: "text",
    placeholder: "Full Name",
    required: true,
  },
  {
    name: "Designation", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "3. Designation*",
    type: "text",
    placeholder: "Designation",
    required: true,
  },
  {
    name: "OfficialAddress", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "4. Official Address*",
    type: "text",
    placeholder: "Address",
    required: true,
  },
  {
    name: "Email", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "5. Email ID*",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    name: "Phone", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "6. Contact Number*",
    type: "number",
    placeholder: "Phone",
    required: true,
    validation: (value) => value.length <= 10,
  },
  {
    name: "AboutYou", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "7. About You (200-500 words)*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "Objective",/*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "8. Objective*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
  },
  {
    name: "Education", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "9. Education*",
    type: "subform",
    fields: [
      {
        name: "Course", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Course",
        type: "select",
        options: ["UG", "PG", "PhD"],
        required: true,
      },
      {
        name: "University", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "University Name",
        type: "text",
        required: true,
      },
      { name: "College", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
       label: "College Name", type: "text", required: true },
      {
        name: "PassYear", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Year of Passing",
        type: "number",
        required: true,
        validation: (value) =>
          value.length <= 4 && Number(value) <= new Date().getFullYear(),
      },
      {
        name: "Percentage", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Percentage (%)",
        type: "number",
        required: true,
        validation: (value) => value.length <= 2,
      },
    ],
  },
  {
    name: "TeachingExperience", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "10. Teaching Experience*",
    type: "subform",
    fields: [
      {
        name: "Designation", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Designation",
        type: "text",
        required: true,
      },
      {
        name: "From", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "From",
        type: "date",
        required: true,
      },
      {
        name: "To", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "To",
        type: "date",
        required: true,
      },
      {
        name: "Department", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Dept Name",
        type: "text",
        required: true,
      },
      {
        name: "University", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "University Name",
        type: "text",
        required: true,
      },
    ],
  },
  {
    name: "IndustrialExperience", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "11. Industrial Experience*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "AcademicContributions", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "12. Academic Contributions*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "AdministrativePositions", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "13. Administrative Positions Held*",
    type: "subform",
    fields: [
      {
        name: "Designation", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Designation",
        type: "text",
        required: true,
      },
      {
        name: "From", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "From",
        type: "date",
        required: true,
      },
      {
        name: "To", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "To",
        type: "date",
        required: true,
      },
    ],
  },
  {
    name: "Responsibilities", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "14. State , National and International Level Responsibilities*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "FacultyCouncil", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "15. Faculty and Academic Council*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "BookAppoinment", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "16. Board of Appointment*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "BoardStudies", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "17. Board of Studies*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "BoardExamination", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "18. Board of Examination*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "ExaminationResponsibilites", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "19. Examination Responsibilities*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "TechnicalCommitees", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "20. Technical Commitees*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "Research", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "21. Research Intersets*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "SponseredProjects", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "23. Sponsered Research Projects*",
    type: "subform",
    fields: [
      {
        name: "PIName", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "PI Name",
        type: "text",
        required: true,
      },
      {
        name: "PITitle", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Project Title",
        type: "text",
        required: true,
      },
      {
        name: "SponserAgency", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Sponsering Agency",
        type: "text",
        required: true,
      },
      {
        name: "Duration", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Duration",
        type: "text",
        required: true,
      },
      {
        name: "StartYear", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Year of Start",
        type: "date",
        required: true,
      },
      {
        name: "EndYear", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Year of Completion",
        type: "date",
        required: true,
      },
      {
        name: "Amount", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Sanctioned Amount",
        type: "number",
        required: true,
      },
    ],
  },
  {
    name: "ConsultancyProjects", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "24. Consultancy Projects*",
    type: "subform",
    fields: [
      {
        name: "PIName", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "PI Name",
        type: "text",
        required: true,
      },
      {
        name: "PITitle", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Project Title",
        type: "text",
        required: true,
      },
      {
        name: "SponserAgency", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Sponsering Agency",
        type: "text",
        required: true,
      },
      {
        name: "Duration", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Duration",
        type: "text",
        required: true,
      },
      {
        name: "StartYear", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Year of Start",
        type: "date",
        required: true,
      },
      {
        name: "EndYear", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Year of Completion",
        type: "date",
        required: true,
      },
      {
        name: "Amount", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Sanctioned Amount",
        type: "number",
        required: true,
      },
    ],
  },
  {
    name: "Patents", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "25. Patents*",
    type: "subform",
    fields: [
      {
        name: "Author", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Author",
        type: "text",
        required: true,
      },
      {
        name: "PTitle", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Patent Title",
        type: "text",
        required: true,
      },
      {
        name: "PName", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Patent Name",
        type: "text",
        required: true,
      },
      {
        name: "DesignNo", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Design No",
        type: "number",
        required: true,
      },
      {
        name: "Year", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Year of Grant",
        type: "date",
        required: true,
      },
    ],
  },
  {
    name: "Books", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "26. Books*",
    type: "subform",
    fields: [
      {
        name: "Author", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Author",
        type: "text",
        required: true,
      },
      {
        name: "BTitle", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Title of the Book",
        type: "text",
        required: true,
      },
      {
        name: "PubName", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Publisher Name",
        type: "text",
        required: true,
      },
      {
        name: "Pages", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Pages",
        type: "number",
        required: true,
      },
      {
        name: "Date", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Date",
        type: "date",
        required: true,
      },
      {
        name: "ISBN", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "ISBN",
        type: "number",
        required: true,
      },
    ],
  },
  {
    name: "AwardsAndRecognition", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "27. Awards And Recognition*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "PhD", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "28. Ph.D Guidance (Awards and Ongoing)",
    type: "subform",
    fields: [
      {
        name: "ScholarName", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Scholar Name",
        type: "text",
        required: true,
      },
      { 
        name: "TTitle", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Thesis Title",
        type: "text",
        required: true,
      },
      {
        name: "University", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "University Name",
        type: "text",
        required: true,
      },
      {
        name: "Year", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Year",
        type: "date",
        required: true,
      },
    ],
  },
  {
    name: "NotableAchivements", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "29. Notable Achivements*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "InvitedTalks", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "30. Invited Talks",
    type: "subform",
    fields: [
      {
        name: "Topic", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Topic",
        type: "text",
        required: true,
      },
      {
        name: "Organization", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Organization",
        type: "text",
        required: true,
      },
      {
        name: "Year", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Year",
        type: "date",
        required: true,
      },
    ],
  },
  {
    name: "Workshops", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "31. Workshops/Seminars/Conferences Organized*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "Memberships", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "32. Memberships in Professional Bodies",
    type: "subform",
    fields: [
      {
        name: "Organization", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Organization",
        type: "text",
        required: true,
      },
      {
        name: "Title", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
        label: "Title of Membership",
        type: "text",
        required: true,
      },
    ],
  },
  {
    name: "AbroadVisits", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "33. Abroad Visits*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "SocialActivities", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "34. Social and Other Activities (Details)*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "Courses", /*Note:- No spaces are allowed for name argument, Otherwise error occurs */
    label: "35. List of Courses Taught*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
];

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
