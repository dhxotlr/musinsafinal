let orderList = JSON.parse(localStorage.getItem("allItem"));
console.log(orderList);

let orList = `  <table class="order_prd row">
                <colgroup>
                 <col />
                 <col />
                 <col />
                 <col />
                 <col />
                </colgroup>
                <caption>
                 주문상품
                </caption>
                <thead>
                <tr>
                  <th colspan="2">상품정보</th>
                  <th>단가</th>
                  <th>수량</th>
                  <th>가격</th>
                  <th>배송비</th>
                </tr>
                </thead>`;
orderList.forEach((value) => {
  orList += `<tbody>`;
  orList += ` <tr>
                <td class="image">`;
  orList += `<img src="../img/json/${value.photo}" alt="${value.name}" />`;
  orList += `</td>`;
  orList += `<td class="name">${value.name}</td>`;
  orList += `<td class="oneprice won">${value.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>`;
  orList += `<td class="num">${value.quantity}</td>`;
  orList += `<td class="price won">${(value.quantity * value.price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>`;
  orList += `<td>무료배송</td>
            </tr>`;
});
orList += `</tbody></table>`;

$("#buyBox .order_list").append(orList);
$(window).unload(function () {
  localStorage.removeItem("allItem");
});
