// State with demo data
let state = {
  template: "minimal",
  photo: "photo.jpg",
  personalInfo: {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    summary:
      "Results-driven product manager with 5+ years of experience leading cross-functional teams to deliver innovative solutions. Passionate about user-centered design and data-driven decision making.",
  },
  experience: [
    {
      id: 1,
      company: "TechCorp Inc.",
      position: "Senior Product Manager",
      duration: "Jan 2021 - Present",
      description:
        "• Led development of flagship product, increasing user engagement by 45%\n• Managed team of 8 engineers and 3 designers\n• Drove $2M in additional annual revenue through new feature launches",
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Product Manager",
      duration: "Jun 2019 - Dec 2020",
      description:
        "• Launched 3 major product features from concept to delivery\n• Conducted user research with 200+ customers to inform product roadmap\n• Improved conversion rates by 30% through A/B testing and optimization",
    },
  ],
  education: [
    {
      id: 3,
      school: "University of California, Berkeley",
      degree: "MBA in Business Administration",
      duration: "2017 - 2019",
      details: "Focus on Technology Management, GPA: 3.8/4.0",
    },
    {
      id: 4,
      school: "Stanford University",
      degree: "BS in Computer Science",
      duration: "2013 - 2017",
      details: "Dean's List, Magna Cum Laude",
    },
  ],
  skills: [
    "Product Strategy",
    "Agile/Scrum",
    "User Research",
    "Data Analysis",
    "Roadmap Planning",
    "Stakeholder Management",
    "SQL",
    "Figma",
  ],
};

let nextId = 5;

// DOM Elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const locationInput = document.getElementById("location");
const summaryInput = document.getElementById("summary");
const photoUpload = document.getElementById("photoUpload");
const photoPreview = document.getElementById("photoPreview");
const removePhotoBtn = document.getElementById("removePhoto");
const experienceList = document.getElementById("experienceList");
const educationList = document.getElementById("educationList");
const skillsList = document.getElementById("skillsList");
const resumePreview = document.getElementById("resumePreview");
const exportBtn = document.getElementById("exportPDF");
const tipsToggle = document.getElementById("tipsToggle");
const tips = document.getElementById("tips");

// Initialize inputs with demo data
nameInput.value = state.personalInfo.name;
emailInput.value = state.personalInfo.email;
phoneInput.value = state.personalInfo.phone;
locationInput.value = state.personalInfo.location;
summaryInput.value = state.personalInfo.summary;

if (state.photo) {
  photoPreview.innerHTML = `<img src="${state.photo}" alt="Profile photo">`;
  removePhotoBtn.style.display = "block";
}

// Event Listeners
nameInput.addEventListener("input", (e) => {
  state.personalInfo.name = e.target.value;
  render();
});

emailInput.addEventListener("input", (e) => {
  state.personalInfo.email = e.target.value;
  render();
});

phoneInput.addEventListener("input", (e) => {
  state.personalInfo.phone = e.target.value;
  render();
});

locationInput.addEventListener("input", (e) => {
  state.personalInfo.location = e.target.value;
  render();
});

summaryInput.addEventListener("input", (e) => {
  state.personalInfo.summary = e.target.value;
  render();
});

photoUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (event) => {
      state.photo = event.target.result;
      photoPreview.innerHTML = `<img src="${state.photo}" alt="Profile photo">`;
      removePhotoBtn.style.display = "block";
      render();
    };
    reader.readAsDataURL(file);
  }
});

removePhotoBtn.addEventListener("click", () => {
  state.photo = null;
  photoPreview.innerHTML = "<span>+ Add Photo (Optional)</span>";
  removePhotoBtn.style.display = "none";
  photoUpload.value = "";
  render();
});

document.querySelectorAll(".template-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document
      .querySelectorAll(".template-btn")
      .forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    state.template = e.target.dataset.template;
    render();
  });
});

document.getElementById("addExperience").addEventListener("click", () => {
  state.experience.push({
    id: nextId++,
    company: "",
    position: "",
    duration: "",
    description: "",
  });
  renderExperience();
  render();
});

