window.onload = function () {
  var username = document.querySelector(".nav-username");
  var displayname = document.querySelector(".display_name");
  var location = document.querySelector(".location");
  var reputation = document.querySelector(".reputation");
  var name = localStorage.getItem("username");
  var location = localStorage.getItem("location");
  var reputation = localStorage.getItem("userrating");
  username.innerHTML = name;
  displayname.innerHTML = name;
  location.innerHTML = location;
  reputation.innerHTML = reputation;
};
function login_func() {
  var popupBox = document.querySelector(".pop-outer1");
  popupBox.style.display = "block";
}
function signup_func() {
  var popupBox = document.querySelector(".pop-outer2");
  popupBox.style.display = "block";
}
function cancel() {
  window.location.href = "index.html";
}
function login(e) {
  e.preventDefault();
  var login_form = document.querySelector(".login_form");
  var name = login_form.name1.value;
  var pswrd = login_form.password1.value;
  var body = { username: name, password: pswrd };
  fetch(
    `http://10.194.45.228:5000/user_login?name1=${name}&password1=${pswrd}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      console.log(data);
      if (data.errorcode == "true") {
        localStorage.setItem("username", data.username);
        localStorage.setItem("location", data.location);
        localStorage.setItem("rating", data.userrating);
        alert("Login successful!");
        window.location.href = "users_page.html";
      } else {
        alert("Username or password is incorrect!");
      }
    })
    .catch((error) => console.error(error));
}
function signup(e) {
  e.preventDefault();
  var signup_form = document.querySelector(".signup_form");
  var name = signup_form.name2.value;
  var email = signup_form.email2.value;
  var pswrd = signup_form.password2.value;
  var body = { name2: name, password2: pswrd };
  fetch(`http://10.194.45.228:5000/user_signup`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        alert("Sign up successful!");
        signup_form.reset();
        window.location.href = "index.html";
      }
      throw new Error("Network response was not ok.");
    })
    .catch((error) => console.error(error));
}
function ask_ques(e) {
  e.preventDefault();
  var ask_ques_form = document.querySelector(".ask_ques_form");
  var title = ask_ques_form.textbox1.value;
  var details = ask_ques_form.textbox2.value;
  var tags = ask_ques_form.textbox3.value;
  var username = localStorage.getItem("username");
  var body = {
    title: title,
    body: details,
    tagname: tags,
    authorname: username,
  };
  fetch(`http://10.194.45.228:5000/question`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        alert("Question asked successfully!");
        // ask_ques_form.reset();
        window.location.href = "particular_question_asked_by_user_page.html";
      }
      throw new Error("Network response was not ok.");
    })
    .catch((error) => console.log(error));
}
function get_particular_ques(title) {
  console.log(title);
  localStorage.setItem("get_ques", title);
  window.location.href = "particular_question_page.html";
}

if (
  window.location.href == "http://127.0.0.1:5500/particular_question_page.html"
) {
  var q_req = localStorage.getItem("get_ques");
  fetch(`http://10.194.45.228:5000/question_title?title=${q_req}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      console.log(data);
      var q_title = document.querySelector(".questiontitle");
      q_title.innerHTML = q_req;
      const original_div = document.querySelector(".particular_answer");
      const parent_element = original_div.parentElement;
      data.forEach((answer) => {
        var clone_div = original_div.cloneNode(true);
        clone_div.class = "answer_to_ques";
        parent_element.appendChild(clone_div);
      });
    })
    .catch((error) => console.error(error));
}

function gotopage() {
  window.location.href = "edit_profile_page.html";
}
function edit_profile() {
  e.preventDefault();
  var edit_profile_form = document.querySelector(".edit_profile_form");
  var new_username = edit_profile_form.edit_username.value;
  var new_password = edit_profile_form.edit_password.value;
  var new_email = edit_profile_form.edit_email.value;
  var new_location = edit_profile_form.edit_location.value;
  var username = localStorage.getItem("username");
  var body = {
    edit_username: new_username,
    edit_password: new_password,
    edit_email: new_email,
    edit_location: new_location,
    authorname: username,
  };
  fetch(`http://10.54.9.54:5000/user_signup`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        alert("Profile updated successfully!");
        edit_profile_form.reset();
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      localStorage.setItem("username", data.username);
      localStorage.setItem("location", data.location);
      window.location.href = "users_page.html";
    })
    .catch((error) => console.error(error));
}
function delete_ques() {
  var ques_title = document.querySelector(".questiontitle");
  body = { ques_title: ques_title };
  fetch("api", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        alert("Question was deleted successfully!");
        window.location.href = "users_page.html";
      }
      throw new Error("Network response was not ok.");
    })
    .catch((error) => console.error(error));
}

