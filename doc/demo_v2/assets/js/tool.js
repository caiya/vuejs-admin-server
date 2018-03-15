// 判断是否是对象类型
function isObj(object) {
	return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
}
// 判断事后是数组
function isArray(object) {
	return object && typeof (object) == 'object' && object.constructor == Array;
}
// 获取对象的长度
function getLength(object) {
	var count = 0;
	for (var i in object) count++;
	return count;
}

// ==========================
// 判断两个对象是否相等
// ==========================	
function Compare(objA, objB) {
	if (!isObj(objA) || !isObj(objB)) { //判断类型是否是对象
		if( objA==objB ){ //不是对象类型就判断字符串或者数字是否相等
				return true;
			} else{
				return false;
			}
	} else if(getLength(objA) != getLength(objB)) {
		return false; //判断长度是否一致
	} else {
		return CompareObj(objA, objB, true);//默认为true		
	}
}
function CompareObj(objA, objB, flag) {
	for (var key in objA) {
		if (!flag) //跳出整个循环
		break;
		if (!objB.hasOwnProperty(key)) {
			flag = false;
			break;
		}
		if (!isArray(objA[key])) { //子级不是数组时,比较属性值
			if (objB[key] != objA[key]) { flag = false; break; }
		} else {
			if (!isArray(objB[key])) { flag = false; break; }
			var oA = objA[key], oB = objB[key];
			if (oA.length != oB.length) { flag = false; break; }
			for (var k in oA) {
				if (!flag) //这里跳出循环是为了不让递归继续
				break;
				flag = CompareObj(oA[k], oB[k], flag);
			}
		}
	}
	return flag;
}

function valueOk(element) {
	if( element != '' && element.length >=6 && element.length <=12 ) {
		return true;
	} else {
		return false;
	}
}