document.getElementById("addEducation").addEventListener("click", () => {
  state.education.push({
    id: nextId++,
    school: "",
    degree: "",
    duration: "",
    details: "",
  });
  renderEducation();
  render();
});

document.getElementById("addSkill").addEventListener("click", () => {
  state.skills.push("");
  renderSkills();
  render();
});

exportBtn.addEventListener("click", () => {
  window.print();
});

tipsToggle.addEventListener("click", () => {
  const isHidden = tips.style.display === "none";
  tips.style.display = isHidden ? "block" : "none";
});

// Render Functions
function renderExperience() {
  experienceList.innerHTML = state.experience
    .map(
      (exp, index) => `
        <div class="item-card">
            <div class="item-header">
                <span class="item-label">Experience ${index + 1}</span>
                ${
                  state.experience.length > 1
                    ? `<button class="delete-btn" onclick="removeExperience(${exp.id})">×</button>`
                    : ""
                }
            </div>
            <input type="text" placeholder="Position" value="${
              exp.position
            }" onchange="updateExperience(${exp.id}, 'position', this.value)">
            <input type="text" placeholder="Company" value="${
              exp.company
            }" onchange="updateExperience(${exp.id}, 'company', this.value)">
            <input type="text" placeholder="Duration (e.g., Jan 2020 - Present)" value="${
              exp.duration
            }" onchange="updateExperience(${exp.id}, 'duration', this.value)">
            <textarea placeholder="Description" onchange="updateExperience(${
              exp.id
            }, 'description', this.value)">${exp.description}</textarea>
        </div>
    `
    )
    .join("");
}

function renderEducation() {
  educationList.innerHTML = state.education
    .map(
      (edu, index) => `
        <div class="item-card">
            <div class="item-header">
                <span class="item-label">Education ${index + 1}</span>
                ${
                  state.education.length > 1
                    ? `<button class="delete-btn" onclick="removeEducation(${edu.id})">×</button>`
                    : ""
                }
            </div>
            <input type="text" placeholder="Degree" value="${
              edu.degree
            }" onchange="updateEducation(${edu.id}, 'degree', this.value)">
            <input type="text" placeholder="School" value="${
              edu.school
            }" onchange="updateEducation(${edu.id}, 'school', this.value)">
            <input type="text" placeholder="Duration (e.g., 2016 - 2020)" value="${
              edu.duration
            }" onchange="updateEducation(${edu.id}, 'duration', this.value)">
            <input type="text" placeholder="Details (e.g., GPA, Honors)" value="${
              edu.details
            }" onchange="updateEducation(${edu.id}, 'details', this.value)">
        </div>
    `
    )
    .join("");
}

function renderSkills() {
  skillsList.innerHTML = state.skills
    .map(
      (skill, index) => `
        <div class="skill-item" draggable="true" data-index="${index}">
            <span class="drag-handle">⋮⋮</span>
            <input type="text" placeholder="Skill" value="${skill}" onchange="updateSkill(${index}, this.value)">
            ${
              state.skills.length > 1
                ? `<button class="delete-btn" onclick="removeSkill(${index})">×</button>`
                : ""
            }
        </div>
    `
    )
    .join("");

  setupSkillDragListeners();
}

function setupSkillDragListeners() {
  const skillItems = document.querySelectorAll(".skill-item");
  let draggedElement = null;
  let draggedIndex = null;

  skillItems.forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      draggedElement = item;
      draggedIndex = parseInt(item.dataset.index);
      item.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
      draggedElement = null;
      draggedIndex = null;
    });

    item.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";

      if (item !== draggedElement && draggedElement) {
        const allItems = [...skillItems];
        const targetIndex = allItems.indexOf(item);

        if (draggedIndex < targetIndex) {
          item.parentNode.insertBefore(draggedElement, item.nextSibling);
        } else {
          item.parentNode.insertBefore(draggedElement, item);
        }
      }
    });

    item.addEventListener("drop", (e) => {
      e.preventDefault();
    });
  });

  // Handle the final drop to update state
  skillsList.addEventListener("drop", (e) => {
    if (draggedElement) {
      const allItems = [...document.querySelectorAll(".skill-item")];
      const newIndex = allItems.indexOf(draggedElement);

      if (draggedIndex !== newIndex) {
        const [movedSkill] = state.skills.splice(draggedIndex, 1);
        state.skills.splice(newIndex, 0, movedSkill);
        render();
      }
    }
  });
}