if (window.location.href == "http://127.0.0.1:5500/all_users_page.html") {
  //how to write this for every user URL SPECIFICICATION
  const url = "http://10.194.45.228:5000/users_list";
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const original_div = document.querySelector(".particular_user");
      const parent_element = original_div.parentElement;
      data.forEach((user) => {
        var clone_div = original_div.cloneNode(true);
        clone_div.class = "user";
        var username = clone_div.querySelector(".name_link");
        var rating = clone_div.querySelector(".particular_rating");
        var location = clone_div.querySelector(".particular_location");
        username.innerHTML = user.username;
        rating.innerHTML = user.userrating;
        location.innerHTML = user.location;
        parent_element.appendChild(clone_div);
      });
    })
    .catch((error) => console.error(error));
}

if (
  window.location.href == "http://127.0.0.1:5500/all_questions_page.html" ||
  window.location.href == "http://127.0.0.1:5500/users_page.html"
) {
  //how to write this for every user URL SPECIFICICATION
  const url = "http://10.194.45.228:5000/question"; // api url daalna hai
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const original_div = document.querySelector(".particular_ques");
      const parent_element = original_div.parentElement;
      data.forEach((question) => {
        var clone_div = original_div.cloneNode(true);
        var total_questions = clone_div.querySelector(".total_ques_output");
        var title = clone_div.querySelector(".q_link");
        var downvotes = clone_div.querySelector(".ques_downvotes_output");
        var upvotes = clone_div.querySelector(".ques_upvotes_output");
        var answers = clone_div.querySelector(".ques_answers_output");
        // var tags = clone_div.querySelector(".ques_tags_output");
        var askedby = clone_div.querySelector(".ques_askedby_output");
        console.log(question.title);
        document
          .querySelector(".q_link")
          .setAttribute(
            "onclick",
            `return get_particular_ques('${question.title}')`
          );
        title.innerHTML = question.title; // question ka link bhi change krna padega for a particular question
        upvotes.innerHTML = question.upvotes;
        downvotes.innerHTML = question.downvotes;
        answers.innerHTML = question.answers;
        // tags.innerHTML = question.tags;
        askedby.innerHTML = question.authorname;
        // total_questions.innerHTML = data.length;
        parent_element.appendChild(clone_div);
      });
    })
    .catch((error) => console.log(error));
}

