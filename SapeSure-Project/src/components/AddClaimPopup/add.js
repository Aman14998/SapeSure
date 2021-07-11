import focusTrap from "../focus";
// ------------------------------------Popup functionality-----------------------------------------
const modal = document.getElementById("myForm");
const add = document.getElementById("addClaim");
const addClaim = document.getElementById("add");
const cancel = document.getElementById("cancel");
const inputBoxes = document.getElementsByTagName("input");

// ---------------------------------------Validation------------------------------------------------
// RE
const expName = /^[A-Za-z]+$/;
const expEmail = /^[a-zA-Z0-9+-]+@[a-zA-Z0-9.-]+$/;
const expContactNo = /^\d{3}\-\d{3}\-\d{4}$/;  // eslint-disable-line no-useless-escape

// DOM fetch
const firstName = document.getElementById("txtFirstName");
const middleName = document.getElementById("txtMiddleName");
const lastName = document.getElementById("txtLastName");
const providerName = document.getElementById("txtProviderName");
const Email = document.getElementById("txtEmail");
const Dob = document.getElementById("txtDOB");
const phoneNumber = document.getElementById("telContact");
const claimAmount = document.getElementById("txtClaimAmt");
const fileArea=document.getElementById("area");

// Error DOM fetch
const fnError = document.getElementById('data__input--error-fn');
const lnError = document.getElementById('data__input--error-ln');
const pnError = document.getElementById('data__input--error-pn');
const emailError = document.getElementById("data__input--error-email");
const genderError = document.getElementById("data__input--error-gender");
const contactError = document.getElementById("data__input--error-contact");
const clAmtError = document.getElementById("data__input--error-cl-amt");
const fileError=document.getElementById("data__input--error-file");
const dobError=document.getElementById("data__input--error-dob");

// formatting phone number to xxx-xxx-xxxx format
phoneNumber.addEventListener("keyup", () => {
    let temp = phoneNumber.value;

    if (temp.length > 10) phoneNumber.value = temp.slice(0, 12);
    temp = temp.replaceAll("-", "");
    let part1 = "";
    let part2 = "";
    let part3 = "";

    if (temp.length === 3) {
        part1 = temp.substr(0, 3);
        part2 = temp.substr(3);
        phoneNumber.value = `${part1}-${part2}`;
    }

    if (temp.length === 7) {
        part1 = temp.substr(0, 3);
        part2 = temp.substr(3, 3);
        part3 = temp.substr(6);
        phoneNumber.value = `${part1}-${part2}-${part3}`;
    }

    if (temp.length === 10) {
        part1 = temp.substr(0, 3);
        part2 = temp.substr(3, 3);
        part3 = temp.substr(6, 4);
        phoneNumber.value = `${part1}-${part2}-${part3}`;
    }
});

// formatting claim amount to $XX XXX
let show;
const validateClaimAmount = (currencyElement) => {
    let amount = currencyElement.value;
    amount = amount.replace(/[$,-]/g, "");
    if (amount < 10001) {
        let temp = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
        temp = temp.replace(".00", "");
        show = temp;
        return temp;
    }
    return show;
};
claimAmount.addEventListener("keyup", () => {
    const amount = validateClaimAmount(claimAmount);
    claimAmount.value = amount;
});

