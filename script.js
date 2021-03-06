function signup() {
  //    Recuperation des données
  var firstName = document.getElementById("firstName").value;
  var verifFirstName = verifLength(firstName, 3);
  if (verifFirstName) {
    document.getElementById("firstNameError").innerHTML = "";
  } else {
    document.getElementById("firstNameError").innerHTML =
      "First name must have at least 3 characters";
    document.getElementById("firstNameError").style.color = "red";
  }
  var lastName = document.getElementById("lastName").value;
  var verifLastName = verifLength(lastName, 5);
  if (verifLastName) {
    document.getElementById("lastNameError").innerHTML = "";
  } else {
    document.getElementById("lastNameError").innerHTML =
      "Last name must have at least 5 characters";
    document.getElementById("lastNameError").style.color = "red";
  }
  var email = document.getElementById("email").value;
  var verifEmail = validateEmail(email);
  if (verifEmail) {
    document.getElementById("emailError").innerHTML = "";
  } else {
    document.getElementById("emailError").innerHTML = "Invalid Email";
    document.getElementById("emailError").style.color = "red";
  }

  var emailExist = userExist(email);
  if (!emailExist) {
    document.getElementById("emailExistError").innerHTML = "";
  } else {
    document.getElementById("emailExistError").innerHTML =
      "Email already exists";
    document.getElementById("emailExistError").style.color = "red";
  }

  var password = document.getElementById("password").value;
  var verifPassword = verifLength(password, 8);
  if (verifPassword) {
    document.getElementById("passwordError").innerHTML = "";
  } else {
    document.getElementById("passwordError").innerHTML =
      "password must have at least 8 characters";
    document.getElementById("passwordError").style.color = "red";
  }
  var confirmPwd = document.getElementById("confirmPwd").value;
  if (confirmPwd == password) {
    document.getElementById("confirmPwdError").innerHTML = "";
  } else {
    document.getElementById("confirmPwdError").innerHTML =
      "invalid confirmation";
    document.getElementById("confirmPwdError").style.color = "red";
  }

  var tel = document.getElementById("tel").value;
  if (tel.length == 8 && isNaN(tel) == false) {
    document.getElementById("telError").innerHTML = "";
  } else {
    document.getElementById("telError").innerHTML =
      "tel must have at least 8 chiffres";
    document.getElementById("telError").style.color = "red";
  }

  if (
    verifFirstName &&
    verifLastName &&
    verifEmail &&
    verifPassword &&
    confirmPwd == password &&
    isNaN(tel) == false &&
    !emailExist
  ) {
    //  Regroupement des valeurs
    var idUser = JSON.parse(localStorage.getItem("idUser") || "10");
    var user = {
      id: idUser,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPwd: confirmPwd,
      tel: tel,
      role: "parent",
    };
    // recupération des anciens valeurs dans LS

    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    // Ajout de l'objet user dans le tableau usersTab
    usersTab.push(user);
    // Sauvegarde du tableau usersTab(mis à jour)
    localStorage.setItem("users", JSON.stringify(usersTab));
    localStorage.setItem("idUser", idUser + 1);
    // to reload la page we add the function:
    location.reload();
  }
}
function verifLength(ch, nb) {
  return ch.length >= nb;
}
function validateEmail(email) {
  const regExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}
function userExist(email) {
  var exist = false;
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      exist = true;
    }
  }

  return exist;
}
function insertAdmins() {
  var admin1 = {
    id: 1,
    firstName: "Amani",
    lastName: "Gammoudi",
    email: "admin1@gmail.com",
    password: "147852369",
    tel: "27128785",
    role: "admin",
  };

  var admin2 = {
    id: 2,
    firstName: "DORRA",
    lastName: "Nciri",
    email: "admin2@gmail.com",
    password: "963258741",
    tel: "58911244",
    role: "admin",
  };
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(admin1);
  users.push(admin2);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("adminsAdded", true);
}
function login() {
  var email = document.getElementById("email").value;

  var password = document.getElementById("password").value;
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var findUser;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      findUser = users[i];
    }
  }
  console.log("findUser", findUser);
  if (findUser) {
    // user exists in LS
    localStorage.setItem("connectedUser", JSON.stringify(findUser));

    if (findUser.role == "parent") {
      location.replace("sitters.html");
    } else if (findUser.role == "Sitter") {
      location.replace("sitterForm.html");
    } else {
      location.replace("dashboard.html");
    }
  } else {
    // user not exist
    document.getElementById("error").innerHTML = "please try again";

    document.getElementById("error").style.color = "red";
  }
}

