
const studentName = document.getElementById("name");
const studentEmail = document.getElementById("email");
const studentWebsite = document.getElementById("website");
const studentImageLink = document.getElementById("image-link");
const studentForm = document.getElementById("studentForm");
const localStorageCookie = "EnrolledStudents";


var isValid = true;


// Retrieving Data from Local Storage if page is loaded or reloaded!
onRefreshReloadPage();

function onRefreshReloadPage() {
    var enrolledStudents = JSON.parse(localStorage.getItem(localStorageCookie));
    if (enrolledStudents == null) {
        return;
    }
    for (var i = 0; i < enrolledStudents.length; i++) {
        console.log(enrolledStudents[i]);
        displayRecord(enrolledStudents[i]);
    }
}

studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    isValid = true;
    validateForm();
    if (!isValid) {
        alert("Please fill the required Fields with correct input!!");
        return false;
    }
    submitForm();
    clearFields();
    return true;
});


studentForm.addEventListener('reset', clearFields);

function clearFields() {
    studentName.className = "form-control";
    studentEmail.className = "form-control";
    studentWebsite.className = "form-control";
    studentImageLink.className = "form-control";
    document.getElementById("genderOption").style.outline = "none";
    document.getElementById("spanGender").style.visibility = "hidden";
    document.getElementById("spanName").style.visibility = "hidden";
    document.getElementById("spanEmail").style.visibility = "hidden";
    document.getElementById("spanWebsite").style.visibility = "hidden";
}

function submitForm() {
    let name = studentName.value;
    let email = studentEmail.value;
    let website = studentWebsite.value;
    let imageLink = studentImageLink.value;
    let gender = getGender();
    var skillsChecked = [];
    getCheckedSkills(skillsChecked);

    if (imageLink == null || imageLink == "") {
        imageLink = "images/defaultImage.png";
    }


    let studentRecord = {
        'name': name,
        'gender': gender,
        'email': email,
        'website': website,
        'skills': skillsChecked,
        'image': imageLink
    }

    console.log(studentRecord);

    var enrolledRecords;
    //Check for Local Storage
    if (localStorage.getItem(localStorageCookie) == null) {
        enrolledRecords = [];
    } else {
        enrolledRecords = JSON.parse(localStorage.getItem(localStorageCookie));
    }
    enrolledRecords.push(studentRecord);
    displayRecord(studentRecord);

    //Add the records to local storage
    localStorage.setItem(localStorageCookie, JSON.stringify(enrolledRecords));

}


function getGender() {
    var rbMale = document.getElementById("male");
    var rbFemale = document.getElementById("female");
    if (rbMale.checked) {
        return "Male";
    }
    return "Female";
}


function getCheckedSkills(skillsChecked) {
    var checkboxes = document.querySelectorAll(".form-check-input.checkbox");
    for (var checkbox of checkboxes) {
        if (checkbox.checked == true) {
            skillsChecked.push(checkbox.value);
        }
    }
}

function displayRecord(record) {
    let data = `
                <tr>
                    <td>
                        ${record.name}
                        <p> ${record.gender} 
                            <br>
                            ${record.email}
                            <br>
                            <a href="${record.website}" target="_blank">${record.website}</a>
                            <br>
                            ${record.skills.join(" , ")}
                        </p>
                    </td>
                    <td>
                        <img src="${record.image}" alt="studentPhoto">
                    </td>
                </tr>`;
    var tbody = document.getElementById("tableBody");
    tbody.innerHTML += data;
}

//Validating Forms!
function validateForm() {
    isValid = true;
    validateName();
    validateEmail();
    validateUrl();
    validateGender();
}

function validateName() {
    var inputName = studentName.value;
    var nameRegX = new RegExp("^[A-Za-z. ]{3,20}$");
    if (nameRegX.test(inputName)) {
        studentName.className = "form-control success";
        document.getElementById("spanName").style.visibility = "hidden";
        return;
    }
    isValid = false;
    studentName.className = "form-control error";
    document.getElementById("spanName").style.top = "-6%";
    if (inputName == "") {
        document.getElementById("spanName").innerText = "Required!!";
        document.getElementById("spanName").style.visibility = "visible";
        return;
    }
    if (inputName.length < 3) {
        document.getElementById("spanName").innerText = "Name should be of 3 - 20 characters";
        document.getElementById("spanName").style.visibility = "visible";
    }
}



function validateEmail() {
    var inputEmail = studentEmail.value;
    var mailRegex = new RegExp("^[A-Za-z0-9._]{2,}[@][A-Za-z]{3,}[.][A-Za-z.]{2,}$");
    if (mailRegex.test(inputEmail)) {
        studentEmail.className = "form-control success";
        document.getElementById("spanEmail").style.visibility = "hidden";
        return;
    }
    isValid = false;
    studentEmail.className = "form-control error";
    document.getElementById("spanEmail").style.top = "5%";
    if (inputEmail == "") {
        document.getElementById("spanEmail").innerText = "Required!!";
        document.getElementById("spanEmail").style.visibility = "visible";
        return;
    }
    document.getElementById("spanEmail").innerText = "Invalid Email!!";
    document.getElementById("spanEmail").style.visibility = "visible";
}


function validateUrl() {
    var inputUrl = studentWebsite.value;
    var urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if (urlRegex.test(inputUrl)) {
        website.className = "form-control success";
        document.getElementById("spanWebsite").style.visibility = "hidden";
        return;
    }
    isValid = false;
    website.className = "form-control error";
    document.getElementById("spanWebsite").style.top = "20%";
    if (inputUrl == "") {
        document.getElementById("spanWebsite").innerText = "Required!!";
        document.getElementById("spanWebsite").style.visibility = "visible";
        return;
    }
    document.getElementById("spanWebsite").innerText = "Invalid Website!!";
    document.getElementById("spanWebsite").style.visibility = "visible";
}


function validateGender() {
    var rbMale = document.getElementById("male");
    var rbFemale = document.getElementById("female");
    if (!rbMale.checked && !rbFemale.checked) {
        document.getElementById("spanGender").style.top = "46%";
        document.getElementById("genderOption").style.outline = "1px solid red";
        document.getElementById("spanGender").style.visibility = 'visible';
        isValid = false;
    }
    else {
        document.getElementById("genderOption").style.outline = "none";
        document.getElementById("spanGender").style.visibility = "hidden";
    }
}










