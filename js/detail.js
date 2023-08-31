let temp = location.href.split("?");
console.log(temp);
let detail = decodeURI(temp[1]).split("&");
console.log(detail);

const [
  brand,
  pname,
  price,
  optionSize,
  optionColor,
  mcategory,
  bcatecogy,
  image,
  grade,
] = detail;
console.log(optionSize);
let pprice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// 사이즈 분리
let option_size = optionSize.toUpperCase().split(",");
let size = "";
option_size.forEach((value, index) => {
  size += `<input type="radio" id="size${index}" name="size" value="${value}" />`;
  size += `<label for="size${index}">${value}</label>`;
});

// 색상 분리
let option_color = optionColor.split(",");
let color = "";
color += `<select name="color" id="color">`;
color += `<option value="">선택</option>`;
option_color.forEach((value, index) => {
  color += `<option value="${value}">${value}</option>`;
});
color += `</select>`;

// 별찍기
let star = "";
for (let i = 1; i <= grade; i++) {
  star += `<i class="fa-solid fa-star"></i>`;
}
console.log(image);
let pt = image.split(".");
console.log(pt);
let ptlink = pt[0];
console.log(ptlink);
let dpt = "";
for (let i = 1; i < 20; i++) {
  dpt += `<img src="../img/json/${ptlink}_detail/${ptlink}_detail${i}.jpg" alt="" />`;
}
console.log(dpt);
// console.log(star);

// html에 넣을 내용
let detail_info = `<div class="detail_info">`;
detail_info += `<form action="#" method="post" class="prdInfo">`;
detail_info += `<div class="prd_photo">`;
detail_info += `<img src="../img/json/${image}" alt="${pname}" /></div>`;
detail_info += `<div class="prd_info">`;
detail_info += `<div class="prd_info_item">`;
detail_info += `<p class="brand">${brand}</p>`;
detail_info += `<p class="name">${pname}</p>`;
detail_info += `<p class="grade">`;
detail_info += `${star}`;
detail_info += `<a href="javascript:;">886개 리뷰보기</a></p></div>`;
detail_info += ` <div class="prd_info_price">`;
detail_info += `<p class="price won">${pprice}</p>`;
detail_info += `<p class="point">${(detail[2] / 100)
  .toString()
  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}p (1%) 적립</p></div>`;
detail_info += `<table class="delivery">`;
detail_info += `<colgroup><col /><col /></colgroup>`;
detail_info += `<th>배송정보</th>`;
detail_info += `<tr>
                    <td>배송비</td>
                    <td>해당 브랜드 제품은 무료배송 됩니다.<br />제주도를 포함한 도서/산간 지역은 추가배송비 3,000원</td>
                </tr>`;
detail_info += `<tr>
                <td>배송예정</td>
                <td><span>2일 이내</span>출고(주말, 공휴일제외)</td>
                </tr>
                </table>`;
detail_info += `<table class="option">
                <colgroup>
                    <col />
                    <col />
                </colgroup>`;

if (optionSize === "undefined") {
  detail_info += `<tr>
                    <th>타입</th>
                    <td>
                       ${color}
                    </td>
                </tr>`;
  detail_info += `</table>`;
  detail_info += `<div class="selection">
                <p class="sel_info">${pname}<br /><span class="color">타입선택</span></p>`;
} else {
  detail_info += `<tr>
                    <th>색상</th>
                    <td>
                       ${color}
                    </td>
                </tr>`;
  detail_info += `<tr>
                  <th>사이즈</th>
                  <td>
                  ${size}
                  </td>
                  </tr>
                  </table>`;
  detail_info += `<div class="selection">
                  <p class="sel_info">${pname}<br /><span class="color">컬러선택</span> / <span class="size">사이즈선택</span></p>`;
}

detail_info += `<div class="sel_price"><div class="qty__form">
                    <button type="button" class="qty__minus"><i class="fa-solid fa-square-minus"></i></button>
                    <input type="text" value="0" autocomplete="off" class="qty__input"/>
                    <button type="button" class="qty__plus"><i class="fa-solid fa-square-plus"></i></i></button>
                </div>
                <p class="qty_price won">
                0
                
                </p><a href="javascript:;"><i class="fa-solid fa-xmark"></i></a>
                </div></div>`;
detail_info += `<div class="total_price">총 상품 금액 <span class="won span">0</span></div>`;
detail_info += `<div class="btn">
                    <p class="cart">
                    <button type="submit" class="btn_cart">
                        <i class="fa-solid fa-heart"></i> 장바구니 담기</button>
                    </p>
                    <p class="buy">
                    <button type="submit" class="btn_buy">
                        <i class="fa-solid fa-cart-shopping"></i>
                        바로 구매하기</button>
                    </p>
                     </div>`;