function updateExperience(id, field, value) {
  const exp = state.experience.find((e) => e.id === id);
  if (exp) {
    exp[field] = value;
    render();
  }
}

function removeExperience(id) {
  state.experience = state.experience.filter((e) => e.id !== id);
  renderExperience();
  render();
}

function updateEducation(id, field, value) {
  const edu = state.education.find((e) => e.id === id);
  if (edu) {
    edu[field] = value;
    render();
  }
}

function removeEducation(id) {
  state.education = state.education.filter((e) => e.id !== id);
  renderEducation();
  render();
}

function updateSkill(index, value) {
  state.skills[index] = value;
  render();
}

function removeSkill(index) {
  state.skills = state.skills.filter((_, i) => i !== index);
  renderSkills();
  render();
}

function renderMinimalTemplate() {
  const { name, email, phone, location, summary } = state.personalInfo;
  const contact = [email, phone, location].filter(Boolean).join(" • ");

  return `
        <div class="resume-minimal">
            <div class="header">
                ${
                  state.photo
                    ? `<img src="${state.photo}" alt="Profile photo" class="profile-photo">`
                    : ""
                }
                <div class="header-content">
                    <h1>${name || "Your Name"}</h1>
                    ${contact ? `<div class="contact">${contact}</div>` : ""}
                </div>
            </div>
            
            ${
              summary
                ? `
                <div class="section">
                    <div class="section-title">Summary</div>
                    <div class="entry-description">${summary}</div>
                </div>
            `
                : ""
            }
            
            ${
              state.experience.some((exp) => exp.company || exp.position)
                ? `
                <div class="section">
                    <div class="section-title">Experience</div>
                    ${state.experience
                      .filter((exp) => exp.company || exp.position)
                      .map(
                        (exp) => `
                        <div class="entry">
                            <div class="entry-header">
                                <div class="entry-title">${
                                  exp.position || "Position"
                                }</div>
                                ${
                                  exp.duration
                                    ? `<div class="entry-duration">${exp.duration}</div>`
                                    : ""
                                }
                            </div>
                            ${
                              exp.company
                                ? `<div class="entry-subtitle">${exp.company}</div>`
                                : ""
                            }
                            ${
                              exp.description
                                ? `<div class="entry-description">${exp.description}</div>`
                                : ""
                            }
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `
                : ""
            }
            
            ${
              state.education.some((edu) => edu.school || edu.degree)
                ? `
                <div class="section">
                    <div class="section-title">Education</div>
                    ${state.education
                      .filter((edu) => edu.school || edu.degree)
                      .map(
                        (edu) => `
                        <div class="entry">
                            <div class="entry-header">
                                <div class="entry-title">${
                                  edu.degree || "Degree"
                                }</div>
                                ${
                                  edu.duration
                                    ? `<div class="entry-duration">${edu.duration}</div>`
                                    : ""
                                }
                            </div>
                            ${
                              edu.school
                                ? `<div class="entry-subtitle">${edu.school}</div>`
                                : ""
                            }
                            ${
                              edu.details
                                ? `<div class="entry-description">${edu.details}</div>`
                                : ""
                            }
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `
                : ""
            }
            
            ${
              state.skills.some((s) => s.trim())
                ? `
                <div class="section">
                    <div class="section-title">Skills</div>
                    <div class="skills-list">${state.skills
                      .filter((s) => s.trim())
                      .join(" • ")}</div>
                </div>
            `
                : ""
            }
        </div>
    `;
}

function renderProfessionalTemplate() {
  const { name, email, phone, location, summary } = state.personalInfo;
  const contact = [email, phone, location].filter(Boolean);

  return `
        <div class="resume-professional">
            <div class="header">
                ${
                  state.photo
                    ? `<img src="${state.photo}" alt="Profile photo" class="profile-photo">`
                    : ""
                }
                <div class="header-content">
                    <h1>${name || "Your Name"}</h1>
                    ${
                      contact.length
                        ? `<div class="contact">${contact
                            .map((c) => `<span>${c}</span>`)
                            .join("")}</div>`
                        : ""
                    }
                </div>
            </div>
            
            ${
              summary
                ? `
                <div class="section">
                    <div class="section-title">Professional Summary</div>
                    <div class="entry-description">${summary}</div>
                </div>
            `
                : ""
            }
            
            ${
              state.experience.some((exp) => exp.company || exp.position)
                ? `
                <div class="section">
                    <div class="section-title">Professional Experience</div>
                    ${state.experience
                      .filter((exp) => exp.company || exp.position)
                      .map(
                        (exp) => `
                        <div class="entry">
                            <div class="entry-header">
                                <div>
                                    <div class="entry-title">${
                                      exp.position || "Position"
                                    }</div>
                                    ${
                                      exp.company
                                        ? `<div class="entry-subtitle">${exp.company}</div>`
                                        : ""
                                    }
                                </div>
                                ${
                                  exp.duration
                                    ? `<div class="entry-duration">${exp.duration}</div>`
                                    : ""
                                }
                            </div>
                            ${
                              exp.description
                                ? `<div class="entry-description">${exp.description}</div>`
                                : ""
                            }
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `
                : ""
            }
            
            ${
              state.education.some((edu) => edu.school || edu.degree)
                ? `
                <div class="section">
                    <div class="section-title">Education</div>
                    ${state.education
                      .filter((edu) => edu.school || edu.degree)
                      .map(
                        (edu) => `
                        <div class="entry">
                            <div class="entry-header">
                                <div>
                                    <div class="entry-title">${
                                      edu.degree || "Degree"
                                    }</div>
                                    ${
                                      edu.school
                                        ? `<div class="entry-subtitle">${edu.school}</div>`
                                        : ""
                                    }
                                </div>
                                ${
                                  edu.duration
                                    ? `<div class="entry-duration">${edu.duration}</div>`
                                    : ""
                                }
                            </div>
                            ${
                              edu.details
                                ? `<div class="entry-description">${edu.details}</div>`
                                : ""
                            }
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `
                : ""
            }
            
            ${
              state.skills.some((s) => s.trim())
                ? `
                <div class="section">
                    <div class="section-title">Skills</div>
                    <div class="entry-description">${state.skills
                      .filter((s) => s.trim())
                      .join(" • ")}</div>
                </div>
            `
                : ""
            }
        </div>
    `;
}

function renderModernTemplate() {
  const { name, email, phone, location, summary } = state.personalInfo;
  const contact = [email, phone, location].filter(Boolean);
  const skills = state.skills.filter((s) => s.trim());

  return `
        <div class="resume-modern">
            <div class="sidebar">
                ${
                  state.photo
                    ? `<img src="${state.photo}" alt="Profile photo" class="profile-photo">`
                    : ""
                }
                <h1>${name || "Your Name"}</h1>
                
                ${
                  contact.length
                    ? `
                    <div class="section">
                        <div class="section-title">Contact</div>
                        ${contact
                          .map((c) => `<div class="contact-item">${c}</div>`)
                          .join("")}
                    </div>
                `
                    : ""
                }
                
                ${
                  skills.length
                    ? `
                    <div class="section">
                        <div class="section-title">Skills</div>
                        ${skills
                          .map((s) => `<div class="skill-item-text">${s}</div>`)
                          .join("")}
                    </div>
                `
                    : ""
                }
            </div>
            
            <div class="main">
                ${
                  summary
                    ? `
                    <div class="section">
                        <div class="section-title">About</div>
                        <div class="entry-description">${summary}</div>
                    </div>
                `
                    : ""
                }
                
                ${
                  state.experience.some((exp) => exp.company || exp.position)
                    ? `
                    <div class="section">
                        <div class="section-title">Experience</div>
                        ${state.experience
                          .filter((exp) => exp.company || exp.position)
                          .map(
                            (exp) => `
                            <div class="entry">
                                <div class="entry-title">${
                                  exp.position || "Position"
                                }</div>
                                <div class="entry-header">
                                    ${
                                      exp.company
                                        ? `<div class="entry-subtitle">${exp.company}</div>`
                                        : ""
                                    }
                                    ${
                                      exp.duration
                                        ? `<div class="entry-duration">${exp.duration}</div>`
                                        : ""
                                    }
                                </div>
                                ${
                                  exp.description
                                    ? `<div class="entry-description">${exp.description}</div>`
                                    : ""
                                }
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                `
                    : ""
                }
                
                ${
                  state.education.some((edu) => edu.school || edu.degree)
                    ? `
                    <div class="section">
                        <div class="section-title">Education</div>
                        ${state.education
                          .filter((edu) => edu.school || edu.degree)
                          .map(
                            (edu) => `
                            <div class="entry">
                                <div class="entry-title">${
                                  edu.degree || "Degree"
                                }</div>
                                <div class="entry-header">
                                    ${
                                      edu.school
                                        ? `<div class="entry-subtitle">${edu.school}</div>`
                                        : ""
                                    }
                                    ${
                                      edu.duration
                                        ? `<div class="entry-duration">${edu.duration}</div>`
                                        : ""
                                    }
                                </div>
                                ${
                                  edu.details
                                    ? `<div class="entry-description">${edu.details}</div>`
                                    : ""
                                }
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                `
                    : ""
                }
            </div>
        </div>
    `;
}

function render() {
  let html = "";

  switch (state.template) {
    case "minimal":
      html = renderMinimalTemplate();
      break;
    case "professional":
      html = renderProfessionalTemplate();
      break;
    case "modern":
      html = renderModernTemplate();
      break;
    default:
      html = renderMinimalTemplate();
  }

  resumePreview.innerHTML = html;
}

// Add this function to your script.js
function exportJSON() {
  const dataStr = JSON.stringify(state, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `resume_${state.personalInfo.name.replace(/\s+/g, "_")}_${
    new Date().toISOString().split("T")[0]
  }.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function importJSON() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);

        // Validate that imported data has the expected structure
        if (
          !importedData.personalInfo ||
          !Array.isArray(importedData.experience) ||
          !Array.isArray(importedData.education) ||
          !Array.isArray(importedData.skills)
        ) {
          alert("Invalid resume file format");
          return;
        }

        // Update state with imported data
        state = importedData;

        // Recalculate nextId to avoid conflicts
        const allIds = [
          ...importedData.experience.map((e) => e.id),
          ...importedData.education.map((e) => e.id),
        ];
        nextId = Math.max(...allIds, 4) + 1;

        // Update all input fields
        nameInput.value = state.personalInfo.name;
        emailInput.value = state.personalInfo.email;
        phoneInput.value = state.personalInfo.phone;
        locationInput.value = state.personalInfo.location;
        summaryInput.value = state.personalInfo.summary;

        // Update photo if it exists
        if (state.photo) {
          photoPreview.innerHTML = `<img src="${state.photo}" alt="Profile photo">`;
          removePhotoBtn.style.display = "block";
        } else {
          photoPreview.innerHTML = "<span>+ Add Photo (Optional)</span>";
          removePhotoBtn.style.display = "none";
        }

        // Update template selector
        document.querySelectorAll(".template-btn").forEach((btn) => {
          btn.classList.remove("active");
          if (btn.dataset.template === state.template) {
            btn.classList.add("active");
          }
        });

        // Re-render all sections
        renderExperience();
        renderEducation();
        renderSkills();
        render();

        alert("Resume imported successfully!");
      } catch (error) {
        alert("Error importing file: " + error.message);
      }
    };
    reader.readAsText(file);
  });

  input.click();
}

document.getElementById("exportJSON").addEventListener("click", () => {
  exportJSON();
});

document.getElementById("importJSON").addEventListener("click", () => {
  importJSON();
});

// Initialize
renderExperience();
renderEducation();
renderSkills();
render();
