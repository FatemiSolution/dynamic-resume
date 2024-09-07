// Function to validate the form fields
function validateForm(): boolean {
    const missingFields: string[] = [];

    // Check if all personal information fields are filled
    const fullName = (document.getElementById('fullName') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();
    const address = (document.getElementById('address') as HTMLInputElement).value.trim();
    const firstSkill = (document.getElementById('skills') as HTMLInputElement).value.trim();

    if (!fullName) missingFields.push('Full Name');
    if (!email) missingFields.push('Email');
    if (!phone) missingFields.push('Phone');
    if (!address) missingFields.push('Address');
    if (!firstSkill) missingFields.push('Primary Skill');

    // Check education fields
    const educationFields = document.querySelectorAll('#education textarea');
    educationFields.forEach((field) => {
        if ((field as HTMLTextAreaElement).value.trim() === '') {
            missingFields.push('Education Details');
        }
    });

    // Check experience fields
    const experienceFields = document.querySelectorAll('#experience textarea');
    experienceFields.forEach((field) => {
        if ((field as HTMLTextAreaElement).value.trim() === '') {
            missingFields.push('Experience Details');
        }
    });

    if (missingFields.length > 0) {
        alert(`Please complete the following fields:\n- ${missingFields.join('\n- ')}`);
        return false;
    }

    return true;
}

// Show the form
document.getElementById('startResumeButton')?.addEventListener('click', () => {
    document.getElementById('resumeFormSection')!.style.display = 'block';
    (document.querySelector('.greeting-section') as HTMLElement).style.display = 'none';
});

// Generate the resume with user data
document.getElementById('generateResumeButton')?.addEventListener('click', () => {
    if (!validateForm()) {
        return; // Stop execution if validation fails
    }

    const fullName = (document.getElementById('fullName') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;

    // Capture all education fields, including dynamically added ones
    const educationFields = document.querySelectorAll('#education, #additionalEducation textarea');
    const education = Array.prototype.slice.call(educationFields).map((textarea: HTMLTextAreaElement) => textarea.value).join('<br>');

    // Capture all experience fields, including dynamically added ones
    const experienceFields = document.querySelectorAll('#experience, #additionalExperience textarea');
    const experience = Array.prototype.slice.call(experienceFields).map((textarea: HTMLTextAreaElement) => textarea.value).join('<br>');

    // Capture all skills, including the first input and dynamically added ones
    const firstSkill = (document.getElementById('skills') as HTMLInputElement).value;
    const additionalSkills = document.querySelectorAll('#additionalSkills input');
    const allSkills = [firstSkill, ...Array.prototype.slice.call(additionalSkills).map((input: HTMLInputElement) => input.value)];

    // Load image
    const imageInput = document.getElementById('profileImage') as HTMLInputElement;
    const imageElement = document.querySelector('.profile-pic') as HTMLImageElement;
    if (imageInput?.files?.length) {
        const imageUrl = URL.createObjectURL(imageInput.files[0]);
        imageElement.src = imageUrl;
    }

    // Inject data into the resume
    document.querySelector('.personal-info h1')!.textContent = fullName;
    document.querySelector('.personal-info p:nth-of-type(1)')!.textContent = email;
    document.querySelector('.personal-info p:nth-of-type(2)')!.textContent = phone;
    document.querySelector('.personal-info p:nth-of-type(3)')!.textContent = address;
    
    // Display the list of education
    document.getElementById('educationSection')!.innerHTML = `<h2>Education</h2><p>${education}</p>`;
    
    // Display the list of experience
    document.getElementById('experienceSection')!.innerHTML = `<h2>Experience</h2><p>${experience}</p>`;
    
    // Display the list of skills
    const skillsHtml = allSkills.map(skill => `<li>${skill}</li>`).join('');
    document.getElementById('skillsSection')!.innerHTML = `<h2>Skills</h2><ul>${skillsHtml}</ul>`;

    // Hide the form and display the resume
    document.getElementById('resumeFormSection')!.style.display = 'none';
    document.getElementById('generatedResume')!.style.display = 'block';
});

// Add more education fields
document.getElementById('addEducationButton')?.addEventListener('click', () => {
    const newEducation = document.createElement('textarea');
    newEducation.placeholder = 'Enter more education details';
    newEducation.required = true;
    document.getElementById('additionalEducation')?.appendChild(newEducation);
});

// Add more experience fields
document.getElementById('addExperienceButton')?.addEventListener('click', () => {
    const newExperience = document.createElement('textarea');
    newExperience.placeholder = 'Enter more experience details';
    newExperience.required = true;
    document.getElementById('additionalExperience')?.appendChild(newExperience);
});

// Add more skill fields
document.getElementById('addSkillButton')?.addEventListener('click', () => {
    const newSkill = document.createElement('input');
    newSkill.placeholder = 'Enter a skill';
    newSkill.type = 'text';
    newSkill.required = true;
    document.getElementById('additionalSkills')?.appendChild(newSkill);
});

// Print the resume
document.getElementById('printResumeButton')?.addEventListener('click', () => {
    window.print();
});

// Download the resume as HTML
document.getElementById('downloadResumeButton')?.addEventListener('click', () => {
    const resumeContent = document.querySelector('.container')!.innerHTML;
    const blob = new Blob([resumeContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.html';
    link.click();
});