detail_info += ` </div>`;
detail_info += ` </form></div>`;
detail_info += ` <div class="tab">
                    <a href="javascript:;" class="on">DETAIL</a>
                    <a href="javascript:;">REVIEW</a>
                    <a href="javascript:;">Q&A</a>
                    <a href="javascript:;">RETURN&DELIVERY</a>
                </div>`;
detail_info += `<div class="detail_photo">${dpt}</div>`;
$("#Detail").append(detail_info);
console.log(detail_info);

// 엑스 누르면 지우기
$("body").on(
  "click",
  "#Detail .detail_info .prd_info .selection .sel_price a",
  function () {
    $(this).parents().remove();
  }
);

// + 누르면
$("body").on("click", ".qty__plus", function () {
  quantity = $(this).prev().val();
  let myprice = price;
  if (quantity) {
    quantity = parseInt(quantity);
    $(this).prev().val(++quantity);
    total = quantity * myprice;
  } else {
    quantity = 1;
    $(this).next().val(quantity);
    total = quantity * myprice;
  }
  $(this)
    .parent()
    .next()
    .text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  $(this)
    .parents()
    .find(".span")
    .text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
});

// - 누르면
$("body").on("click", ".qty__minus", function () {
  quantity = parseInt($(this).next().val());
  let myprice = price;
  if (quantity > 1) {
    $(this).next().val(--quantity);
    total = quantity * myprice;
  } else {
    quantity = 1;
    $(this).next().val(quantity);
  }
  $(this)
    .parent()
    .next()
    .text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  $(this)
    .parents()
    .find(".span")
    .text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
});

// input 상자에 숫자를 직접 입력했을 때
$("body").on("keyup", ".qty__input", function () {
  let quantity = $(this).val();
  let myprice = price;
  if (quantity) {
    $(this).val(quantity);
    total = quantity * myprice;
  } else {
    quantity = "";
    $(this).val(quantity);
    total = quantity * parseInt(myprice);
  }
  $(this)
    .parent()
    .next()
    .text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  $(this)
    .parents()
    .find(".span")
    .text(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
});

// 선택한 color 값
$('select[name="color"]').on("change", function () {
  let colorValue = $(this).val();
  $(".selection .color").text(colorValue);
});

// 선택한 size 값
$('input[name="size"]').on("change", function () {
  let sizeValue = $(this).val();
  $(".selection .size").text(sizeValue);
});

// 장바구니/구매 버튼을 눌렀을 때
$("body").on("submit", ".prdInfo", function (e) {
  e.preventDefault();
  let btn_class = $(document.activeElement).attr("class"); // 제출을 한 클래스 추출
  let sub_Colorvalue = $('select[name="color"]').val(); // 컬러 선택값을 대입
  // 컬러선택값이 없다면
  if (optionSize !== "undefined" && !sub_Colorvalue) {
    // 옵션사이즈가 undefined가 아니고 선택값이 없다면
    alert("색상을 선택하세요.");
    return false;
  } else if (optionSize === "undefined" && !sub_Colorvalue) {
    // 옵션사이즈가 "undefined"이고 선택값이 없다면
    alert("타입을 선택하세요.");
    return false;
  }

  // 사이즈 선택이 안되어있다면
  let sub_Sizevalue = "";
  if (optionSize !== "undefined") {
    // 옵션사이즈가 undefined가 아니라면(사이즈가 있는 상태)
    $('input[name="size"]').each(function () {
      // size박스의 값을 순차적으로 확인
      if ($(this).prop("checked")) {
        // 만약 size박스에 체크가 되어있다면
        sub_Sizevalue = $(this).val(); // sub_Sizevalue에 체크된 값을 대입하고
      }
    });
    if (!sub_Sizevalue) {
      //sub_Sizevalue에 값이 없다면
      alert("사이즈를 선택해 주세요");
      return false;
    }
  }

  // 인풋박스에 값이 0 혹은 빈칸이라면
  let input_qty = parseInt($(".qty__input").val());
  if (!input_qty) {
    alert("수량을 입력해 주세요");
    return false;
  }

  // new item 배열에 대입
  let newitem = {
    name: pname,
    price: price,
    photo: image,
    size: sub_Sizevalue,
    color: sub_Colorvalue,
    quantity: input_qty,
    // total : total 필요없음
  };

  let itemList = JSON.parse(localStorage.getItem("allItem"));
  if (itemList == null) {
    itemList = [];
  }
  itemList.push(newitem);
  localStorage.setItem("allItem", JSON.stringify(itemList));
  
  // 로그인 하지 않고 구매하기 가는것을 방지함
  let myid = localStorage.getItem("userid");
 
  // 누른버튼에 따라 페이지 이동
  if (btn_class == "btn_cart") {
    location.href = "./cart.html";
  } else {
    if (!myid) {
      alert("로그인 후 구매하실 수 있습니다.");
      location.href = "../html/login.html";
    } else {
      location.href = "../html/buy.html";
    }
  }
});