function sort_newest() {
  const url = "http://10.194.45.228:5000/question"; // api url daalna hai
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const original_div = document.querySelector(".particular_ques");
      const parent_element = original_div.parentElement;
      data.forEach((question) => {
        var clone_div = original_div.cloneNode(true);
        var total_questions = clone_div.querySelector(".total_ques_output");
        var title = clone_div.querySelector(".q_link");
        var downvotes = clone_div.querySelector(".ques_downvotes_output");
        var upvotes = clone_div.querySelector(".ques_upvotes_output");
        var answers = clone_div.querySelector(".ques_answers_output");
        // var tags = clone_div.querySelector(".ques_tags_output");
        var askedby = clone_div.querySelector(".ques_askedby_output");
        title.innerHTML = question.title; // question ka link bhi change krna padega for a particular question
        upvotes.innerHTML = question.upvotes;
        downvotes.innerHTML = question.downvotes;
        answers.innerHTML = question.answers;
        // tags.innerHTML = question.tags;
        askedby.innerHTML = question.authorname;
        // total_questions.innerHTML = data.length;
        parent_element.appendChild(clone_div);
      });
    })
    .catch((error) => console.log(error));
}
function sort_unanswered() {
  const url = "";
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const original_div = document.querySelector(".particular_ques");
      const parent_element = original_div.parentElement;
      data.forEach((question) => {
        var clone_div = original_div.cloneNode(true);
        clone_div.class = "ques";
        var total_questions = clone_div.querySelector(".total_ques_output");
        var title = clone_div.querySelector(".q_link");
        var downvotes = clone_div.querySelector(".ques_downvotes_output");
        var upvotes = clone_div.querySelector(".ques_upvotes_output");
        var answers = clone_div.querySelector(".ques_answers_output");
        var tags = clone_div.querySelector(".ques_tags_output");
        var askedby = clone_div.querySelector(".ques_askedby_output");
        title.innerHTML = question.title; // question ka link bhi change krna padega for a particular question
        upvotes.innerHTML = question.upvotes;
        downvotes.innerHTML = question.downvotes;
        answers.innerHTML = question.answers;
        tags.innerHTML = question.tags;
        askedby.innerHTML = question.askedby;
        total_questions.innerHTML = parent_element.appendChild(clone_div);
      });
    })
    .catch((error) => console.error(error));
}
function sort_score() {
  const url = ""; // api url daalna hai
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const original_div = document.querySelector(".particular_ques");
      const parent_element = original_div.parentElement;
      data.forEach((question) => {
        var clone_div = original_div.cloneNode(true);
        clone_div.class = "ques";
        var total_questions = clone_div.querySelector(".total_ques_output");
        var title = clone_div.querySelector(".q_link");
        var downvotes = clone_div.querySelector(".ques_downvotes_output");
        var upvotes = clone_div.querySelector(".ques_upvotes_output");
        var answers = clone_div.querySelector(".ques_answers_output");
        var tags = clone_div.querySelector(".ques_tags_output");
        var askedby = clone_div.querySelector(".ques_askedby_output");
        title.innerHTML = question.title; // question ka link bhi change krna padega for a particular question
        upvotes.innerHTML = question.upvotes;
        downvotes.innerHTML = question.downvotes;
        answers.innerHTML = question.answers;
        tags.innerHTML = question.tags;
        askedby.innerHTML = question.askedby;
        total_questions.innerHTML = parent_element.appendChild(clone_div);
      });
    })
    .catch((error) => console.error(error));
}

function follow() {
  var x = document.querySelector(".follow");
  if (x.innerHTML == "Follow") {
    x.innerHTML = "Unfollow";
    fetch("api", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
        }
      })
      .catch((error) => console.error(error));
  } else {
    x.innerHTML = "Follow";
  }
}

function usersfollow() {
  window.location.href = "users_profile_page_followers.html";
}
if (window.location.href == "users_profile_page_followers.html") {
  const url = "http://localhost:5000/followers";
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      const original_div = document.querySelector(".particular_user");
      const parent_element = original_div.parentElement;
      data.forEach((user) => {
        var clone_div = original_div.cloneNode(true);
        clone_div.class = "user";
        var username = clone_div.querySelector(".name_link");
        var rating = clone_div.querySelector(".particular_rating");
        var location = clone_div.querySelector(".particular_location");
        username.innerHTML = user.username;
        rating.innerHTML = user.userrating;
        location.innerHTML = user.location;
        parent_element.appendChild(clone_div);
      });
    })
    .catch((error) => console.error(error));
}

