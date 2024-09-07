var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b, _c, _d, _e, _f, _g;
// Function to validate the form fields
function validateForm() {
    var missingFields = [];
    // Check if all personal information fields are filled
    var fullName = document.getElementById('fullName').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var address = document.getElementById('address').value.trim();
    var firstSkill = document.getElementById('skills').value.trim();
    if (!fullName)
        missingFields.push('Full Name');
    if (!email)
        missingFields.push('Email');
    if (!phone)
        missingFields.push('Phone');
    if (!address)
        missingFields.push('Address');
    if (!firstSkill)
        missingFields.push('Primary Skill');
    // Check education fields
    var educationFields = document.querySelectorAll('#education textarea');
    educationFields.forEach(function (field) {
        if (field.value.trim() === '') {
            missingFields.push('Education Details');
        }
    });
    // Check experience fields
    var experienceFields = document.querySelectorAll('#experience textarea');
    experienceFields.forEach(function (field) {
        if (field.value.trim() === '') {
            missingFields.push('Experience Details');
        }
    });
    if (missingFields.length > 0) {
        alert("Please complete the following fields:\n- ".concat(missingFields.join('\n- ')));
        return false;
    }
    return true;
}
// Show the form
(_a = document.getElementById('startResumeButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    document.getElementById('resumeFormSection').style.display = 'block';
    document.querySelector('.greeting-section').style.display = 'none';
});
// Generate the resume with user data
(_b = document.getElementById('generateResumeButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var _a;
    if (!validateForm()) {
        return; // Stop execution if validation fails
    }
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    // Capture all education fields, including dynamically added ones
    var educationFields = document.querySelectorAll('#education, #additionalEducation textarea');
    var education = Array.prototype.slice.call(educationFields).map(function (textarea) { return textarea.value; }).join('<br>');
    // Capture all experience fields, including dynamically added ones
    var experienceFields = document.querySelectorAll('#experience, #additionalExperience textarea');
    var experience = Array.prototype.slice.call(experienceFields).map(function (textarea) { return textarea.value; }).join('<br>');
    // Capture all skills, including the first input and dynamically added ones
    var firstSkill = document.getElementById('skills').value;
    var additionalSkills = document.querySelectorAll('#additionalSkills input');
    var allSkills = __spreadArray([firstSkill], Array.prototype.slice.call(additionalSkills).map(function (input) { return input.value; }), true);
    // Load image
    var imageInput = document.getElementById('profileImage');
    var imageElement = document.querySelector('.profile-pic');
    if ((_a = imageInput === null || imageInput === void 0 ? void 0 : imageInput.files) === null || _a === void 0 ? void 0 : _a.length) {
        var imageUrl = URL.createObjectURL(imageInput.files[0]);
        imageElement.src = imageUrl;
    }
    // Inject data into the resume
    document.querySelector('.personal-info h1').textContent = fullName;
    document.querySelector('.personal-info p:nth-of-type(1)').textContent = email;
    document.querySelector('.personal-info p:nth-of-type(2)').textContent = phone;
    document.querySelector('.personal-info p:nth-of-type(3)').textContent = address;
    // Display the list of education
    document.getElementById('educationSection').innerHTML = "<h2>Education</h2><p>".concat(education, "</p>");
    // Display the list of experience
    document.getElementById('experienceSection').innerHTML = "<h2>Experience</h2><p>".concat(experience, "</p>");
    // Display the list of skills
    var skillsHtml = allSkills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join('');
    document.getElementById('skillsSection').innerHTML = "<h2>Skills</h2><ul>".concat(skillsHtml, "</ul>");
    // Hide the form and display the resume
    document.getElementById('resumeFormSection').style.display = 'none';
    document.getElementById('generatedResume').style.display = 'block';
});
// Add more education fields
(_c = document.getElementById('addEducationButton')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    var _a;
    var newEducation = document.createElement('textarea');
    newEducation.placeholder = 'Enter more education details';
    newEducation.required = true;
    (_a = document.getElementById('additionalEducation')) === null || _a === void 0 ? void 0 : _a.appendChild(newEducation);
});
// Add more experience fields
(_d = document.getElementById('addExperienceButton')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
    var _a;
    var newExperience = document.createElement('textarea');
    newExperience.placeholder = 'Enter more experience details';
    newExperience.required = true;
    (_a = document.getElementById('additionalExperience')) === null || _a === void 0 ? void 0 : _a.appendChild(newExperience);
});
// Add more skill fields
(_e = document.getElementById('addSkillButton')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () {
    var _a;
    var newSkill = document.createElement('input');
    newSkill.placeholder = 'Enter a skill';
    newSkill.type = 'text';
    newSkill.required = true;
    (_a = document.getElementById('additionalSkills')) === null || _a === void 0 ? void 0 : _a.appendChild(newSkill);
});
// Print the resume
(_f = document.getElementById('printResumeButton')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function () {
    window.print();
});
// Download the resume as HTML
(_g = document.getElementById('downloadResumeButton')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', function () {
    var resumeContent = document.querySelector('.container').innerHTML;
    var blob = new Blob([resumeContent], { type: 'text/html' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.html';
    link.click();
});
