
// 메인 배너
let count = 0;
$(".slide-btn .prev-btn").on("click", function () {
  if (count > 0) {
    $("#section .box .depth1").animate({
      left: "+=100%",
    });
    count--;
  }
});

$(".slide-btn .next-btn").on("click", function () {
  if (count < 5) {
    $("#section .box .depth1").animate({
      left: "-=100%",
    });
    count++;
  }
});
