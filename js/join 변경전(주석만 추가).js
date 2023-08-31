// 중복된 아이디 판별
let randomNum = 0;
let doublecheck = false;
let userlist = JSON.parse(localStorage.getItem("users")); // 로컬스토리의 user키를 가져와서 userlist에 할당
if (!userlist) {
  // 만약 userlist에 값이 없다면
  userlist = []; // userlist는 빈 배열
}
$(".checkidbtn").on("click", function () {
  let userid = $("#userid").val(); // 아이디 입력칸의 값을 userid에 넣기
  // let userpw =$('#userpw').val()

  doublecheck = userlist.find((value) => value.userid == userid);
  // userlist에 있는 값이랑 내가 입력한 값이 같으면 그 값을 대입

  if (userid == "") {
    // 아이디 입력칸이 공백이라면
    alert("빈칸입니다 . 아이디를 입력해주세요.");
  } else if (doublecheck) {
    // 더블체크 값이 있다면
    alert("중복됩니다. 다른아이디를 입력해주세요.");
  } else {
    // 아이디 입력칸이 차있고 더블체크에 값이 없다면
    alert("사용하셔도 좋습니다.");
  }
  console.log(doublecheck);
});

// 비밀번호 확인 일치
$("#userpw2").on("input", function () {
  console.log($(this).text());
  let pw = $("#userpw").val();
  let pw2 = $(this).val();
  if (pw != pw2) {
    $(this).next().text("비밀번호가 같지 않습니다.");
    $(this).next().css({
      color: "red",
    });
  } else {
    $(this).next().text("비밀번호가 같습니다.");
    $(this).next().css({
      color: "blue",
    });
  }
});

// 인증번호 전송
$(".randomkeybtn").on("click", function () {
  // randomNum = Math.floor(Math.random()*8999)+1000
  let answer = confirm("인증번호를 발송하시겠습니까?");
  console.log(answer);
  if (answer) {
    randomNum = Math.random().toString(10).substr(2, 4);
    alert("인증번호를 입력하세요. 인증번호 : " + randomNum);
  }
});

// 인증번호 확인 버튼을 누르면
$(".randomkeysamebtn").on("click", function () {
  console.log(randomNum);
  if ($("#userhpaw").val() == randomNum) {
    alert("인증에 성공하셨습니다.");
  } else {
    alert("인증번호를 다시 입력해주세요.");
  }
});

// 인증번호의 값이 일치하지 않다면
if ($("#userhpaw").val() != randomNum) {
  alert("인증번호 확인버튼을 눌러주세요.");
  retrun;
}

//
$("#join form").on("submit", function (e) {
  e.preventDefault();
  if (doublecheck) {
    alert("중복확인을 눌러주세요.");
    return;
  }
  let flag = true;

  // input에 빈칸이 있는지 확인
  $("#join form input").each(function () {
    if ($(this).val() == "") {
      flag = false; // 빈칸이 있으면 flag는 false
    }
  });
  if (flag) {
    alert("무신사에 오신것을 환영합니다.");
    console.log("두번체크");
  } else {
    alert("모든값을 입력하세요");
    return;
  }

  let userid = $("#userid").val(); // userid라는 변수에 아이디 입력값대입
  let userpw = $("#userpw").val(); // userpw라는 변수에 비밀번호 입력값 대입
  let newuser = {
    // newuser라는 배열변수에 {userid: 아이디입력값, userpw: 비밀번호입력값} 대입
    userid: userid,
    userpw: userpw,
  };

  if (!doublecheck) {
    // 만약 doublecheck에 값이 없다면(중복된 아이디가 없다면)
    userlist.push(newuser); // userlist 배열에 newuser 넣기
    localStorage.setItem("users", JSON.stringify(userlist));
    // 로컬스토리지의 user키에 userlist의 값을 넣기
    location.href = "../html/login.html";
  }
});
