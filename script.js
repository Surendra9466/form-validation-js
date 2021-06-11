const namee = document.querySelector(".name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const contact = document.querySelector(".contact");
const dob = document.querySelector(".dob");
const userTable = document.querySelector(".userTable");
let setOfUser = [];

function addUser(e) {
  document.querySelector(".password").style.border = "1px solid black";
  document.querySelector(".pass-label").style.visibility = "hidden";

  document.querySelector(".contact").style.border = "1px solid black";
  document.querySelector(".contact-label").style.visibility = "hidden";

  if (password.value.length < 7) {
    document.querySelector(".password").style.border = "1px solid red";
    document.querySelector(".pass-label").style.visibility = "visible";
    return false;
  }

  if (contact.value.length !== 10) {
    document.querySelector(".contact").style.border = "1px solid red";
    document.querySelector(".contact-label").style.visibility = "visible";
    return false;
  } else {
    const user = {
      User: namee.value,
      Email: email.value,
      Contact: contact.value,
      DOB: dob.value,
    };

    if (JSON.parse(sessionStorage.getItem("userDetail")) !== null) {
      // Do nothing
      setOfUser = JSON.parse(sessionStorage.getItem("userDetail"));
    }

    setOfUser.push(user);
    console.log(user);

    sessionStorage.setItem("userDetail", JSON.stringify(setOfUser));

    namee.value = "";
    email.value = "";
    password.value = "";
    contact.value = "";
    dob.value = "";
    display();
    return true;
  }
}

function display() {
  if (sessionStorage.length !== 0) {
    userTable.innerHTML = "";
    userTable.innerHTML = `<tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
        </tr>`;
    
    let userData = JSON.parse(sessionStorage.getItem("userDetail"));
    let length = userData.length;
    let output = "";
    for (let i = 0; i < length; i++) {

      let tr = document.createElement("tr");	// Create a new element
      let td1 = document.createElement("td");	// Create a new element
      let td2 = document.createElement("td");	// Create a new element
      let td3 = document.createElement("td");	// Create a new element
      let td4 = document.createElement("td");	
      let editBtn = document.createElement("button");	
      let deleteBtn = document.createElement("button");	
      editBtn.innerHTML = "Edit";
      deleteBtn.innerHTML = "Delete";
      // editBtn.setAttribute('id',i);
      deleteBtn.setAttribute('id',i);
      td1.appendChild(document.createTextNode(userData[i].User));
      td2.appendChild(document.createTextNode(userData[i].Email));
      td3.appendChild(document.createTextNode(userData[i].Contact));
      td4.appendChild(editBtn);
      td4.appendChild(deleteBtn);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      userTable.appendChild(tr);

      editBtn.addEventListener('click',(e)=>{
        console.log(e.target.id);

      })

      deleteBtn.addEventListener('click',(e)=>{
        let itemToDelete = Number(e.target.id);
        console.log(itemToDelete);
        setOfUser = JSON.parse(sessionStorage.getItem("userDetail"));
        console.log(setOfUser);
        setOfUser.splice(itemToDelete,1);
        console.log(setOfUser);
        sessionStorage.setItem("userDetail",JSON.stringify(setOfUser));        
        display();
      })
      // userTable.innerHTML += `<tr>
      //       <td>${userData[i].User}</td>
      //       <td>${userData[i].Email}</td>
      //       <td>${userData[i].Contact}</td>
      //       <td>
      //         <button >Edit<button/>
      //         <button onclick='callMe()'>Delete<button/>
      //       </td>
      //   </tr>`;

    }
  }
}

display();