function addSitter() {
  // alert("btn clicked");
  // récuperation  des données
  var firstName = document.getElementById("firstName").value;
  var verifFirstName = verifLength(firstName, 3);
  if (verifFirstName) {
    document.getElementById("firstNameError").innerHTML = "";
  } else {
    document.getElementById("firstNameError").innerHTML =
      " First name must have at least 3 characert";
    document.getElementById("firstNameError").style.color = "red";
  }
  var lastName = document.getElementById("lastName").value;
  var verifLastName = verifLength(lastName, 5);
  if (verifLastName) {
    document.getElementById("lastNameError").innerHTML = "";
  } else {
    document.getElementById("lastNameError").innerHTML =
      " last name must have at least 5charaters";
    document.getElementById("lastNameError").style.color = "red";
  }

  var email = document.getElementById("email").value;
  var verifEmail = validateEmail(email);
  if (verifEmail) {
    document.getElementById("emailError").innerHTML = "";

    var emailExist = userExist(email);
    if (!emailExist) {
      document.getElementById("emailExistError").innerHTML = "";
    } else {
      document.getElementById("emailExistError").innerHTML =
        " email already exist";
      document.getElementById("emailExistError").style.color = "red";
    }
  } else {
    document.getElementById("emailError").innerHTML = " invalid email";
    document.getElementById("emailError").style.color = "red";
  }

  var password = document.getElementById("password").value;
  var verifPassword = verifLength(password, 9);
  if (verifPassword) {
    document.getElementById("passwordError").innerHTML = "";
  } else {
    document.getElementById("passwordError").innerHTML =
      "pasword must have at least 8 characert";
    document.getElementById("passwordError").style.color = "red";
  }

  var confirmPwd = document.getElementById("confirmPwd").value;

  if (confirmPwd == password) {
    document.getElementById("confirmPwdError").innerHTML = "";
  } else {
    document.getElementById("confirmPwdError").innerHTML = "Invalid password";
    document.getElementById("confirmPwdError").style.color = "red";
  }

  var tel = document.getElementById("tel").value;

  if (tel.length == 8 && isNaN(tel) == false) {
    document.getElementById("telError").innerHTML = "";
  } else {
    document.getElementById("telError").innerHTML = "Invalid tel";
    document.getElementById("telError").style.color = "red";
  }

  var idUser = JSON.parse(localStorage.getItem("idUser") || "100");

  // regroupement des valeurs 3a isar attribut w 3a limin les valeurs, pour ajouter un objet nektbou user
  var user = {
    id: idUser,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPwd: confirmPwd,
    tel: tel,
    role: "Sitter",
  };

  // recuperation des anciennes valeurs dans ls
  var usersTab = JSON.parse(localStorage.getItem("users") || "[]");

  // ajout de l'objet user dans le tableau user
  usersTab.push(user);
  // sauvgarde du tableau userstab(mis a jour)
  localStorage.setItem("users", JSON.stringify(usersTab));
  localStorage.setItem("idUser", idUser + 1);

  // pour actualiser la page
  location.reload();
}
function replaceCh(ch) {
  var newCh = ch.replace(/\\/g, "/");
  var res = newCh.replace("fakepath", "Users/Dora/Desktop/projetsitter");
  return res;
}
function displayUsers() {
  var users = JSON.parse(localStorage.getItem("users") || "[]");

  var usersTable = `
            <table class="table">
                                <thead>
                                  <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Tel</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Actions</th>
        
                                  </tr>
                                </thead>
                                <tbody>`;

  for (let i = 0; i < users.length; i++) {
    usersTable =
      usersTable +
      `
                <tr>
                                    <th scope="row">${users[i].id}</th>
                                    <td>${users[i].firstName}</td>
                                    <td>${users[i].lastName}</td>
                                    <td>${users[i].email}</td>
                                    <td>${users[i].tel}</td>
                                    <td>${users[i].role}</td>
                                    <td>
                                        <button type="button" class="btn btn-success" onclick="editUser(${users[i].id})">Update</button>
                                        <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'users')">Delete</button>
        
                                    </td>
        
                </tr>
                `;
  }

  usersTable =
    usersTable +
    `
            </tbody>
            </table>`;

  document.getElementById("usersTable").innerHTML = usersTable;
}
function editUser(id) {
  // alert("test");
  var user = searchById(id, "users");
  console.log(user);
  var editUser = `
            <div class="col-md-12 form-group">
            <input type="password" class="form-control" id="password" name="name" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" value=${user.password}>
            <span id="passwordError"></span>
            </div>
            <div class="col-md-12 form-group">
            <input type="tel" class="form-control" id="tel" name="name" placeholder="Tel" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'" value=${user.tel}>
            <span id="telError"></span>
        
            </div>
            <div class="col-md-12 form-group">
            <button type="submit" value="submit" class="primary-btn" onclick="validateEditUser(${user.id})">Validate</button>
            </div>
        
            `;

  document.getElementById("editUser").innerHTML = editUser;
}
function searchById(id, clé) {
  var Tab = JSON.parse(localStorage.getItem(clé) || "[]");

  for (let i = 0; i < Tab.length; i++) {
    if (Tab[i].id == id) {
      return Tab[i];
    }
  }
}
function validateEditUser(id) {
  // Recupération des nouvelles valeurs
  var newPassword = document.getElementById("password").value;
  var verifPassword = verifLength(newPassword, 8);

  if (verifPassword) {
    document.getElementById("passwordError").innerHTML = "";
  } else {
    document.getElementById("passwordError").innerHTML =
      "Password must have at least 8 characters";
    document.getElementById("passwordError").style.color = "red";
  }
  var newTel = document.getElementById("tel").value;
  if (newTel.length == 8 && isNaN(newTel) == false) {
    document.getElementById("telError").innerHTML = "";
  } else {
    document.getElementById("telError").innerHTML = "Invalid tel";
    document.getElementById("telError").style.color = "red";
  }

  if (verifPassword && newTel.length == 8 && isNaN(newTel) == false) {
    // Récupération des utilisateurs dans LS
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    // Parcours tab, recherche user à modifier et modifications du password et tel
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        users[i].password = newPassword;
        users[i].tel = newTel;
      }
    }
    // Sauvegarde du mise à jour
    localStorage.setItem("users", JSON.stringify(users));
    // refresh de la page
    location.reload();
  }
}
function deleteUser(position) {
  var users = JSON.parse(localStorage.getItem("users") || "[]");

  users.splice(position, 1);

  localStorage.setItem("users", JSON.stringify(users));

  location.reload();
}