// ------------------------------------------file uploading & removal--------------------------------------------------
const attachment = document.getElementById("docs");
const validateFileType = () => {
    // attachment.files is giving an object of selected files
    // Object.values converting it into array
    let totalFileSize = 0;
    const fileList = Object.values(attachment.files);
    const attachedDocs = fileList.map((file) => {
        const fileName = file.name;
        const indexDot = fileName.lastIndexOf(".") + 1;
        // fetching extension
        const extFile = fileName.substr(indexDot, fileName.length).toLowerCase();
        if (
            extFile === "jpg" ||
            extFile === "jpeg" ||
            extFile === "png" ||
            extFile === "pdf"
        ) {
            // validate file type at client side
            const bitSize = 1024;
            const fileSize = Math.round(file.size / bitSize);
            totalFileSize += fileSize;
            const validateSize = 1024;
            const allFiles = 5120;
            if (fileSize < validateSize && totalFileSize < allFiles) {
                // validate file size
                if (extFile === "jpg") {
                    return `<div class="selected-file">
                      <div><i class="fas fa-file-image file-icon" width="20px"></i></div>
                      <div class="file-name">${fileName}<div class="file-size">${fileSize}kb</div></div>
                      <div><i class="far fa-times-circle remove-attached-file" width="10px"></i></div>
                    </div>`;
                }
                if (extFile === "jpeg") {
                    return `<div class="selected-file">
                      <div><i class="far fa-file-image file-icon" width="20px"></i></div>
                      <div class="file-name">${fileName}<div class="file-size">${fileSize}kb</div></div>
                      <div><i class="far fa-times-circle remove-attached-file" width="10px"></i></div>
                     </div>`;
                }
                if (extFile === "pdf") {
                    return `<div class="selected-file">
                      <div><i class="fas fa-file-pdf file-icon" width="20px"></i></i></div>
                      <div class="file-name"><b>${fileName}</b><div class="file-size">${fileSize}kb</div></div>
                      <div><i class="far fa-times-circle remove-attached-file" width="10px"></i></div>
                    </div>`;
                }
                if (extFile === "png") {
                    return `<div class="selected-file">
                      <div><i class="fas fa-file-image file-icon" width="20px"></i></div>
                      <div class="file-name">${fileName}<div class="file-size">${fileSize}kb</div></div>
                      <div><i class="far fa-times-circle remove-attached-file" width="10px"></i></div>
                    </div>`;
                }
            }
            
            fileError.innerHTML="File should not be Greater than 1Mb";
            fileError.setAttribute("style","color:red");
        } else {
            fileError.innerHTML="Only jpg/jpeg/png and pdf files are allowed!";
            fileError.setAttribute("style","color:red") 
        }
        return "";
    });
    // setting selected file to html page
    document.querySelector("#area").innerHTML = attachedDocs.join("");
};
attachment.addEventListener("change", validateFileType);
document.addEventListener("DOMContentLoaded", () => {
    modal.addEventListener("click", (e) => {
        if (e.target.classList[2] === "remove-attached-file") {
            e.target.parentNode.parentNode.parentNode.removeChild(
                e.target.parentNode.parentNode
            );
        }
    });
});

// Dates
const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const currentDay = date.getDate();
/* eslint-disable no-undef */
$(() => {
    $("#txtDOB").datepicker({
        changeMonth: true,  // month section is coming in dropdown way.
        changeYear: true,   // year section is coming in dropdown way.
        dateFormat:'mm-dd-yy', // formatting date.
        maxDate: new Date(currentYear, currentMonth, currentDay),
        yearRange: `1950:${currentYear}`, // accepting past year upto 1950.
    });
});

// ---------------------Inserting Data into table------------------------
const register = {
    claimId: "",
    claimantName: "",
    claimantEmail: "",
    providerName: "",
    claimDate: "",
    claimedAmount:"",
    status: "Pending"
};

const table = document.querySelector("table");

function addDataIntoTable(){
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);
    const cell8 = row.insertCell(7);

    cell1.innerHTML = `<a href="#">${register.claimId}</a>`;
    cell2.innerHTML = register.claimantName;
    cell3.innerHTML = `<a href="mailto:${register.claimantEmail}">${register.claimantEmail}</a>`;
    cell4.innerHTML = register.providerName;
    cell5.innerHTML = `07-02-2021`;
    // cell5.innerHTML = register.claimDate;
    cell6.innerHTML = `<span>$${0} &nbsp &nbsp</span> / ${register.claimedAmount} <span class="amount-pending">(-)</span>`;
    cell7.innerHTML = `<span class="dropdown__check--status dropdown__check--pending">${register.status}</span>`;
    cell8.innerHTML = `<button aria-label="pass claim" class="table__addbtn"><i class="far fa-check-circle"><span class="table__addbtn--tooltip pass">Pass Claim</span></i></button>
                        <button  aria-label="deny claim" class="table__addbtn"><i class="far fa-times-circle"><span class="table__addbtn--tooltip  deny">Deny Claim</span></i></button>
                        <a href= "/claimData.zip" class="table__addbtn" style="color:#9c106c" target="_blank" download><i class="far fa-arrow-alt-circle-down"><span class="table__addbtn--tooltip download">Download</span></i></a>`;
}

// ---------------------------------------------Main Validation----------------------------------------------------
function resetFun(){
    modal.style.display = "none";

    inputBoxes.forEach ((input) => {
        input.style.border = "1px solid gray"; // eslint-disable-line no-param-reassign
    });
    document.getElementById("search").style.border = "none";

    fnError.innerHTML="";
    lnError.innerHTML="";
    pnError.innerHTML="";
    emailError.innerHTML="";
    genderError.innerHTML="";
    contactError.innerHTML="";
    clAmtError.innerHTML="";
    dobError.innerHTML="";
    fileError.innerHTML="";
    fileArea.innerHTML="";
}

