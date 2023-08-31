let users = JSON.parse(localStorage.getItem("users"));
console.log("두번연결");
$(".loginForm").on("submit", function (e) {
  console.log(e.target);
  e.preventDefault();
  let myid = $("#msid").val(); // myid 아이디 입력한 값
  let mypw = $("#mspw").val(); // mypw 비밀번호 입력한 값
  let finduser = users.filter(
    // users아이디의 값과 입력한 아이디의 값이 일치하고, 비밀번호도 일치하는 값을 finduser 변수에 대입
    (value) => value.userid == myid && value.userpw == mypw
  );

  if (finduser.length) {
    //일치한 값이 있다면
    localStorage.setItem("userid", myid); // 로컬스토리지 userid에 myid를 대입
    localStorage.setItem("userpw", mypw); // 로컬스토리지 userpw에 mypw를 대입
    location.href = "../html/index.html";
  } else {
    // 일치한 값이 없다면
    alert("아이디와 비밀번호를 확인해주세요");
    console.log("틀립니다.");
  }
});
