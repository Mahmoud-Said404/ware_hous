let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let catagory = document.getElementById("catagory");
let sumit = document.getElementById("sumit");
let total = document.getElementById("total");

function getTotal() {
  if (price.value != "") {
    let reslut = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = reslut;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

let newPro;

if (localStorage.product != null) {
  newPro = JSON.parse(localStorage.product);
} else {
  newPro = [];
}

sumit.onclick = function () {
  let pro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    catagory: catagory.value,
    total: total.innerHTML,
  };

  if(pro.count > 1) {
    for (let i = 0; i < pro.count; i++) {
        newPro.push(pro);

    }
    }else {
      newPro.push(pro);
    }

  localStorage.setItem("product", JSON.stringify(newPro));

  clearInput();
  showData();
};

function clearInput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  catagory.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < newPro.length; i++) {
    table += `
    <tr>
    <td>${i}</td>
    <td>${newPro[i].title}</td>
    <td>${newPro[i].price}</td>
    <td>${newPro[i].taxes}</td>
    <td>${newPro[i].ads}</td>
    <td>${newPro[i].discount}</td>
    <td>${newPro[i].total}</td>
    <td>${newPro[i].catagory}</td>
    <td><button id="updata">Update</button></td>
    <td><button onclick ='deleteData(${i})' id="delete">Delete</button></td>
  </tr>
    `;
  }
    document.getElementById("tbody").innerHTML = table;

    let btndelete = document.getElementById("deletAll");
    if (newPro.length > 0) {
      btndelete.innerHTML = `
      <button onclick='deleteAll()'>Delete All (${newPro.length})</button>
      `;
    } else {
      btndelete.innerHTML = "";
    }
  }

showData();

function deleteData(i) {
  newPro.splice(i, 1);
  localStorage.product = JSON.stringify(newPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  newPro.splice(0);
  showData();
}
