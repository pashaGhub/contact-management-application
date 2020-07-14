let contactList = [];
let duplicationAlert;

//function checking if the phone number and E-mail address are unique
function duplicationCheck(arrToCheck, phone, email) {
  if (arrToCheck.find((contact) => contact.phone === phone)) {
    alert("Contact with this PHONE NUMBER already exists!");
    return true;
  }

  if (arrToCheck.find((contact) => contact.email === email)) {
    alert("Contact with this EMAIL already exists!");
    return true;
  }

  return false;
}

//event to create a new contact
document.getElementById("createForm").addEventListener("submit", (event) => {
  event.preventDefault();

  duplicationAlert = duplicationCheck(
    contactList,
    document.getElementById("phone").value,
    document.getElementById("email").value
  );
  if (duplicationAlert) {
    return;
  }

  const obj = {
    fName: document.getElementById("fName").value,
    lName: document.getElementById("lName").value,
    date: document.getElementById("date").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    edit: false,
  };

  contactList.push(obj);
  window.localStorage.setItem("contactInfo", JSON.stringify(contactList));

  printContacts();
});

//function print all existing contacts
function printContacts() {
  document.getElementById("printedContacts").innerHTML = null;

  contactList.forEach((contact, ind) => {
    let singleContact = document.createElement("div");
    let buttons = document.createElement("div");
    let saveBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");

    let fNameLabel = document.createElement("div");
    let lNameLabel = document.createElement("div");
    let dateLabel = document.createElement("div");
    let phoneLabel = document.createElement("div");
    let emailLabel = document.createElement("div");
    let addressLabel = document.createElement("div");

    let fNameInfo;
    let lNameInfo;
    let dateInfo;
    let phoneInfo;
    let emailInfo;
    let addressInfo;

    //checking if current contact is editing
    if (contact.edit) {
      singleContact = document.createElement("form");
      fNameInfo = document.createElement("input");
      fNameInfo.setAttribute("type", "text");
      fNameInfo.setAttribute("id", "fNameInfo");
      fNameInfo.setAttribute("name", "fNameInfo");
      fNameInfo.setAttribute("pattern", "[A-Za-z]*");
      fNameInfo.setAttribute("maxlength", "15");
      fNameInfo.setAttribute("title", "Only letters are allowed");
      fNameInfo.setAttribute("value", contact.fName);
      fNameInfo.required = true;

      lNameInfo = document.createElement("input");
      lNameInfo.setAttribute("type", "text");
      lNameInfo.setAttribute("id", "lNameInfo");
      lNameInfo.setAttribute("name", "lNameInfo");
      lNameInfo.setAttribute("pattern", "[A-Za-z]*");
      lNameInfo.setAttribute("maxlength", "15");
      lNameInfo.setAttribute("title", "Only letters are allowed");
      lNameInfo.setAttribute("value", contact.lName);
      lNameInfo.required = true;

      dateInfo = document.createElement("input");
      dateInfo.setAttribute("type", "date");
      dateInfo.setAttribute("id", "dateInfo");
      dateInfo.setAttribute("name", "dateInfo");
      dateInfo.setAttribute("title", "Only letters are allowed");
      dateInfo.setAttribute("value", contact.date);
      dateInfo.required = true;

      phoneInfo = document.createElement("input");
      phoneInfo.setAttribute("type", "number");
      phoneInfo.setAttribute("id", "phoneInfo");
      phoneInfo.setAttribute("name", "phoneInfo");
      phoneInfo.setAttribute("maxlength", "15");
      phoneInfo.setAttribute("value", contact.phone);
      phoneInfo.required = true;

      emailInfo = document.createElement("input");
      emailInfo.setAttribute("type", "email");
      emailInfo.setAttribute("id", "emailInfo");
      emailInfo.setAttribute("name", "emailInfo");
      emailInfo.setAttribute("maxlength", "25");
      emailInfo.setAttribute("value", contact.email);
      emailInfo.required = true;

      addressInfo = document.createElement("input");
      fNameInfo.setAttribute("type", "text");
      addressInfo.setAttribute("id", "addressInfo");
      addressInfo.setAttribute("name", "addressInfo");
      addressInfo.setAttribute("maxlength", "30");

      //checking if ant address provided
      if (
        contact.address !== undefined &&
        contact.address !== null &&
        contact.address !== ""
      ) {
        addressInfo.setAttribute("value", contact.address);
      } else {
        addressInfo.setAttribute("value", "unknown");
      }
      buttons.appendChild(saveBtn);
    } else {
      singleContact = document.createElement("div");
      fNameInfo = document.createElement("div");
      fNameInfo.classList = "info";
      fNameInfo.textContent = contact.fName;

      lNameInfo = document.createElement("div");
      lNameInfo.classList = "info";
      lNameInfo.textContent = contact.lName;

      dateInfo = document.createElement("div");
      dateInfo.classList = "info";
      dateInfo.textContent = contact.date;

      phoneInfo = document.createElement("div");
      phoneInfo.classList = "info";
      phoneInfo.textContent = contact.phone;

      emailInfo = document.createElement("div");
      emailInfo.classList = "info";
      emailInfo.textContent = contact.email;

      addressInfo = document.createElement("div");
      addressInfo.classList = "info";

      //checking if ant address provided
      if (
        contact.address !== undefined &&
        contact.address !== null &&
        contact.address !== ""
      ) {
        addressInfo.textContent = contact.address;
      } else {
        addressInfo.textContent = "unknown";
      }

      buttons.appendChild(editBtn);
      buttons.appendChild(deleteBtn);
    }

    singleContact.classList = "singleContact";
    fNameLabel.classList = "label";
    lNameLabel.classList = "label";
    dateLabel.classList = "label";
    phoneLabel.classList = "label";
    emailLabel.classList = "label";
    addressLabel.classList = "label";
    buttons.classList = "buttons";
    editBtn.classList = "btn blue";
    deleteBtn.classList = "btn danger";
    saveBtn.classList = "btn success";

    fNameLabel.textContent = "First name:";
    lNameLabel.textContent = "Last name:";
    dateLabel.textContent = "Date of birth:";
    phoneLabel.textContent = "Phone number:";
    emailLabel.textContent = "E-mail";
    addressLabel.textContent = "Address";
    saveBtn.textContent = "Save";
    editBtn.textContent = "Edit";
    deleteBtn.textContent = "Delete";

    singleContact.appendChild(fNameLabel);
    singleContact.appendChild(fNameInfo);
    singleContact.appendChild(lNameLabel);
    singleContact.appendChild(lNameInfo);
    singleContact.appendChild(dateLabel);
    singleContact.appendChild(dateInfo);
    singleContact.appendChild(phoneLabel);
    singleContact.appendChild(phoneInfo);
    singleContact.appendChild(emailLabel);
    singleContact.appendChild(emailInfo);
    singleContact.appendChild(addressLabel);
    singleContact.appendChild(addressInfo);
    singleContact.appendChild(buttons);

    document.getElementById("printedContacts").appendChild(singleContact);

    editBtn.addEventListener("click", () => {
      contact.edit = true;
      window.localStorage.setItem("contactInfo", JSON.stringify(contactList));
      printContacts();
    });

    deleteBtn.addEventListener("click", () => {
      //double checking to delete the contact
      if (
        window.confirm(
          "Contact will be deleted irreversibly. Do you really want to proceed?"
        )
      ) {
        contactList.splice(ind, 1);
        window.localStorage.setItem("contactInfo", JSON.stringify(contactList));
        printContacts();
      }
    });

    singleContact.addEventListener("submit", (event) => {
      event.preventDefault();

      //filtering contacts array to exlude editing contact in case, if user would decide to do not edit any information
      let arrayToCheck = contactList.filter(
        (item) => item.phone !== contact.phone && item.email !== contact.email
      );
      duplicationAlert = duplicationCheck(
        arrayToCheck,
        phoneInfo.value,
        emailInfo.value
      );
      if (!duplicationAlert) {
        contact.fName = fNameInfo.value;
        contact.lName = lNameInfo.value;
        contact.date = dateInfo.value;
        contact.phone = phoneInfo.value;
        contact.email = emailInfo.value;
        contact.address = addressInfo.value;
        contact.edit = false;
        window.localStorage.setItem("contactInfo", JSON.stringify(contactList));
        printContacts();
      }
    });
  });
}

//checking localStorage if any contact already exist
let fromCasheActive = localStorage.getItem("contactInfo");
if (fromCasheActive) {
  contactList = JSON.parse(fromCasheActive);
  printContacts();
}
