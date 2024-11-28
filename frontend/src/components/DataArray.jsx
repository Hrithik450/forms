export const FormFields = [
  {
    name: "FullName",
    label: "1. Full Name",
    type: "text",
    placeholder: "e.g., Dilip Kumar S M",
    required: true,
  },
  {
    name: "Profile",
    label: (
      <>
        2. Profile image <span>&nbsp;</span>(
        <i>max 5MB, jpg/png/webp/jpeg format</i>)
      </>
    ),
    type: "file",
    required: true,
  },
  {
    name: "Designation",
    label: "3. Designation",
    type: "select",
    options: ["Professor", "Associate Professor", "Assistant Professor"],
    required: true,
  },
  {
    name: "OfficialAddress",
    label: "4. Official Address",
    type: "text",
    placeholder: "Address",
    required: true,
  },
  {
    name: "Email",
    label: "5. Official Email ID",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    name: "Phone",
    label: (
      <>
        6. Contact Number <span>&nbsp;</span>
        <i>without (+91)</i>
      </>
    ),
    type: "number",
    placeholder: "Phone",
    required: true,
    validation: (value) => value.length <= 10,
  },
  {
    name: "AboutYou",
    label: (
      <>
        7. About You <span>&nbsp;</span> <i>(200-500 words)</i>
      </>
    ),
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "Objective",
    label: (
      <>
        8. Objective <i>(minimum one sentence, maximum two sentences)</i>
      </>
    ),
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "Education",
    label: "9. Education",
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
        name: "Degree",
        label: "Degree Name",
        type: "select",
        required: true,
        optionsMapping: {
          UG: ["B.Sc", "BCA", "B.Tech", "BBA", "LLB", "B.Arch"],
          PG: ["M.Sc", "MCA", "M.Tech", "MBA", "LLM", "M.Arch"],
          PhD: [
            "PhD in Computer Science",
            "PhD in Mathematics",
            "PhD in Physics",
          ],
        },
        dependency: "Course",
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
        validation: (value, formData, callback) => {
          if (value.length <= 4 && Number(value) <= new Date().getFullYear())
            return true;
          callback({ type: "danger", msg: "Passing Year Cannot be in future" });
          return false;
        },
      },
      {
        name: "Percentage",
        label: "Percentage (%)",
        type: "number",
        required: true,
        validation: (value) => {
          if (value.length <= 2) return true;
          callback({
            type: "danger",
            msg: "Percentage Cannot exceed 2 digits",
          });
          return false;
        },
      },
    ],
  },
  {
    name: "TeachingExperience",
    label: "10. Teaching Experience",
    type: "subform",
    fields: [
      {
        name: "Designation",
        label: "Designation",
        type: "select",
        options: ["Professor", "Associate Professor", "Assistant Professor"],
        required: true,
      },
      {
        name: "From",
        label: "From",
        type: "date",
        required: true,
        validation: (value, formData, callback) => {
          if (formData.To && new Date(value) > new Date(formData.To)) {
            callback({
              type: "danger",
              msg: "From date should be earlier than To date",
            });
            return false;
          }
          return true;
        },
      },
      {
        name: "To",
        label: "To",
        type: "date",
        required: true,
        validation: (value, formData, callback) => {
          if (formData.From && new Date(value) < new Date(formData.From)) {
            callback({
              type: "danger",
              msg: "The To date should be later than From date",
            });
            return false;
          }
          return true;
        },
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
    label: "11. Industrial Experience (if any)",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
  },
  {
    name: "AcademicContributions",
    label: "12. Academic Contributions (if any)",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
  },
  {
    name: "AdministrativePositions",
    label: "13. Administrative Positions Held (if any)",
    type: "subform",
    fields: [
      {
        name: "Designation",
        label: "Designation",
        type: "select",
        options: ["Professor", "Associate Professor", "Assistant Professor"],
        required: false,
      },
      {
        name: "From",
        label: "From",
        type: "date",
        required: false,
        validation: (value, formData, callback) => {
          if (formData.To && new Date(value) > new Date(formData.To)) {
            callback({
              type: "danger",
              msg: "From date should be earlier than To date",
            });
            return true;
          }
          return true;
        },
      },
      {
        name: "To",
        label: "To",
        type: "date",
        required: false,
        validation: (value, formData, callback) => {
          if (formData.From && new Date(value) < new Date(formData.From)) {
            callback({
              type: "danger",
              msg: "The To date should be later than From date",
            });
            return true;
          }
          return true;
        },
      },
    ],
  },
  {
    name: "Responsibilities",
    label:
      "14. State / National / International Level Responsibilities (if any)",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
  },
  {
    name: "FacultyCouncil",
    label: "15. Faculty and Academic Council (optional)",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
  },
  {
    name: "BookAppoinment",
    label: "16. Board of Appointment (optional)",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
  },
  {
    name: "BoardStudies",
    label: "17. Board of Studies (optional)",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
  },
  {
    name: "BoardExamination",
    label: "18. Board of Examination (optional)",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
  },
  {
    name: "ExaminationResponsibilites",
    label: "19. Examination Responsibilities (optional)",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
  },
  {
    name: "TechnicalCommitees",
    label: "20. Technical Commitees (optional)",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
  },
  {
    name: "Research",
    label: "21. Research Interests",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "Research_Publications",
    label: "22. Research Publications",
    type: "subform",
    required: true,
    fields: [
      {
        name: "JournalsInter",
        label: "a. Journals (International)",
        type: "subform",
        fields: [
          {
            name: "Authors",
            label: "Authors List",
            type: "subform",
            fields: [
              {
                name: "FirstName",
                label: "First Name",
                type: "text",
                required: true,
              },
              {
                name: "LastName",
                label: "Last Name",
                type: "text",
                required: true,
              },
            ],
          },
          {
            name: "TitleOfPaper",
            label: "Title Of the Paper",
            type: "text",
            required: true,
          },
          {
            name: "JournalTitle",
            label: "Journal Title",
            type: "text",
            required: true,
          },
          {
            name: "Volume",
            label: "Volume",
            type: "number",
            required: true,
          },
          {
            name: "No",
            label: "Number",
            type: "number",
            required: true,
          },
          {
            name: "Pages",
            label: "Pages",
            type: "number",
            required: true,
          },
          {
            name: "Year",
            label: "Year",
            type: "text",
            required: true,
            validation: (value, formData, callback) => {
              if (Number(value) <= new Date().getFullYear()) return true;
              callback({
                type: "danger",
                msg: "Year Cannot be in future",
              });
              return false;
            },
          },
          {
            name: "ISSN",
            label: "ISSN No",
            type: "number",
            required: false,
          },
          {
            name: "ImpactFactor",
            label: "Impact Factor",
            type: "number",
            required: false,
          },
          {
            name: "SJRank",
            label: "SJR Rank",
            type: "number",
            required: false,
          },
        ],
      },
      {
        name: "JournalsNational",
        label: "b. Journals (National)",
        type: "subform",
        fields: [
          {
            name: "Authors",
            label: "Authors List",
            type: "subform",
            fields: [
              {
                name: "FirstName",
                label: "First Name",
                type: "text",
                required: true,
              },
              {
                name: "LastName",
                label: "Last Name",
                type: "text",
                required: true,
              },
            ],
          },
          {
            name: "TitleOfPaper",
            label: "Title Of the Paper",
            type: "text",
            required: true,
          },
          {
            name: "JournalTitle",
            label: "Journal Title",
            type: "text",
            required: true,
          },
          {
            name: "Volume",
            label: "Volume",
            type: "number",
            required: true,
          },
          {
            name: "No",
            label: "Number",
            type: "number",
            required: true,
          },
          {
            name: "Pages",
            label: "Pages",
            type: "number",
            required: true,
          },
          {
            name: "Year",
            label: "Year",
            type: "text",
            required: true,
            validation: (value, formData, callback) => {
              if (Number(value) <= new Date().getFullYear()) return true;
              callback({
                type: "danger",
                msg: "Year Cannot be in future",
              });
              return false;
            },
          },
          {
            name: "ISSN",
            label: "ISSN No",
            type: "number",
            required: false,
          },
          {
            name: "ImpactFactor",
            label: "Impact Factor",
            type: "number",
            required: false,
          },
          {
            name: "SJRank",
            label: "SJR Rank",
            type: "number",
            required: false,
          },
        ],
      },
      {
        name: "ConfNational",
        label: "c. Conference (National)",
        type: "subform",
        fields: [
          {
            name: "Authors",
            label: "Authors List",
            type: "subform",
            fields: [
              {
                name: "FirstName",
                label: "First Name",
                type: "text",
                required: true,
              },
              {
                name: "LastName",
                label: "Last Name",
                type: "text",
                required: true,
              },
            ],
          },
          {
            name: "TitleOfPaper",
            label: "Title Of the Paper",
            type: "text",
            required: true,
          },
          {
            name: "ConfTitle",
            label: "Conference Title",
            type: "text",
            required: true,
          },
          {
            name: "Volume",
            label: "Volume",
            type: "number",
            required: true,
          },
          {
            name: "No",
            label: "Number",
            type: "number",
            required: true,
          },
          {
            name: "Pages",
            label: "Pages",
            type: "number",
            required: true,
          },
          {
            name: "ConfVenue",
            label: "Conference Venue",
            type: "text",
            required: true,
          },
          {
            name: "Year",
            label: "Year",
            type: "text",
            required: true,
            validation: (value, formData, callback) => {
              if (Number(value) <= new Date().getFullYear()) return true;
              callback({
                type: "danger",
                msg: "Year Cannot be in future",
              });
              return false;
            },
          },
          {
            name: "ISBN",
            label: "ISBN No",
            type: "number",
            required: false,
          },
        ],
      },
      {
        name: "ConfInterNational",
        label: "d. Conference (Inter-National)",
        type: "subform",
        fields: [
          {
            name: "Authors",
            label: "Authors List",
            type: "subform",
            fields: [
              {
                name: "FirstName",
                label: "First Name",
                type: "text",
                required: true,
              },
              {
                name: "LastName",
                label: "Last Name",
                type: "text",
                required: true,
              },
            ],
          },
          {
            name: "TitleOfPaper",
            label: "Title Of the Paper",
            type: "text",
            required: true,
          },
          {
            name: "ConfTitle",
            label: "Conference Title",
            type: "text",
            required: true,
          },
          {
            name: "Volume",
            label: "Volume",
            type: "number",
            required: true,
          },
          {
            name: "No",
            label: "Number",
            type: "number",
            required: true,
          },
          {
            name: "Pages",
            label: "Pages",
            type: "number",
            required: true,
          },
          {
            name: "ConfVenue",
            label: "Conference Venue",
            type: "text",
            required: true,
          },
          {
            name: "Year",
            label: "Year",
            type: "text",
            required: true,
            validation: (value, formData, callback) => {
              if (Number(value) <= new Date().getFullYear()) return true;
              callback({
                type: "danger",
                msg: "Year Cannot be in future",
              });
              return false;
            },
          },
          {
            name: "ISBN",
            label: "ISBN No",
            type: "number",
          },
        ],
      },
    ],
  },
  {
    name: "SponsoredProjects",
    label: "23. Sponsored Research Projects",
    type: "subform",
    fields: [
      {
        name: "PIName",
        label: "Principal Investigator",
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
        validation: (value, formData, callback) => {
          if (
            formData.EndYear &&
            new Date(value) > new Date(formData.EndYear)
          ) {
            callback({
              type: "danger",
              msg: "StartYear should be earlier than EndYear",
            });
            return false;
          }
          return true;
        },
      },
      {
        name: "EndYear",
        label: "Year of Completion",
        type: "date",
        required: true,
        validation: (value, formData, callback) => {
          if (
            formData.StartYear &&
            new Date(value) < new Date(formData.StartYear)
          ) {
            callback({
              type: "danger",
              msg: "The EndYear should be later than StartYear",
            });
            return false;
          }
          return true;
        },
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
    label: "24. Consultancy Projects",
    type: "subform",
    fields: [
      {
        name: "PIName",
        label: "Principal Investigator",
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
        validation: (value, formData, callback) => {
          if (
            formData.EndYear &&
            new Date(value) > new Date(formData.EndYear)
          ) {
            callback({
              type: "danger",
              msg: "StartYear should be earlier than EndYear",
            });
            return false;
          }
          return true;
        },
      },
      {
        name: "EndYear",
        label: "Year of Completion",
        type: "date",
        required: true,
        validation: (value, formData, callback) => {
          if (
            formData.StartYear &&
            new Date(value) < new Date(formData.StartYear)
          ) {
            callback({
              type: "danger",
              msg: "The EndYear should be later than StartYear",
            });
            return false;
          }
          return true;
        },
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
    label: "25. Patents (if any)",
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
    label: "26. Books(optional)",
    type: "subform",
    fields: [
      {
        name: "Authors",
        label: "Authors List",
        type: "subform",
        fields: [
          {
            name: "FirstName",
            label: "First Name",
            type: "text",
            required: true,
          },
          {
            name: "LastName",
            label: "Last Name",
            type: "text",
            required: true,
          },
        ],
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
    name: "AwardsAndRecognition (optional)",
    label: "27. Awards And Recognition",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
  },
  {
    name: "PhD",
    label: (
      <>
        28. Ph.D Guidance
        <i>
          (Awards and Ongoing) <span>&nbsp;</span>(optional)
        </i>
      </>
    ),
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
    label: "29. Notable Achivements (optional)",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
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
    label: "31. Workshops/Seminars/Conferences Organized",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
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
    label: "33. Abroad Visits (if any)",
    type: "textarea",
    placeholder: "Enter your description...",
    required: false,
  },
  {
    name: "SocialActivities",
    label: "34. Social and Other Activities (Details)",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
  {
    name: "Courses",
    label: "35. List of Courses Taught",
    type: "textarea",
    placeholder: "Enter your description...",
    required: true,
  },
];
