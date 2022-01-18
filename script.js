const btnAddTask = document.querySelector(".btn");
const listTasks = document.querySelector(".list-group");
const enterText = document.querySelector(".form-control");
localStorage.setItem("tasks", JSON.stringify([]));

const showTasks = () => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks?.map((task) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapperTask");
    const containerTask = document.createElement("li");
    containerTask.classList.add("list-group-item");
    containerTask.innerHTML = task.title;
    const inputText = document.createElement("input");
    inputText.classList.add("form-control");
    inputText.classList.add("hidden");
    const inputCheckBox = document.createElement("input");
    inputCheckBox.type = "checkbox";
    inputCheckBox.classList.add("form-check-input", "inputCheckBox");

    const btnDel = document.createElement("button");
    btnDel.innerHTML = "Delete";
    btnDel.classList.add("btn", "btn-danger");

    btnDel.addEventListener("click", () => {
      const copyTasks = tasks.concat().filter((elem) => elem.id !== task.id);
      tasks = [...copyTasks];
      localStorage.setItem("tasks", JSON.stringify(tasks));
      listTasks.innerHTML = "";
      showTasks();
    });
    const btnEdit = document.createElement("button");
    btnEdit.innerHTML = "Edit";
    btnEdit.classList.add("btn", "btn-info");

    btnEdit.addEventListener("click", () => {
      const copyTasks = tasks.concat().map((elem) => {
        if (elem.id === task.id) {
          elem.edit = true;
          return elem;
        }
        elem.edit = false;
        return elem;
      });
      tasks = [...copyTasks];
      localStorage.setItem("tasks", JSON.stringify(tasks));
      listTasks.innerHTML = "";
      showTasks();
    });

    const btnSave = document.createElement("button");
    btnSave.innerHTML = "Save";
    btnSave.classList.add("btn", "btn-success", "hidden");

    btnSave.addEventListener("click", () => {
      const copyTasks = tasks.concat().map((elem) => {
        if (elem.id === task.id) {
          elem.title = inputText.value;
          elem.edit = false;
          return elem;
        }
        return elem;
      });
      tasks = [...copyTasks];
      localStorage.setItem("tasks", JSON.stringify(tasks));
      listTasks.innerHTML = "";
      showTasks();
    });

    inputCheckBox.addEventListener("click", function () {
      if (this.checked) {
        const copyTasks = tasks.concat().map((elem) => {
          if (elem.id === task.id) {
            elem.isCheck = true;
            return elem;
          }
          return elem;
        });
        tasks = [...copyTasks];
        localStorage.setItem("tasks", JSON.stringify(tasks));
        listTasks.innerHTML = "";
        showTasks();
      } else {
        const copyTasks = tasks.concat().map((elem) => {
          if (elem.id === task.id) {
            elem.isCheck = false;
            return elem;
          }
          return elem;
        });
        containerTask.classList.remove("done");
        btnEdit.disabled = false;
        btnDel.disabled = false;
        tasks = [...copyTasks];
        localStorage.setItem("tasks", JSON.stringify(tasks));
        listTasks.innerHTML = "";
        showTasks();
      }
    });

    if (task.isCheck) {
      inputCheckBox.checked = true;
      btnEdit.disabled = true;
      btnDel.disabled = true;
      containerTask.classList.add("done");
    }

    if (task.edit) {
      inputText.classList.remove("hidden");
      inputText.onfocus = () => {
        inputText.select();
      };
      inputText.value = task.title;
      btnSave.classList.remove("hidden");
      btnEdit.classList.add("hidden");
      containerTask.classList.add("hidden");
    }

    wrapper.appendChild(inputCheckBox);
    wrapper.appendChild(containerTask);
    wrapper.appendChild(inputText);
    wrapper.appendChild(btnEdit);
    wrapper.appendChild(btnSave);
    wrapper.appendChild(btnDel);
    listTasks.appendChild(wrapper);
  });
};

showTasks();

export const addTask = (value) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {

  }
  if (!value) {
    return `Должно содержать значение`;
  }
  if (tasks || enterText || listTasks) {
    tasks?.push({
      id: new Date().getTime(),
      title: value,
      edit: false,
      isCheck: false,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    enterText.value = "";
    listTasks.innerHTML = "";
    showTasks();
  }
  return "Задача добавлена";
};
if (btnAddTask) {
  btnAddTask.addEventListener("click", () => {
    addTask(enterText.value);
  });
}

document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask(enterText.value);
  }
});