function deleteObject(position, clé) {
  var Tab = JSON.parse(localStorage.getItem(clé) || "[]");

  Tab.splice(position, 1);

  localStorage.setItem(clé, JSON.stringify(Tab));

  location.reload();
}
function confirmation() {
  var photo = document.getElementById("file").value;
  var photoSitter = replaceCh(photo);

  var DOB = document.getElementById("dateOfBirth").value;

  var maritalStatus = document.getElementById("maritalStatus").value;
  var category = document.getElementById("category").value;

  // Status :
  var status = document.getElementById("statusSitter").value;

  // Availability Per City

  var availability = document.getElementById("availabilityPerCity").value;

  // cv
  var cv = document.getElementById("cv").value;
  var resCv = replaceCh(cv);
  var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser") || "[]");

  for (let i = 0; i < usersTab.length; i++) {
    if (usersTab[i].id == connectedUser.id) {
      if (usersTab[i].role == "Sitter") {
        (usersTab[i].photoSitter = photoSitter),
          (usersTab[i].dateOfBirth = DOB);
        usersTab[i].maritalStatus = maritalStatus;
        usersTab[i].category = category;
        usersTab[i].availabilityPerCity = availability;
        usersTab[i].cv = resCv;
      }
    }
  }
  localStorage.setItem("users", JSON.stringify(usersTab));

  location.reload();
}
function displaySitters() {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var sitter = "";
  for (let i = 0; i < users.length; i++) {
    if (users[i].role == "Sitter") {
      sitter += `
            <div class="col-md-6 col-lg-3 ftco-animate">
            <div class="staff">
                                        <div class="img-wrap d-flex align-items-stretch">
                                            <div class="img align-self-stretch" style="background-image: url(${
                                              users[i].photoSitter
                                            });"></div>
                                        </div>
                                        <div class="text pt-3 text-center">
                                            <h3>${
                                              users[i].firstName +
                                              " " +
                                              users[i].lastName
                                            }</h3>
                                          
                                            <div class="faded">
                                            <p><a href="#" class="btn btn-secondary px-4 py-3 mt-3" onclick="goToReservation(${
                                              users[i].id
                                            })">Details</a></p>  
                                                <ul class="ftco-social text-center">
                                    <li class="ftco-animate"><a href="#"><span class="icon-twitter"></span></a></li>
                                    <li class="ftco-animate"><a href="#"><span class="icon-facebook"></span></a></li>
                                    <li class="ftco-animate"><a href="#"><span class="icon-google-plus"></span></a></li>
                                    <li class="ftco-animate"><a href="#"><span class="icon-instagram"></span></a></li>
                                  </ul>
                              </div>
                                        </div>
                                    </div>
                                    </div>
            `;
    }
  }

  document.getElementById("sitter").innerHTML = sitter;
}
function ediSitter(id) {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser") || "[]");

  var editUser = `
    <div class="col-md-12 form-group">
    <input type="firstName" class="form-control" id="firstName" name="name" placeholder="firstName" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" value=${connectedUser.firstName}>
    <span id="firstNameError"></span>
    </div>
    <div class="col-md-12 form-group">
    <input type="lastName" class="form-control" id="lastName" name="name" placeholder="lastName" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'" value=${connectedUser.lastName}>
    <span id="firstNameError"></span>
    </div>
    <div class="col-md-12 form-group">
    <input type="tel" class="form-control" id="tel" name="name" placeholder="Tel" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'" value=${connectedUser.tel}>
    <span id="telError"></span>

    </div>
    <div class="col-md-12 form-group">
    <input type="email" class="form-control" id="email" name="name" placeholder="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'" value=${connectedUser.email}>
    <span id="emailError"></span>

    </div>
    <div class="col-md-12 form-group">
    <input type="maritalStatus" class="form-control" id="maritalStatus" name="name" placeholder="maritalStatus" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'" value=${connectedUser.maritalStatus}>
    <span id="maritalStatusError"></span>

    </div>
    <div class="col-md-12 form-group">
    <input type="category" class="form-control" id="category" name="name" placeholder="category" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'" value=${connectedUser.category}>
    <span id="categoryError"></span>

    </div>
    <div class="col-md-12 form-group">
    <input type="status" class="form-control" id="status" name="name" placeholder="status" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'" value=${connectedUser.status}>
    <span id="statusError"></span>

    </div>
    <div class="col-md-12 form-group">
    <input type="statusSitter" class="form-control" id="statusSitter" name="name" placeholder="statusSitter" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'" value=${connectedUser.statusSitter}>
    <span id="statusSitterError"></span>

    </div>
    <div class="col-<div class="col-md-12 form-group">
    <input type="availabilityPerCity" class="form-control" id="availabilityPerCity" name="name" placeholder="availabilityPerCity" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Tel'" value=${connectedUser.availabilityPerCity}>
    <span id="availabilityPerCityError"></span>

    </div>md-12 form-group">
    <button type="submit" value="submit" class="primary-btn" onclick="validateEditUser(${connectedUser.id})">Validate</button>
    </div>

    `;

  document.getElementById("editUser").innerHTML = editUser;
}