function addedClaim() {
    let timeStamp = new Date().valueOf();
    timeStamp = timeStamp.toString().slice(0, 10);
    
    let dt = new Date().toLocaleDateString("en-US");
    dt = dt.replaceAll("/", "-");

    register.claimId = `CID${timeStamp}`;
    register.claimantName = `${firstName.value} ${middleName.value} ${lastName.value}`;
    register.claimantEmail = Email.value;      
    register.providerName = providerName.value;
    register.claimDate = dt; 
    register.claimedAmount = claimAmount.value; 
    
    addDataIntoTable(register); 
    resetFun();
}

function Validate() {
    let errorFlag = 0;
    // first name
    if (!expName.test(firstName.value) || (firstName.value === " ")) {
        errorFlag = 1;
        firstName.setAttribute("style", "border:1.5px solid red");
        firstName.value = "";
        firstName.setAttribute("placeholder", "e.g. John");
        fnError.innerHTML = "Please enter first name";
        fnError.setAttribute("style", "color:red");
    }
    // middle name
    if (!expName.test(middleName.value)) {
        errorFlag = 1;
        middleName.value = "";
        middleName.setAttribute("placeholder", "e.g. Smith");
    }
    // last name
    if (!expName.test(lastName.value) || (lastName.value === " ")) {
        errorFlag = 1;
        lastName.setAttribute("style", "border:1.5px solid red");
        lastName.value = "";
        lastName.setAttribute("placeholder", "e.g. Doe");
        lnError.innerHTML = "Please enter last name";
        lnError.setAttribute("style", "color:red");
    }
    // provider name
    if (!expName.test(providerName.value) || (providerName.value === " ")) {
        errorFlag = 1;
        providerName.setAttribute("style", "border:1.5px solid red");
        providerName.value = "";
        providerName.setAttribute("placeholder", "e.g. Appllo Pharmaceuticals");
        pnError.innerHTML = "Please enter provider name";
        pnError.setAttribute("style", "color:red");
    }
    // email
    if (!expEmail.test(Email.value) || (Email.value === " ")) {
        errorFlag = 1;
        Email.setAttribute("style", "border:1.5px solid red");
        Email.value = "";
        Email.setAttribute("placeholder", "e.g. name@domain.com");
        emailError.innerHTML = "Please enter email";
        emailError.setAttribute("style", "color:red");
    }
    // contact number
    if (!expContactNo.test(phoneNumber.value) || (phoneNumber.value === " ")) {
        errorFlag = 1;
        phoneNumber.setAttribute("style", "border:1.5px solid red");
        phoneNumber.value = "";
        phoneNumber.setAttribute("placeholder", "XX-XXX-XXXX");
        contactError.innerHTML = "Please enter phone number"
        contactError.setAttribute("style", "color:red");
    }
    // claim amount 
    if (claimAmount.value.length === 0) {
        errorFlag = 1;
        claimAmount.setAttribute("style", "border:1.5px solid red");
        claimAmount.value = "";
        claimAmount.setAttribute("placeholder", "e.g. $ xx,xxx")
        clAmtError.innerHTML = "Please enter claim amount";
        clAmtError.setAttribute("style", "color:red");
    }
    // gender validation
    const genderGroup = document.querySelector('input[name="gender"]:checked');
    if (genderGroup == null) {
        errorFlag=1;
        genderError.innerHTML="Please select any gender";
        genderError.setAttribute("style","color:red");
    }
    // file validation
    if(fileArea.innerHTML=== ""){
        errorFlag=1;
        fileError.innerHTML= "Please attach a file";
        fileError.setAttribute("style","color:red");
    }
    // dob validation
    if(Dob.value===""){
        errorFlag=1;
        Dob.setAttribute("style", "border:1.5px solid red");
        Dob.value = "";
        Dob.setAttribute("placeholder", "MM-DD-YYYY")
        dobError.innerHTML = "Please enter date of birth";
        dobError.setAttribute("style", "color:red");
    }
    if (errorFlag === 0) {
        addedClaim();
    }
}

addClaim.addEventListener("click", Validate);

add.addEventListener("click", () => {
    modal.style.display = "block";
    focusTrap();
});

cancel.addEventListener("click", () => {
    resetFun();
});


