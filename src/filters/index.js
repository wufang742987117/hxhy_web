let currency = (value, places, symbol, thousand, decimal) => {
  value = value || 0;
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : "$";
  thousand = thousand || ",";
  decimal = decimal || ".";
  var negative = value < 0 ? "-" : "",
    i = parseInt(value = Math.abs(+value || 0).toFixed(places), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(value - i).toFixed(places).slice(2) : "");
}

let date = (value, formatter) => {
  var o = {
    "M+": new Date(value).getMonth() + 1,                 //月份
    "d+": new Date(value).getDate(),                    //日
    "H+": new Date(value).getHours(),                   //小时
    "m+": new Date(value).getMinutes(),                 //分
    "s+": new Date(value).getSeconds(),                 //秒
    "q+": Math.floor((new Date(value).getMonth() + 3) / 3), //季度
    "S": new Date(value).getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(formatter)) {
    formatter = formatter.replace(RegExp.$1, (new Date(value).getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(formatter)) {
      formatter = formatter.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return formatter;
}

export { currency, date }