function goToReservation(id) {
  localStorage.setItem("idSitterToReserve", id);
  location.replace("sittersDetails.html");
}

function displaySittersDetails() {
  var idSitters = localStorage.getItem("idSitterToReserve");
  var sitters = searchById(idSitters, "users");

  document.getElementById("firstName").innerHTML = sitters.firstName;
  document.getElementById("lastName").innerHTML = sitters.lastName;
  document.getElementById("tel").innerHTML = sitters.tel;
  document.getElementById("category").innerHTML = sitters.category;
  document.getElementById("maritalStatus").innerHTML = sitters.maritalStatus;
  document.getElementById("availabilityPerCity").innerHTML =
    sitters.availabilityPerCity;
}

function Appointment() {
  //    Recuperation des données
  var date = document.getElementById("date").value;
  var time = document.getElementById("time").value;
  var numberOfChildren = document.getElementById("numberOfChildren").value;
  var age = document.getElementById("age").value;
  var idRdv = JSON.parse(localStorage.getItem("idRdv") || 1);
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser") || "[]");
  var idSitterToReserve = JSON.parse(
    localStorage.getItem("idSitterToReserve") || "[]"
  );
  var appointment = JSON.parse(localStorage.getItem("appointment") || "[]");
  var rdv = {
    id: idRdv,
    idParent: connectedUser.id,
    idSitter: idSitterToReserve,
    date: date,
    time: time,
    numberOfChildren: numberOfChildren,
    age: age,
    statut: "waiting",
  };
  appointment.push(rdv);
  localStorage.setItem("appointment", JSON.stringify(appointment));
  localStorage.setItem("idRdv", idRdv + 1);
  location.reload();
}
function displayAppointmentAdmin() {
  var appointment = JSON.parse(localStorage.getItem("appointment") || "[]");
  var rdv = ``;
  rdv += `
    <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">parent</th>
                            <th scope="col">sitter</th>
                            
                        
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Number of children</th>
                            <th scope="col">Age</th>
                            <th scope="col">status</th>

                          </tr>
                        </thead>
                        <tbody>`;

  for (let i = 0; i < appointment.length; i++) {
    var parent = searchById(appointment[i].idParent, "users");
    var sitter = searchById(appointment[i].idSitter, "users");

    rdv += `
        <tr>
                            <th scope="row">${appointment[i].id}</th>
                            <td>${parent.firstName}</td>
                            <td>${sitter.firstName}</td>
                            <td>${appointment[i].date}</td>
                            <td>${appointment[i].time}</td>
                            <td>${appointment[i].numberOfChildren}</td>
                            <td>${appointment[i].age}</td>
                            <td>${appointment[i].statut}</td>
                            
                            
                            
        </tr>
        `;
  }

  rdv +
    `
    </tbody>
    </table>`;
  document.getElementById("displayRDV").innerHTML = rdv;
}

