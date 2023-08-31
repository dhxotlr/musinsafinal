let cartList = JSON.parse(localStorage.getItem("allItem"));
console.log(cartList);
function listing() {
  if (cartList.length) {
    // 만약 장바구니에 길이가 있다면
    $(".cartBox .table2").addClass("on");
    $(".cartInfo p").text("");
    // p의 텍스트를 공백으로 바꿈
    let total = 0;
    let trList = `<table border="0">
            <colgroup>
              <col>
              <col>
              <col>
              <col>
              <col>
              <col>
            </colgroup>
            <thead>
            <tr>
              <th>상품</th>
              <th>상품정보</th>
              <th>수량</th>
              <th>금액</th>
              <th>배송비</th>
              <th>취소</th>
            </tr>
            </thead>
            <tbody>`;
    cartList.forEach((value) => {
      trList += `<tr>`;
      trList += `<td>`;
      trList += `<img src="../img/json/${value.photo}"alt="${value.name}"></td>`;
      trList += `<td class="pricename">${
        value.name
      }<br><br><span class="price won">${value.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></td>`;
      trList += `<td class="qtybox">
            <div class ="btnflex">
              <div>
              <input type="text" value="${value.quantity}" autocomplete="off" class="qty__input">
              </div>
              <div class="btnzip">
              <button type="button" class="qty__plus"><i class="fa-solid fa-square-caret-up"></i></button>
              <button type="button" class="qty__minus"><i class="fa-solid fa-square-caret-down"></i></button>
              </div>
            </div>
            </td>`;
      trList += `<td class="myTotal won">${(value.quantity * value.price)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>`;
      trList += `<td>무료배송</td>`;
      trList += `<td>
            <button type="button" class="remove"><i class="fa-regular fa-trash-can"></i></button>
            </td>`;
      trList += `</tr>`;
      total += value.quantity * value.price;
    });
    trList += `</tbody>
            <tfoot>
            <tr>
            <td colspan="5">합계 :<span class="won">${total
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            </td>
            </tr>
            </tfoot>
            </table>`;
    trList += `<div class="order">
            
            </div>`;
    $(".cartBox table").remove();
    $(".cartBox .order").remove();
    $(".table1").append(trList);
    $(".money").text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  } else {
    $(".cartBox table").remove();
    $(".cartBox .order").remove();
    $(".table2").remove();
    $(".cartInfo p").text("쇼핑백에 담긴 상품이 없습니다.");
    $(".cartBox .table2").removeClass("on");
  }
}
listing();

// 장바구니에서 수량을 변경시키면 변경된 수량이 로컬스토리지 cartList의 quantity 값으로 바뀌는 함수!
function modify(trnum, quantity) {
  cartList.forEach((value, index) => {
    if (trnum == index) {
      value.quantity = quantity;
    }
  });
  localStorage.setItem("allItem", JSON.stringify(cartList));
}

let rep = /[^0-9]/g; //0~9까지 숫자를 제외한 모든 것(문자, 공백 등)을 rep라는 변수에 넣어라

// 플러스 버튼을 눌렀을 때
$("body").on("click", ".qty__plus", function () {
  let quantity = parseInt($(this).parent().prev().find(".qty__input").val());
  let myprice = $(this).parent().parent().parent().prev().find(".price").text();

  // myprice는 80,000원이 추출이 되므로 rep 변수에 들어간것(문자, 공백 등)들을 지우기
  // 지우기 전에 parseInt를 하면 80,000원 중에 ',' 앞의 숫자'80'만 추출이 됨
  myprice = myprice.replace(rep, "");

  let list_total = 0;
  console.log("들어온다");
  if (quantity) {
    quantity = parseInt(quantity);
    $(this).parent().prev().find(".qty__input").val(++quantity);
    list_total = quantity * parseInt(myprice);
  } else {
    quantity = 1;
    $(this).parent().prev().find(".qty__input").val(quantity);
    list_total = quantity * parseInt(myprice);
  }
  $(this)
    .parent()
    .parent()
    .parent()
    .next()
    .text(list_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

  mytotal();
  let trnum = $(this).parents("tr").index();
  modify(trnum, quantity);
});

// -버튼을 눌렀을 때
$("body").on("click", ".qty__minus", function () {
  let quantity = parseInt($(this).parent().prev().find(".qty__input").val());
  let myprice = $(this).parent().parent().parent().prev().find(".price").text();
  myprice = myprice.replace(rep, "");
  let list_total = 0;
  console.log("빠진다");
  if (quantity > 1) {
    $(this).parent().prev().find(".qty__input").val(--quantity);
    list_total = quantity * parseInt(myprice);
  } else {
    quantity = 1;
    $(this).parent().prev().find(".qty__input").val(quantity);
    list_total = quantity * parseInt(myprice);
  }
  $(this)
    .parent()
    .parent()
    .parent()
    .next()
    .text(list_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

  mytotal();

  let trnum = $(this).parents("tr").index();
  modify(trnum, quantity);
});

// 수량을 직접 입력할때
$("body").on("keyup", ".qty__input", function () {
  let quantity = $(this).val();
  quantity = parseInt(quantity);
  let total = 0;
  let myprice = $(this).parent().parent().parent().prev().find(".price").text();
  if (quantity >= 0) {
    $(this).val(quantity);
    myprice = myprice.replace(rep, "");
    total = quantity * parseInt(myprice);
    $(this)
      .parent()
      .parent()
      .parent()
      .next()
      .text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    mytotal();
    let trnum = $(this).parents("tr").index();
    modify(trnum, quantity);
  } else {
    quantity = "";
    $(this).val(quantity);
    total = quantity * parseInt(myprice);
  }
});

// 결제 총액 구하기
function mytotal() {
  let total = 0;
  $("tbody .myTotal").each(function () {
    let price = $(this).text();
    price = price.replace(rep, ""); // 숫자를 제외한 모든것을 지워라
    total += parseInt(price);
  });
  $("tfoot span").text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  $(".money").text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}

// 삭제버튼을 눌렀을때
$("body").on("click", "tbody .remove", function () {
  // let trnum =$(this).parent().parent().index()
  let trnum = $(this).parents("tr").index();
  cartList.splice(trnum, 1);
  localStorage.setItem("allItem", JSON.stringify(cartList));
  listing();
  console.log(cartList);
});

// 주문하기 버튼을 눌렀을때 로그인 여부 확인
$(".contain .table2 ul li button").on("click", function () {
  let myid = localStorage.getItem("userid");
  if (!myid) {
    alert("로그인 후 구매하실 수 있습니다.");
    location.href = "../html/login.html";
  } else {
    location.href = "../html/buy.html";
  }
});
