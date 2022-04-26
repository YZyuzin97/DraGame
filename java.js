function imgSize(imgs) {
  var expandImg = document.getElementById("expandedImg");
  var imgText = document.getElementById("imgtext");
  expandImg.src = imgs.src;
  imgText.innerHTML = imgs.alt;
  expandImg.parentElement.style.display = "block";
}

function addRow(dataTable) {
  var table = document.getElementById(dataTable);
  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);
  var productNum = "product" + (rowCount + 1);
  var unitPrice = "unit" + (rowCount + 1);
  var btnName = "button" + (rowCount + 1);
  //Column 1
  var cell1 = row.insertCell(0);  
  var element1 = document.createElement("button");
  element1.className = "btn btn-danger";
  element1.name = btnName;
  element1.innerHTML = "Remove"
  element1.onclick = function() {  
      removeRow(btnName);  
  }  
  cell1.appendChild(element1);  
  //Column 2
  var cell2 = row.insertCell(1);
  var element2 = document.createElement("select");
  var arrayvalue = ["0","1299","1599","1899","3099","799","1050","1199","1499"]
  var arraylist = ["...","Play Station 4(500GB)","Play Station 4(1TB)","Play Station 4 Pro","Play Station 5","Nintendo Switch Lite","Nintendo Switch V1","Nintendo Switch V2","Nintendo Switch OLED"]
  element2.name = productNum;
  element2.id = "product";

  //Append the options from the arraylist to the "select" element
  for (var i = 0; i < arraylist.length; i++) {
    var option = document.createElement("option");
    option.value = arrayvalue[i];
    option.text = arraylist[i];
    element2.appendChild(option);
  }

  element2.onchange = function() {  
      checkPrice(unitPrice);  
  }

  cell2.appendChild(element2);
  //Column 3
  var cell3 = row.insertCell(2);
  var element3 = document.createElement("input");
  //cell3.innerHTML = "RM"
  element3.type = "number";
  element3.className = "fixed";
  element3.name = unitPrice;
  element3.id = "unit[]"
  element3.value = "0"
  element3.readOnly = 1
  cell3.appendChild(element3);
  //Column 4
  var cell4 = row.insertCell(3);
  var element4 = document.createElement("input");
  element4.type = "number";
  element4.name = "quantity[]";
  element4.id = "quantity[]"
  element4.value = "1"
  element4.min = "1"
  element4.readOnly
  element4.onchange = function() {  
      checkPrice(unitPrice);  
  }

  cell4.appendChild(element4);
  //Column 5
  var cell5 = row.insertCell(4);
  var element5 = document.createElement("input");
  element5.type = "number";
  element5.className = "fixed";
  element5.name = "amount[]";
  element5.id = "amount[]"
  element5.value = "0"
  element5.readOnly = 1
  cell5.appendChild(element5);
}

function removeRow(btnName) {
  try {
    var table = document.getElementById('dataTable');
    var rowCount = table.rows.length;
    for (var i = 0; i < rowCount; i++) {
      var row = table.rows[i];
      var rowObj = row.cells[0].childNodes[0];
      var selectObj = row.cells[1].childNodes[0];
      var priObj = row.cells[2].childNodes[0];
      var quaObj = row.cells[3].childNodes[0];
      if (rowObj.name == btnName) {
        table.deleteRow(i);
        rowCount--;
        if (rowCount < 1) {
          document.getElementById("subtotal").value= "";
          document.getElementById("sst").value = "";
          document.getElementById("total").value = "";
        }
        else {
          var table = document.getElementById('dataTable');
          var subtotal = 0;
          var sst = 0;
          var total = 0;
          var rowCount = table.rows.length;
          for (var i = 0; i < rowCount; i++) {
            var amoObj = document.getElementsByName("amount[]")[i].value
            console.log(amoObj)
            subtotal = parseInt(subtotal) + parseInt(amoObj)
            console.log(subtotal)
          }
          document.getElementById("subtotal").value=subtotal;
          sst = subtotal*0.06;
          console.log(sst)
          total = subtotal+sst;
          console.log(total)
          total = total.toFixed(2);
          sst = sst.toFixed(2);
          console.log(document.getElementById("total").value)
          document.getElementById("sst").value = sst;
          document.getElementById("total").value = total;
        }
      }
    }
  } catch (e) {
    alert(e);
  }
}

function removeAllRow() {
  document.getElementById("dataTable").innerHTML=""
  document.getElementById("subtotal").value= "";
  document.getElementById("sst").value = "";
  document.getElementById("total").value = "";
}

function checkPrice(unitPrice) {
  try {
    var table = document.getElementById('dataTable');
    var amount = document.getElementsByName("amount[]");
    var subtotal = 0;
    var sst = 0;
    var total = 0;
    var rowCount = table.rows.length;
    for (var i = 0; i < rowCount; i++) {
      var row = table.rows[i];
      var selectObj = row.cells[1].childNodes[0];
      var rowObj = row.cells[2].childNodes[0];
      var quaObj = row.cells[3].childNodes[0];
      if (rowObj.name == unitPrice) {
        rowObj.value = selectObj.value
      }
      var u = rowObj.value;
      var q = quaObj.value;
      var a = u*q
      subtotal = subtotal + a
      document.getElementsByName("amount[]")[i].value = a;
    }
    document.getElementById("subtotal").value=subtotal;
    sst = subtotal*0.06;
    total = subtotal+sst;
    total = total.toFixed(2);
    sst = sst.toFixed(2);
    document.getElementById("sst").value = sst;
    document.getElementById("total").value = total;
  } catch (e) {
    alert(e);
  }
}
function checkPriceForonChangetest() {
  var table = document.getElementById('dataTable');
  var subtotal = 0;
  var sst = 0;
  var total = 0;
  var rowCount = table.rows.length;
  for (var i = 0; i < rowCount; i++) {
    var amoObj = document.getElementsByName("amount[]")[i].value
    console.log(amoObj)
    subtotal = parseInt(subtotal) + parseInt(amoObj)
    console.log(subtotal)
  }
  document.getElementById("subtotal").value=subtotal;
  sst = subtotal*0.06;
  console.log(sst)
  total = subtotal+sst;
  console.log(total)
  total = total.toFixed(2);
  sst = sst.toFixed(2);
  console.log(document.getElementById("total").value)
  document.getElementById("sst").value = sst;
  document.getElementById("total").value = total;
}