import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import SubForm from "./SubForm";
import db from "../firebase.jsx";

const FormFields = [
  {
    name: "FullName",
    label: "1. Full Name*",
    type: "text",
    placeholder: "Full Name",
    required: true,
  },
  {
    name: "Designation",
    label: "3. Designation*",
    type: "text",
    placeholder: "Designation",
    required: true,
  },
  {
    name: "OfficialAddress",
    label: "4. Official Address*",
    type: "text",
    placeholder: "Address",
    required: true,
  },
  {
    name: "Email",
    label: "5. Email ID*",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    name: "Phone",
    label: "6. Contact Number*",
    type: "number",
    placeholder: "Phone",
    required: true,
    validation: (value) => value.length <= 10,
  },
  {
    name: "AboutYou",
    label: "7. About You (200-500 words)*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "Objective",
    label: "8. Objective*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
  },
  {
    name: "Education",
    label: "9. Education*",
    type: "subform",
    fields: [
      {
        name: "Course",
        label: "Course",
        type: "select",
        options: ["UG", "PG", "PhD"],
        required: true,
      },
      {
        name: "University",
        label: "University Name",
        type: "text",
        required: true,
      },
      { name: "College", label: "College Name", type: "text", required: true },
      {
        name: "PassYear",
        label: "Year of Passing",
        type: "number",
        required: true,
        validation: (value) =>
          value.length <= 4 && Number(value) <= new Date().getFullYear(),
      },
      {
        name: "Percentage",
        label: "Percentage (%)",
        type: "number",
        required: true,
        validation: (value) => value.length <= 2,
      },
    ],
  },
  {
    name: "TeachingExperience",
    label: "10. Teaching Experience*",
    type: "subform",
    fields: [
      {
        name: "Designation",
        label: "Designation",
        type: "text",
        required: true,
      },
      {
        name: "From",
        label: "From",
        type: "date",
        required: true,
      },
      {
        name: "To",
        label: "To",
        type: "date",
        required: true,
      },
      {
        name: "Department",
        label: "Dept Name",
        type: "text",
        required: true,
      },
      {
        name: "University",
        label: "University Name",
        type: "text",
        required: true,
      },
    ],
  },
  {
    name: "IndustrialExperience",
    label: "11. Industrial Experience*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "AcademicContributions",
    label: "12. Academic Contributions*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "AdministrativePositions",
    label: "13. Administrative Positions Held*",
    type: "subform",
    fields: [
      {
        name: "Designation",
        label: "Designation",
        type: "text",
        required: true,
      },
      {
        name: "From",
        label: "From",
        type: "date",
        required: true,
      },
      {
        name: "To",
        label: "To",
        type: "date",
        required: true,
      },
    ],
  },
  {
    name: "Responsibilities",
    label: "14. State , National and International Level Responsibilities*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "FacultyCouncil",
    label: "15. Faculty and Academic Council*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "BookAppoinment",
    label: "16. Board of Appointment*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "BoardStudies",
    label: "17. Board of Studies*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "BoardExamination",
    label: "18. Board of Examination*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "ExaminationResponsibilites",
    label: "19. Examination Responsibilities*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "TechnicalCommitees",
    label: "20. Technical Commitees*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "Research",
    label: "21. Research Intersets*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "SponseredProjects",
    label: "23. Sponsered Research Projects*",
    type: "subform",
    fields: [
      {
        name: "PIName",
        label: "PI Name",
        type: "text",
        required: true,
      },
      {
        name: "PITitle",
        label: "Project Title",
        type: "text",
        required: true,
      },
      {
        name: "SponserAgency",
        label: "Sponsering Agency",
        type: "text",
        required: true,
      },
      {
        name: "Duration",
        label: "Duration",
        type: "text",
        required: true,
      },
      {
        name: "StartYear",
        label: "Year of Start",
        type: "date",
        required: true,
      },
      {
        name: "EndYear",
        label: "Year of Completion",
        type: "date",
        required: true,
      },
      {
        name: "Amount",
        label: "Sanctioned Amount",
        type: "number",
        required: true,
      },
    ],
  },
  {
    name: "ConsultancyProjects",
    label: "24. Consultancy Projects*",
    type: "subform",
    fields: [
      {
        name: "PIName",
        label: "PI Name",
        type: "text",
        required: true,
      },
      {
        name: "PITitle",
        label: "Project Title",
        type: "text",
        required: true,
      },
      {
        name: "SponserAgency",
        label: "Sponsering Agency",
        type: "text",
        required: true,
      },
      {
        name: "Duration",
        label: "Duration",
        type: "text",
        required: true,
      },
      {
        name: "StartYear",
        label: "Year of Start",
        type: "date",
        required: true,
      },
      {
        name: "EndYear",
        label: "Year of Completion",
        type: "date",
        required: true,
      },
      {
        name: "Amount",
        label: "Sanctioned Amount",
        type: "number",
        required: true,
      },
    ],
  },
  {
    name: "Patents",
    label: "25. Patents*",
    type: "subform",
    fields: [
      {
        name: "Author",
        label: "Author",
        type: "text",
        required: true,
      },
      {
        name: "PTitle",
        label: "Patent Title",
        type: "text",
        required: true,
      },
      {
        name: "PName",
        label: "Patent Name",
        type: "text",
        required: true,
      },
      {
        name: "DesignNo",
        label: "Design No",
        type: "number",
        required: true,
      },
      {
        name: "Year",
        label: "Year of Grant",
        type: "date",
        required: true,
      },
    ],
  },
  {
    name: "Books",
    label: "26. Books*",
    type: "subform",
    fields: [
      {
        name: "Author",
        label: "Author",
        type: "text",
        required: true,
      },
      {
        name: "BTitle",
        label: "Title of the Book",
        type: "text",
        required: true,
      },
      {
        name: "PubName",
        label: "Publisher Name",
        type: "text",
        required: true,
      },
      {
        name: "Pages",
        label: "Pages",
        type: "number",
        required: true,
      },
      {
        name: "Date",
        label: "Date",
        type: "date",
        required: true,
      },
      {
        name: "ISBN",
        label: "ISBN",
        type: "number",
        required: true,
      },
    ],
  },
  {
    name: "AwardsAndRecognition",
    label: "27. Awards And Recognition*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "PhD",
    label: "28. Ph.D Guidance (Awards and Ongoing)",
    type: "subform",
    fields: [
      {
        name: "ScholarName",
        label: "Scholar Name",
        type: "text",
        required: true,
      },
      {
        name: "TTitle",
        label: "Thesis Title",
        type: "text",
        required: true,
      },
      {
        name: "University",
        label: "University Name",
        type: "text",
        required: true,
      },
      {
        name: "Year",
        label: "Year",
        type: "date",
        required: true,
      },
    ],
  },
  {
    name: "NotableAchivements",
    label: "29. Notable Achivements*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "InvitedTalks",
    label: "30. Invited Talks",
    type: "subform",
    fields: [
      {
        name: "Topic",
        label: "Topic",
        type: "text",
        required: true,
      },
      {
        name: "Organization",
        label: "Organization",
        type: "text",
        required: true,
      },
      {
        name: "Year",
        label: "Year",
        type: "date",
        required: true,
      },
    ],
  },
  {
    name: "Workshops",
    label: "31. Workshops/Seminars/Conferences Organized*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "Memberships",
    label: "32. Memberships in Professional Bodies",
    type: "subform",
    fields: [
      {
        name: "Organization",
        label: "Organization",
        type: "text",
        required: true,
      },
      {
        name: "Title",
        label: "Title of Membership",
        type: "text",
        required: true,
      },
    ],
  },
  {
    name: "AbroadVisits",
    label: "33. Abroad Visits*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "SocialActivities",
    label: "34. Social and Other Activities (Details)*",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "Courses",
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
                <div key={index}>
                  <Label>{field.label}</Label>
                  <Desc
                    placeholder={field.placeholder}
                    value={(formState && formState[field.name]) || ""}
                    onChange={(e) => handleChange(e, field)}
                    name={field.name}
                    spellCheck="true"
                    required={field.required}
                  />
                </div>
              );
            }

            if (field.type === "subform") {
              return (
                <div key={index}>
                  <Label>{field.label}</Label>
                  <SubForm
                    formFields={field.fields}
                    onchange={(data) => HandleChange(field.name, data)}
                    entries={entries}
                    setEntries={setEntries}
                  />
                </div>
              );
            }

            return (
              <div key={index}>
                <Label>{field.label}</Label>
                <Input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={(formState && formState[field.name]) || ""}
                  onChange={(e) => handleChange(e, field)}
                  required={field.required}
                />
              </div>
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
    max-width: 90%;
    padding: 1.2rem;
  }
`;

const Hero = styled.div`
  max-height: max-content;
`;

const H1 = styled.h1`
  max-height: max-content;
`;

const Label = styled.label`
  max-height: max-content;
`;

const P = styled.p`
  max-height: max-content;
  display: flex;
  column-gap: 0.5rem;
`;

const A = styled.a`
  max-height: max-content;
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
