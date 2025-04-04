

// a function which render all registerd student
const renderAllStudent = () => {
    const student = localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : [];//store localstorage data if exist 
    const studentCtn = document.querySelector("#stdCtn");
    studentCtn.innerHTML = '';
    student.map((std) => {
        const article = document.createElement("article"); //create a new card for new student
        article.classList.add("text-2xl", "m-2", "rounded-2xl", "bg-white", "text-black", "p-2", "flex", "flex-col", "justify-around", "h-[300px]", "w-fit", "shadow-xl", "hover:scale-95", "transition-all", "ease-linear", "duration-700");
        article.innerHTML = ` 
                         <p class="text-right"><i onclick="editOpen(${std.id})" class="fa-solid fa-pencil cursor-pointer"></i></p>
                         <p><b>Name</b>:${std.name}</p> 
                         <p><b>Student ID</b>:${std.id}</p> 
                         <p><b>Email ID</b>:${std.email}</p> 
                         <p><b>Contact No</b>:${std.contact}</p> 
                         <button class="cursor-pointer" onclick="removeStudent(${std.id})"><i class="fa-solid fa-xmark"></i> Remove</button>
                     `
        studentCtn.append(article);
    })
}
renderAllStudent();









// a function which call when registration form will be submit
const registrantion = (e) => {
    e.preventDefault(); //to ensure that form should submit here


    //collect all input's value  of registration form
    const name = document.querySelector('#name')
    const studentId = document.querySelector('#studentId')
    const email = document.querySelector('#email')
    const contactNo = document.querySelector('#contactNo')
    const validMsg = document.querySelectorAll('.validMsg') //this is that where your validation error should display

    //validate input feilds
    if (name.value.length <= 3) {
        console.log(validMsg)
        validMsg[0].innerHTML = "minimum 3 charater are required";
        return;
    }

    if (studentId.value <= 0) {
        validMsg[0].innerHTML = '';
        validMsg[1].innerHTML = "Id should be greater than 0";
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        validMsg[1].innerHTML = '';
        validMsg[2].innerHTML = 'email should contain altleast 1 charetor,@,. like v@gmail.com'
        return;
    }
    if (contactNo.value.length != 10) {
        validMsg[2].innerHTML = '';
        validMsg[3].innerHTML = "contact no's length should be 10"
        return;
    }
    const student = localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : [];
    //prevent to duplicate student registration
    for (let i = 0; i < student.length; i++) {

        if (student[i].id == studentId.value) {
            alert(`student  already registered with ${studentId.value} id `)
            return;
        } else if (student[i].email == email.value) {
            alert(`student already registerd with ${email.value} email`)
            return;
        } else if (student[i].contact == contactNo.value) {
            alert(`student already registed with ${contactNo.value} contact no`);
            return;
        }
    }

    student.push({ name: name.value, id: studentId.value, email: email.value, contact: contactNo.value });
    localStorage.setItem("student", JSON.stringify(student)); //update updated data in localstorage
    name.value = "";
    studentId.value = ""
    email.value = ""
    contactNo.value = ""
    renderAllStudent();

}





//open edit section
const editOpen = (id) => {
    const student = localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : [];
    const [editStudent] = student.filter((std) => std.id == id);
    console.log(editStudent)
    const stdName = document.querySelector('#name-edit')
    const studentId = document.querySelector('#studentId-edit')
    const stdEmail = document.querySelector('#email-edit')
    const contactNo = document.querySelector('#contactNo-edit')
    stdName.value = editStudent.name;
    studentId.value = editStudent.id;
    stdEmail.value = editStudent.email;
    contactNo.value = editStudent.contact
    const editSection = document.querySelector("#editSection")
    editSection.classList.remove("scale-0");

}

//save edited data
const editStudent = (e) => {
    e.preventDefault();
    const stdName = document.querySelector('#name-edit')
    const studentId = document.querySelector('#studentId-edit')
    const stdEmail = document.querySelector('#email-edit')
    const contactNo = document.querySelector('#contactNo-edit')
    const editObj = { name: stdName.value, id: studentId.value, email: stdEmail.value, contact: contactNo.value };
    const student = localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : [];
    const newArr = student.map((std) => {
        if (std.id == studentId.value) {
            std = editObj;
        }
        return std;
    })
    localStorage.setItem("student", JSON.stringify(newArr));
    const editSection = document.querySelector("#editSection")
    editSection.classList.add("scale-0")
    renderAllStudent();
}

//close edit section
const closeEdit = () => {
    const editSection = document.querySelector("#editSection")
    editSection.classList.add("scale-0")
}



//remove student
const removeStudent = (id) => {
    const student = JSON.parse(localStorage.getItem("student"));
    const newArr = student.filter((std) => std.id != id);
    localStorage.setItem("student", JSON.stringify(newArr));
    renderAllStudent();
}