function displayDashboardSitters() {
  var appointment = JSON.parse(localStorage.getItem("appointment") || "[]");
  var rdv = ``;
  rdv += `
    <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">parent</th>
                        
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Number of children</th>
                            <th scope="col">Age</th>
                            <th scope="col">Actions</th>

                          </tr>
                        </thead>
                        <tbody>`;

  for (let i = 0; i < appointment.length; i++) {
    var parent = searchById(appointment[i].idParent, "users");
    rdv += `
        <tr>
                            <th scope="row">${appointment[i].id}</th>
                            <td>${parent.firstName}</td>
                            <td>${appointment[i].date}</td>
                            <td>${appointment[i].time}</td>
                            <td>${appointment[i].numberOfChildren}</td>
                            <td>${appointment[i].age}</td>
                            
                            <td>
                                <button type="button" class="btn btn-success" onclick="confirmAppointment(${appointment[i].id})">confirm</button>
                                <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'appointment')">Delete</button>

                            </td>

        </tr>
        `;
  }

  rdv +
    `
    </tbody>
    </table>`;
  document.getElementById("rdv").innerHTML = rdv;
}

function displayDashboardParent() {
  var appointment = JSON.parse(localStorage.getItem("appointment") || "[]");
  var rdvSitter = ``;
  rdvSitter += `
    <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">sitter</th>
                        
                            <th scope="col">Date</th>
                            
                            <th scope="col">status</th>

                          </tr>
                        </thead>
                        <tbody>`;

  for (let i = 0; i < appointment.length; i++) {
    var sitter = searchById(appointment[i].idSitter, "users");

    rdvSitter += `
        <tr>
                            <th scope="row">${appointment[i].id}</th>
                            <td>${sitter.firstName}</td>
                            <td>${appointment[i].date}</td>
                            
                            <td> ${appointment[i].statut}</td>
                            
                       

        </tr>
        `;
  }

  rdvSitter +
    `
    </tbody>
    </table>`;

  document.getElementById("rdvSitter").innerHTML = rdvSitter;
}