function usersfollowing() {
  window.location.href = "users_profile_page_following.html";
}
if (window.location.href == "users_profile_page_following.html") {
  const url = "api";
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      const original_div = document.querySelector(".particular_user");
      const parent_element = original_div.parentElement;
      data.forEach((user) => {
        var clone_div = original_div.cloneNode(true);
        clone_div.class = "user";
        var username = clone_div.querySelector(".name_link");
        var rating = clone_div.querySelector(".particular_rating");
        var location = clone_div.querySelector(".particular_location");
        username.innerHTML = user.username;
        rating.innerHTML = user.userrating;
        location.innerHTML = user.location;
        parent_element.appendChild(clone_div);
      });
    })
    .catch((error) => console.error(error));
}

function usersfeed() {
  window.location.href = "users_profile_page_feed.html";
}
if (
  window.location.href == "http://127.0.0.1:5500/users_profile_page_feed.html"
) {
  const url = ""; // api url daalna hai
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const original_div = document.querySelector(".particular_ques");
      const parent_element = original_div.parentElement;
      var questions = data.length;
      data.forEach((question) => {
        var clone_div = original_div.cloneNode(true);
        clone_div.class = "ques";
        var total_questions = clone_div.querySelector(".total_ques_output");
        var title = clone_div.querySelector(".q_link");
        var downvotes = clone_div.querySelector(".ques_downvotes_output");
        var upvotes = clone_div.querySelector(".ques_upvotes_output");
        var answers = clone_div.querySelector(".ques_answers_output");
        var tags = clone_div.querySelector(".ques_tags_output");
        var askedby = clone_div.querySelector(".ques_askedby_output");
        title.innerHTML = question.title; // question ka link bhi change krna padega for a particular question
        upvotes.innerHTML = question.upvotes;
        downvotes.innerHTML = question.downvotes;
        answers.innerHTML = question.answers;
        tags.innerHTML = question.tags;
        askedby.innerHTML = question.askedby;
        total_questions.innerHTML = questions;
        parent_element.innerHTML = parent_element.appendChild(clone_div);
      });
    })
    .catch((error) => console.error(error));
}

function usersbookmarks() {
  window.location.href = "users_profile_page_bookmarks.html";
}
if (
  window.location.href ==
  "http://127.0.0.1:5500/users_profile_page_bookmarks.html"
) {
  //how to write this for every user URL SPECIFICICATION
  const url = ""; // api url daalna hai
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const original_div = document.querySelector(".particular_ques");
      const parent_element = original_div.parentElement;
      var questions = data.length;
      data.forEach((question) => {
        var clone_div = original_div.cloneNode(true);
        clone_div.class = "ques";
        var total_questions = clone_div.querySelector(".total_ques_output");
        var title = clone_div.querySelector(".q_link");
        var downvotes = clone_div.querySelector(".ques_downvotes_output");
        var upvotes = clone_div.querySelector(".ques_upvotes_output");
        var answers = clone_div.querySelector(".ques_answers_output");
        var tags = clone_div.querySelector(".ques_tags_output");
        var askedby = clone_div.querySelector(".ques_askedby_output");
        title.innerHTML = question.title; // question ka link bhi change krna padega for a particular question
        upvotes.innerHTML = question.upvotes;
        downvotes.innerHTML = question.downvotes;
        answers.innerHTML = question.answers;
        tags.innerHTML = question.tags;
        askedby.innerHTML = question.askedby;
        total_questions.innerHTML = questions;
        parent_element.innerHTML = parent_element.appendChild(clone_div);
      });
    })
    .catch((error) => console.error(error));
}

function post_ans(e) {
  e.preventDefault();
  var post_ans_form = document.querySelector(".post_ans_form");
  var title = window.document.querySelector(".questiontitle");
  var ans = post_ans_form.post_ans.value;
  var username = localStorage.getItem("username");
  var body = { username: username, title: title, ans: ans };
  fetch("http://10.194.45.228:5000/answers", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        alert("Your answer was posted successfully!");
        post_ans_form.reset();
      }
      throw new Error("Network response was not ok.");
    })
    .catch((error) => console.error(error));
}

// how to go for search bars ??????
// error in user_profile_page???
// how to tackle ques_id for other users and for that user
//remove mozway from followers, following
