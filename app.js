const html = document.documentElement;
const modeToggle = document.getElementById("mode-toggle");
const checkMode = localStorage.getItem("mode");
const userForm = document.forms[0];
const userCounter = document.getElementById("user-counter");
const searchUser = document.getElementById("search-user");

const usersList = document.getElementById("users-list");
usersList.innerHTML = "";
const apdateUI = (users) => {
  users.forEach((user) => {
    const { url, firstName, lastName, age, gender, id } = user;
    usersList.innerHTML += `  
    <div
    class="md:max-w-md rounded overflow-hidden shadow-lg border border-white relative"
  >
 
  <button data-id=${id} class="absolute top-[1px]right-[50px] text-xl hover:text-red-500 transition duration-300 pl-1.5 ">
  <i class="fas fa-trash pointer-events-none"></i>
  </button>

    <img
      class="w-full h-[300px] object-cover"
      src="${url}"
      alt=""
    />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">
        <h1  class="text-md" fullName>${firstName} ${lastName}</h1>
        <p>Gender:${gender}</p>
        <p>Age:${age}</p>
      </div>
    </div>
  </div>
  `;
  });
};
const uudi = uuid.v4();
const time = new Date();

let allUsers = JSON.parse(localStorage.getItem("users")) || [];

if (allUsers.length) {
  apdateUI(allUsers);
  userCounter.textContent = allUsers.length || 0;
}

if (checkMode) {
  html.classList.add(checkMode);
  if (html.classList.contains("dark")) {
    modeToggle.textContent = "light";
  } else {
    modeToggle.textContent = "dark";
  }
}

modeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  if (html.classList.contains("dark")) {
    modeToggle.textContent = "light";
    localStorage.setItem("mode", "dark");
  } else {
    modeToggle.textContent = "dark";
    localStorage.setItem("mode", "light");
  }
  allUsers.push(person);
});

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const person = {
    id: uuid.v4(),
    time: new Date().toLocaleString(),
    firstName: userForm["last_name"].value,
    lastName: userForm["last_name"].value,
    age: userForm.age.value,
    url: userForm.url.value,
    gender: userForm.gender.value,
    check: userForm["checked-checkbox"].checked,
  };
  allUsers.unshift(person);
  userCounter.textContent = allUsers.length;
  apdateUI(allUsers);

  localStorage.setItem("users", JSON.stringify(allUsers));
});

document.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id) {
    e.target.parentElement.remove();

    const filterUsers = allUsers.filter((user) => {
      return user.id == !id;
    });
    localStorage.setItem("users", JSON.stringify(filterUsers));
    allUsers = filterUsers;
    userCounter.textContent.allUsers.length || 0;
  }
});

searchUser.addEventListener("input", () => {
  const usersFullName = document.querySelectorAll(".fullName");
  const inputValue = searchUser.value;
  usersFullName.forEach((userFullName) => {
    if (userFullName.textContent.toLowerCase().includes(inputValue)) {
      userFullName.parentElement.style.display = "block";
    } else {
      userFullName.parentElement.style.display = "none";
    }
  });
});