function confirmAppointment(id) {
  var rdv = searchById(id, "appointment");

  var appointment = JSON.parse(localStorage.getItem("appointment") || "[]");

  for (let i = 0; i < appointment.length; i++) {
    if (appointment[i].id == rdv.id) {
      appointment[i].statut = "confirm";
    }
  }
  localStorage.setItem("appointment", JSON.stringify(appointment));
  location.reload();
}

function dynamicHeader() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

  if (connectedUser) {
    //  fama user
    if (connectedUser.role == "parent") {
      var header = `
    
        <li class="nav-item active"><a href="index.html" class="nav-link pl-0" style="font-size: 20px;">HOME</a></li>
    
                    <li class="nav-item active"><a href="sitters.html" class="nav-link" style="font-size: 20px;">SITTERS</a></li>
                    <li class="nav-item active"><a href="dashboardParents.html" class="nav-link" style="font-size: 20px;">APPOINTMENTS</a></li>
                    <li class="nav-item active"><a  class="nav-link" style="font-size: 20px;">Hello ${connectedUser.firstName}</a></li>

                    <li class="nav-item active"><a href="# class="nav-link" style="font-size: 20px;"><button type="button" class="btn btn-primary" onclick="logOut()">LogOut</button> </a></li>
        `;
    } else if (connectedUser.role == "Sitter") {
      var header = `
    
            <li class="nav-item active"><a href="index.html" class="nav-link pl-0" style="font-size: 20px;">HOME</a></li>
        
                        <li class="nav-item active"><a href="sitterForm.html" class="nav-link" style="font-size: 20px;">Info</a></li>
                        <li class="nav-item active"><a href="dashboardSitters.html" class="nav-link" style="font-size: 20px;">APPOINTMENTS</a></li>
                        <li class="nav-item active"><a  class="nav-link" style="font-size: 20px;">Hello ${connectedUser.firstName}</a></li>
    
                        <li class="nav-item active"><a href="#" class="nav-link" style="font-size: 20px;"><button type="button" class="btn btn-primary" onclick="logOut()">LogOut</button> </a></li>
            `;
    } else {
      var header = `
    
            <li class="nav-item active"><a href="index.html" class="nav-link pl-0" style="font-size: 20px;">HOME</a></li>
        
                        <li class="nav-item active"><a href="addSitters.html" class="nav-link" style="font-size: 20px;">Add Sitter</a></li>
                        <li class="nav-item active"><a href="dashboard.html" class="nav-link" style="font-size: 20px;">Dashboard</a></li>
                        <li class="nav-item active"><a  class="nav-link" style="font-size: 20px;">Hello ${connectedUser.firstName}</a></li>
    
                        <li class="nav-item active"><a href="#" class="nav-link" style="font-size: 20px;"><button type="button" class="btn btn-primary" onclick="logOut()">LogOut</button> </a></li>
            `;
    }
  } else {
    // mefamch user
    var header = `
    
        <li class="nav-item active"><a href="index.html" class="nav-link pl-0" style="font-size: 20px;">HOME</a></li>
    
                    <li class="nav-item active"><a href="sitters.html" class="nav-link" style="font-size: 20px;">SITTERS</a></li>
                    <li class="nav-item active"><a href="dashboardParents.html" class="nav-link" style="font-size: 20px;">APPOINTMENTS</a></li>
                
                    <li class="nav-item active"><a href="registration.html" class="nav-link" style="font-size: 20px;"> <button type="button" class="btn btn-danger">SIGN-UP</button></a></li>
                    <li class="nav-item active"><a href="Login.html" class="nav-link" style="font-size: 20px;"><button type="button" class="btn btn-primary">LOGIN</button> </a></li>
        `;
  }

  document.getElementById("header").innerHTML = header;
}

function logOut() {
  localStorage.removeItem("connectedUser");
  location.replace("index.html");
}
