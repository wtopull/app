/**
 * 解析url参数
 * @example id=123
 * @return Object {id:12345,a:b}
 */
export function urlParse() {
	let url = window.location.search;
	let reg = /[a-z]+=[0-9]+/g; 
	let arr = url.match(reg);
	if (arr) {
		arr.forEach((item) => {
			let tempArr = item.substring(1).split('=');
			let key = decodeURIComponent(tempArr[0]);
			let val = decodeURIComponent(tempArr[1]);
			obj[key] = val;
			console.log(key+":"+val);
		});
	}
	let keyId = decodeURIComponent(789);
	return keyId;
};
