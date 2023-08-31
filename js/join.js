// 중복된 아이디 판별
let randomNum = 0;
let userlist = JSON.parse(localStorage.getItem("users"));
if (!userlist) {
  userlist = [];
}

// 중복체크 버튼을 눌렀을 때
/* 
더블체크의 값을 true로 시작해서 공백일경우와 중복된 아이디가 있을경우는 true 값 ,
사용가능한 아이디는 false로 진행(나중에 회원가입 버튼 눌렀을 때 doublecheck의 값이 false일때만 넘어가게 함)
 */
let doublecheck = true;
$(".checkidbtn").on("click", function () {
  let userid = $("#userid").val();
  if (userid == "") {
    alert("빈칸입니다 . 아이디를 입력해주세요.");
    return false;
  } else {
    doublecheck = userlist.find((value) => value.userid == userid);
    if (doublecheck) {
      alert("중복된 아이디입니다.");
      return false;
    } else {
      alert("사용하셔도 좋습니다.");
      doublecheck = false;
    }
  }
  console.log(doublecheck);
});

// 비밀번호 확인 일치
let doublecheckpw = true;
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
    doublecheckpw = false;
    $(this).next().text("비밀번호가 같습니다.");
    $(this).next().css({
      color: "blue",
    });
  }
});

// 인증번호 전송
$(".randomkeybtn").on("click", function () {
  // 휴대폰 번호가 입력되어있는지 확인
  if (!$("#userhp").val()) {
    alert("휴대폰 번호를 입력해주세요.");
  } else {
    let answer = confirm("인증번호를 발송하시겠습니까?");
    console.log(answer);
    if (answer) {
      randomNum = Math.random().toString(10).substr(2, 4);
      alert("인증번호를 입력하세요. 인증번호 : " + randomNum);
    }
  }
});

// 인증번호 확인 버튼을 누르면
let flag = false;
$(".randomkeysamebtn").on("click", function () {
  console.log(randomNum);
  if(!$("#userhpaw").val()){
    alert("인증번호를 다시 입력해주세요.");}
    else{
      if ($("#userhpaw").val() == randomNum) {
        alert("인증에 성공하셨습니다.");
        flag = true;
      } else {
        alert("인증번호를 다시 입력해주세요.");
      }
    }
});

// 인증번호의 값이 일치하지 않다면
// if ($("#userhpaw").val() != randomNum) {
//   alert("인증번호를 다시 확인해주세요.");
//   retrun;
// }

//제출하기 버튼을 눌렀을 때
$("#join form").on("submit", function (e) {
  e.preventDefault();

  // input에 빈칸이 있는지 확인하는 방법
  // let flag = true;
  // $("#join form input").each(function () {
  //   if ($(this).val() == "") {
  //     alert("모든값을 입력하세요");
  //     return;
  //   }
  // });
  // if (flag) {
  //   alert("무신사에 오신것을 환영합니다.");
  //   console.log("두번체크");
  // } else {
  //   alert("모든값을 입력하세요");
  //   return;
  // }

  // 어떤 내용이 빠졌는지 친절하게 알려주는 방법
  let userid = $("#userid").val();
  if (!userid) {
    alert("아이디를 입력해주세요.");
    $("#userid").focus(); // 아이디칸에 커서를 옮겨줌
    return false;
  }
  if (doublecheck) {
    alert("아이디 중복확인을 해주세요.");
    $("#userid").focus();
    return false;
  }
  let userpw = $("#userpw").val();
  if (!userpw) {
    alert("비밀번호를 입력해주세요");
    $("#userpw").focus();
    return false;
  }
  let userpw2 = $("#userpw2").val();
  if (!userpw2) {
    alert("비밀번호 확인을 입력해주세요");
    $("#userpw").focus();
    return false;
  }
  if (!$("#join-name").val()) {
    alert("이름을 입력해주세요");
    $("#join-name").focus();
    return false;
  }
  if (!$("#userhp").val()) {
    alert("휴대폰 번호를 입력해주세요.");
    $("#userhp").focus();
    return false;
  }
  if (!flag) {
    alert("인증번호 확인 버튼을 입력해주세요");
    $("#userhpaw").focus();
    return false;
  }
  if (!$("#userbirth").val()) {
    alert("생년월일을 입력해주세요");
    $("#userbirth").focus();
    return false;
  }
  //남자와 여자 둘다 체크할수있게 수정
  if((!$("#join-man").prop("checked"))&&(!$("#join-woman").prop("checked"))) {
    console.log($("#join-woman").prop("checked"))
    alert("성별을 선택해주세요.");
    $("#join-man").focus();
    return false;
  }
 
  // 비밀번호가 같지 않아도 넘어가지 않는 방법
  if(!doublecheckpw){

  }else{
    alert("비밀번호가 같지 않습니다");
    return
  }
  
  let newuser = {
    userid: userid,
    userpw: userpw,
  };
  //아이디와 비밀번호를 동시에 체크
  if ((!doublecheck)&&(!doublecheckpw)) {
    // 만약 doublecheck에 값이 없다면(중복된 아이디가 없다면)
    userlist.push(newuser); // userlist 배열에 newuser 넣기
    localStorage.setItem("users", JSON.stringify(userlist));
    // 로컬스토리지의 user키에 userlist의 값을 넣기
    location.href = "../html/login.html";
  }
});
