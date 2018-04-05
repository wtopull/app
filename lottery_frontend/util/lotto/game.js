
export default {
	rt:null,
	//位置
	// position:["万","千","百","十","个"],
	// //任选定位号码
	// positions:[],
	//判断是否有重复号码
	// is_repeat:function(codes,num){
	// 	return codes.length!==$.unique(codes.match(eval('/.{'+num+'}/g')).sort()).join("").length;
	// },
	// //判断二个数组是否存在相同的值
	// is_array_repeat:function(arr1,arr2){
	// 	var flag=false;
	// 	$(arr1).each(function(k,v){
	// 		if ($.inArray(v,arr2)>=0){
	// 			flag=true;
	// 			return false;
	// 		}
	// 	})
	// 	return flag;
	// },
	//排列组合算法
	// permutations:function(arr,n){
	// 	var _this=this;
	// 	_this.rt=[];
	// 	for(var i=0;i<arr.length;i++){
	// 		_this.getNext(arr,[i],n-1,i+1);
	// 	}
	// 	for(var i=0,row;row = _this.rt[i];i++){
	// 		var cell = [];
	// 		for(var j in row){
	// 			cell = cell.concat([arr[row[j]]]);
	// 		}
	// 		_this.rt[i] = cell;
	// 	}
	// 	return _this.rt;
	// },
	//单式任选分解
	// permutations_single:function(position,codes,len){
	// 	var _this=this,data=[],optionally=game.permutations(position,len);
	// 	$(codes).each(function(i,code){
	// 		var arr=code.split('');
	// 		$(optionally).each(function(x,y){
	// 			var tempdata=[],n=0;
	// 			for(var j=0;j<_this.position.length;j++){
	// 				if ($.inArray(_this.position[j],y)>=0){
	// 					tempdata.push(Number(arr[n]));
	// 					n++;
	// 				}else{
	// 					tempdata.push('');
	// 				}
	// 			}
	// 			data.push(tempdata);
	// 		})
	// 	})
	// 	return data;
	// },
	getNext:function(arr,a,n,index){
		var _this=this;
		if(n<=0){
			return _this.rt.push(a);
		}
		for(var i=index;i<arr.length;i++){
			_this.getNext(arr,a.concat(i),n-1,i+1);
		}
		return _this.rt;
	},
	optionally:function(arr,n){
		var _this=this;
		if (arr.length<n){return false;}
		var num=0;
		var data=_this.permutations(arr,n);
		$.each(data,function(k,v){
			var len=1;
			$.each(v,function(x,y){len*=y.length;})
			num+=len;
		})
		return num;
	},
	get_codes:function(codes){
    if(codes === undefined) return
		var arr=[];
		for (var x=0;x<10;x++){
			//codes[x]!==undefined?arr.push(codes[x]+""):arr.push("");
			//$.inArray(x+"",codes)>=0?arr.push(x+""):arr.push("");
			// arr.push($.inArray(x+"",codes)>=0?x+'':'');
			arr.push(codes.indexOf(x)>=0?x+'':'');
		}
		return arr;
	},


	//for (x=0;x<10;x++){codes[x]!==undefined?arr.push(codes[x]+""):arr.push("");}
	// get_zx60:function(codes){
  //   var _this=this;
  //   if(codes[0] === undefined || codes[1] === undefined) return 0
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var recount = 0; //重复数
	// 	if (codes_0 && codes_0.length > 0 && codes_1 && codes_1.length > 0) {
	// 		for (var i = 0; i < codes_0.length; i++) {
	// 			for (var j = 0; j < codes_1.length; j++){
	// 				if (codes_1[j] && codes_1[j] == codes_0[i]) {
	// 					recount++;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	var itemcount = 0;
	// 	if( len_1>=3 && len_0>=1) {
	// 		for(len_0; len_0>0; len_0--) {
	// 			if(recount>0) {
	// 				var diffcount = len_1-4;
	// 				var topcount = len_1-1;
	// 				var subcount =  len_1-4;
	// 				if(diffcount > 0) {
	// 					var temp = len_1-1;
	// 					while( diffcount>1 ) {
	// 						diffcount--;
	// 						temp--;
	// 						topcount =  topcount * temp;
	// 						subcount = subcount * diffcount;
	// 					}
	// 					itemcount += (topcount/subcount);
	// 				}else if(diffcount < 0) {
	// 				}else {
	// 					itemcount += 1;
	// 				}
	// 				recount--;
	// 			}else {
	// 				var diffcount = len_1-3;
	// 				var topcount = len_1;
	// 				var subcount =  len_1-3;
	// 				if(diffcount > 0) {
	// 					var temp = len_1;
	// 					while( diffcount>1 ) {
	// 						diffcount--;
	// 						temp--;
	// 						topcount =  topcount * temp;
	// 						subcount = subcount * diffcount;
	// 					}
	// 					itemcount += (topcount/subcount);
	// 				}else {
	// 					itemcount += 1;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return itemcount;
	// },
	// get_zx30:function(codes){
	// 	var _this=this;
	// 	if(codes[0] === undefined || codes[1] === undefined) return 0
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount = 0;
	// 	if(len_0 > 1 && len_1 > 0 ) {
	// 		for(var i = 0; i < codes_1.length; i++) {
	// 			if(codes_1[i] != undefined && codes_1[i] != "") {
	// 				if(codes_0[i] != undefined && codes_0[i] != "") {
	// 					if(len_0 > 2) {
	// 						itemcount += (len_0-1)*(len_0-2)/2;
	// 					}
	// 				} else {
	// 					itemcount += len_0*(len_0-1)/2;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return itemcount;
	// },
	// get_zx20:function(codes){
	// 	var _this=this;
	// 	if(codes[0] === undefined || codes[1] === undefined) return 0
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);

	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount = 0;
	// 	if(len_0 > 0 && len_1 > 1) {
	// 		for(var i = 0; i < codes_0.length; i++) {
	// 			if(codes_0[i] != undefined && codes_0[i] != "") {
	// 				if(codes_1[i] != undefined && codes_1[i] != "") {
	// 					if(len_1 > 2) {
	// 						itemcount += (len_1-1)*(len_1-2)/2;
	// 					}
	// 				} else {
	// 					itemcount += len_1*(len_1-1)/2;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return itemcount;
	// },
	// get_zx10:function(codes){
	// 	var _this=this;
	// 	if(codes[0] === undefined || codes[1] === undefined) return 0
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount = 0;
	// 	if(len_0 > 0 && len_1 > 0) {
	// 		for(var i = 0; i < codes_0.length; i++) 
	// 		{
	// 			if(codes_0[i] != undefined && codes_0[i] != "") 
	// 			{
	// 				if(codes_1[i] != undefined && codes_1[i] != "") 
	// 				{
	// 					if(len_1 > 1) 
	// 					{
	// 						itemcount += len_1-1;
	// 					}
	// 				} 
	// 				else 
	// 				{
	// 					itemcount += len_1;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return itemcount;
	// },
	// get_zx5:function(codes){
	// 	return this.get_zx10(codes);
	// },
	// get_zx12:function(codes){
	// 	var _this=this;
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount = 0;
	// 	if(len_0 > 0 && len_1 > 1) {
	// 		for(var i = 0; i < codes_0.length; i++) 
	// 		{
	// 			if(codes_0[i] != undefined && codes_0[i] != "") 
	// 			{
	// 				if(codes_1[i] != undefined && codes_1[i] != "") 
	// 				{
	// 					if(len_1 > 2) 
	// 					{
	// 						itemcount += (len_1-1)*(len_1-2)/2;
	// 					}
	// 				}
	// 				 else 
	// 				{
	// 					itemcount += len_1*(len_1-1)/2;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return itemcount;
	// },
	// get_zx4:function(codes){
	// 	var _this=this;
	// 	if(codes[0] === undefined || codes[1] === undefined) return 0
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount = 0;
	// 	if(len_0 > 0 && len_1 > 0) 
	// 	{
	// 		for(var i = 0; i < codes_0.length; i++) 
	// 		{
	// 			if(codes_0[i] != undefined && codes_0[i] != "") 
	// 			{
	// 				if(codes_1[i] != undefined && codes_1[i] != "") 
	// 				{
	// 					if(len_1 > 1) 
	// 					{
	// 						itemcount += len_1-1;
	// 					}
	// 				} 
	// 				else 
	// 				{
	// 					itemcount += len_1;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return itemcount;
	// },
	get_zldt:function(codes){
		var _this=this;
		var codes_0 = _this.get_codes(codes[0]);
		var codes_1 = _this.get_codes(codes[1]);
		var len_0 = codes[0].length;
		var len_1 = codes[1].length;
		var f_flag = false;
		for (var i = 0; i < codes_0.length; i++) 
		{
			if (codes_0[i] != undefined && codes_0[i] != "") 
			{
				for (var g = 0; g < codes_1.length; g++) 
				{
					if (codes_1[g] != undefined && codes_1[g] != "") 
					{
						if (parseInt(codes_0[i]) == parseInt(codes_1[g])) 
						{
							f_flag = true;
							break;
						}
					}
				}
			}
			if (f_flag) {
				break;
			}
		}
		var itemcount = 0;
		if (f_flag == false) {
			if (len_0 <= 2 && len_0 > 0) {
				if (len_0 == 1) {
					if (len_1 >= 2) {
						itemcount = len_1 * (len_1 - 1) / 2;
					}
				} else if (len_0 == 2) {
					if (len_1 >= 1) {
						itemcount = len_1;
					}
				}
			}
		}
		return itemcount;
	},
	// get_11x5sxzxdt:function(codes){
	// 	var _this=this;
	// 	if(codes[0] === undefined || codes[1] === undefined) return 0
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount=0;
	// 	var b=true;
	// 	for (var i = 0; i < codes_1.length; i++) {
	// 		if(codes_1[i]!=""){
	// 			for(var j=0;j<codes_0.length;j++)
	// 			 if(codes_1[i]==codes_0[j]&&codes_0[j]!=null){
	// 				 b=false;
	// 				 break;
	// 			 }
	// 		}
	// 	}
	// 	if(b){
	// 		if(len_0==1&&len_1>1){
	// 			itemcount=len_1*(len_1-1)/2;
	// 		}
	// 		if(len_0==2&&len_1>=1){
	// 			itemcount=len_1;
	// 		}
	// 	}
	// 	return itemcount;
	// },
	// get_11x5exzxdt:function(codes){
	// 	var _this=this;
	// 	if(codes[0] === undefined || codes[1] === undefined) return 0
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount=0;
	// 	var b=true;
	// 	for (var i = 0; i < codes_1.length; i++) {
	// 		if(codes_1[i]!=""){
	// 			for(var j=0;j<codes_0.length;j++)
	// 			 if(codes_1[i]==codes_0[j]&&codes_0[j]!=null){
	// 				 b=false;
	// 				 break;
	// 			 }
	// 		}
	// 	}
	// 	if(b&&len_0==1&&len_1>=1){
	// 		itemcount=len_1;
	// 	}
	// 	return itemcount;
	// },
	// op_flag:function(codes_0,codes_1){
	// 	var op_flag=false;
	// 	for(var oo=0;oo<codes_0.length;oo++)
	// 	{
	// 		var a=codes_0[oo];
	// 		if(a!=undefined&&a!="")
	// 		{
	// 			for(var mm=0;mm<codes_1.length;mm++)
	// 			{
	// 				var b=codes_1[mm];
	// 				if(b!=undefined&&b!="")
	// 				{
	// 					if(eval(a)==eval(b))
	// 					{
	// 						op_flag=true;
	// 						break;
	// 					}
	// 				}
	// 			}
	// 		}
	// 		if(op_flag==true){
	// 			break;
	// 		}
	// 	}
	// 	return op_flag;
	// },
	// get_11x5dtrx2z2:function(codes){
	// 	var _this=this;
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount=0;
	// 	if(len_0==1&&len_1>=1){
	// 		if(_this.op_flag(codes_0,codes_1)==false&&len_0==1&&len_1>=1)
	// 		{
	// 			itemcount=len_1;
	// 		}
	// 	}
	// 	return itemcount;
	// },
	// get_11x5dtrx3z3:function(codes){
	// 	var _this=this;
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount=0;
	// 	if(len_0<=2&&len_0>0){
	// 		if(_this.op_flag(codes_0,codes_1)==false){
	// 			if(len_0==1){
	// 				if(len_1>=2){
	// 					itemcount=len_1*(len_1-1)/2;
	// 				}
	// 			} else if(len_0==2){
	// 				if(len_1>=1){
	// 					itemcount=len_1;
	// 				}
	// 			}
	// 		 }
	// 	}
	// 	return itemcount;
	// },
	// get_11x5dtrx4z4:function(codes){
	// 	var _this=this;
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount=0;
	// 	if(len_0<=3&&len_0>0){
	// 		if(_this.op_flag(codes_0,codes_1)==false)
	// 		{
	// 			if(len_0==1){
	// 				if(len_1>=3){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)/(3*2);
	// 				}
	// 			} else if(len_0==2){
	// 				if(len_1>=2){
	// 					itemcount=len_1*(len_1-1)/2;
	// 				}
	// 			} else if(len_0==3){
	// 				if(len_1>=1){
	// 					itemcount=len_1;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return itemcount;
	// },
	// get_11x5dtrx5z5:function(codes){
	// 	var _this=this;
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount=0;
		
	// 	if(len_0<=4&&len_0>0){
	// 		if(_this.op_flag(codes_0,codes_1)==false){
	// 			if(len_0==1){
	// 				if(len_1>=4){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)*(len_1-3)/(4*3*2);
	// 				}
	// 			} else if(len_0==2){
	// 				if(len_1>=3){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)/(3*2);
	// 				}
	// 			} else if(len_0==3){
	// 				if(len_1>=2){
	// 					itemcount=len_1*(len_1-1)/2;
	// 				}
	// 			} else if(len_0==4){
	// 				if(len_1>=1){
	// 					itemcount=len_1;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return itemcount;
	// },
	// get_11x5dtrx6z5:function(codes){
	// 	var _this=this;
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount=0;
	// 	if(len_0<=5&&len_0>0){
	// 		if(_this.op_flag(codes_0,codes_1)==false)
	// 		{
	// 			if(len_0==1){
	// 				if(len_1>=5){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)*(len_1-3)*(len_1-4)/(5*4*3*2);
	// 				}
	// 			} else if(len_0==2){
	// 				if(len_1>=4){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)*(len_1-3)/(4*3*2);
	// 				}
	// 			} else if(len_0==3){
	// 				if(len_1>=3){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)/(3*2);
	// 				}
	// 			} else if(len_0==4){
	// 				if(len_1>=2){
	// 					itemcount=len_1*(len_1-1)/2;
	// 				}
	// 			} else if(len_0==5){
	// 				if(len_1>=1){
	// 				itemcount=len_1;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return itemcount;
	// },
	// get_11x5dtrx7z5:function(codes){
	// 	var _this=this;
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount=0;
	// 	if(len_0<=6&&len_0>0){
	// 		if(_this.op_flag(codes_0,codes_1)==false)
	// 		{
	// 			if(len_0==1){
	// 				if(len_1>=6){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)*(len_1-3)*(len_1-4)*(len_1-5)/(6*5*4*3*2);
	// 				}
	// 			} else if(len_0==2){
	// 				if(len_1>=5){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)*(len_1-3)*(len_1-4)/(5*4*3*2);
	// 				}
	// 			} else if(len_0==3){
	// 				if(len_1>=4){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)*(len_1-3)/(4*3*2);
	// 				}
	// 			} else if(len_0==4){
	// 				if(len_1>=3){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)/(3*2);
	// 				}
	// 			} else if(len_0==5){
	// 				if(len_1>=2){
	// 					itemcount=len_1*(len_1-1)/2;
	// 				}
	// 			} else if(len_0==6){
	// 				if(len_1>=1){
	// 					itemcount=len_1;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return itemcount;
	// },
	// get_11x5dtrx8z5:function(codes){
	// 	var _this=this;
	// 	var codes_0 = _this.get_codes(codes[0]);
	// 	var codes_1 = _this.get_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount=0;
	// 	if(len_0<=7&&len_0>0){
	// 		if(_this.op_flag(codes_0,codes_1)==false)
	// 		{
	// 			if(len_0==1){
	// 				if(len_1>=7){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)*(len_1-3)*(len_1-4)*(len_1-5)*(len_1-6)/(7*6*5*4*3*2);
	// 				}
	// 			} else if(len_0==2){
	// 				if(len_1>=6){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)*(len_1-3)*(len_1-4)*(len_1-5)/(6*5*4*3*2);
	// 				}
	// 			} else if(len_0==3){
	// 				if(len_1>=5){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)*(len_1-3)*(len_1-4)/(5*4*3*2);
	// 				}
	// 			} else if(len_0==4){
	// 				if(len_1>=4){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)*(len_1-3)/(4*3*2);
	// 				}
	// 			} else if(len_0==5){
	// 				if(len_1>=3){
	// 					itemcount=len_1*(len_1-1)*(len_1-2)/(3*2);
	// 				}
	// 			} else if(len_0==6){
	// 				if(len_1>=2){
	// 					itemcount=len_1*(len_1-1)/2;
	// 				}
	// 			} else if(len_0==7){
	// 				if(len_1>=1){
	// 					itemcount=len_1;
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return itemcount;
	// },
	get_jsk3sbthdt:function(codes){
		var _this=this;
		var codes_0 = _this.get_codes(codes[0]);
		var codes_1 = _this.get_codes(codes[1]);
		var len_0 = codes[0].length;
		var len_1 = codes[1].length;
		var itemcount=0;
		var f_flag = false;
		if (len_0 >= 1 && len_0 <= 2) 
		{
			for (var i = 0; i < codes_0.length; i++) 
			{
				if (codes_0[i] != undefined && codes_0[i] != "") 
				{
					for (var g = 0; g < codes_1.length; g++) 
					{
						if (codes_1[g] != undefined && codes_1[g] != "") 
						{
							if (parseInt(codes_0[i]) == parseInt(codes_1[g])) 
							{
								f_flag = true;
								break;
							}
						}
					}
				}
				if (f_flag) {
					itemcount = 0;
					break;
				}
			}
		}
		 else 
		{
			itemcount = 0;
		}
		
		if (f_flag == false) {
			if (len_0 == 1 && len_1 >= 2) {
				itemcount = len_1 * (len_1 - 1) / 2;
			} else if (len_0 == 2) {
				itemcount = len_1;
			} else {
				itemcount = 0;
			}
		}
		return itemcount;
	},
	get_jsk3ebthdt:function(codes){
		var _this=this;
		var codes_0 = _this.get_codes(codes[0]);
		var codes_1 = _this.get_codes(codes[1]);
		var itemcount = 0;
		var f_flag = false;
		if (codes[0].length == 1) {
			for (var i = 0; i < codes_0.length; i++) {
				if (codes_0[i] != undefined && codes_0[i] != "") {
					for (var g = 0; g < codes_1.length; g++) {
						if (codes_1[g] != undefined && codes_1[g] != "") {
							if (parseInt(codes_0[i]) != parseInt(codes_1[g])) {
								itemcount++;
							} else {
								f_flag = true;
								break;
							}
						}
					}
				}
				if (f_flag) {
					itemcount = 0;
					break;
				}
			}
		} else {
			itemcount = 0;
		}
		return itemcount;
	},
	// get_pk10_codes:function(codes){
	// 	var arr=[];
	// 	for (x=0;x<10;x++){codes[x]!==undefined?arr.push(codes[x]+""):arr.push("");}
	// 	return arr;
	// },
	// get_pk10q2fs:function(codes){
	// 	var _this=this;
	// 	var codes_0 = _this.get_pk10_codes(codes[0]);
	// 	var codes_1 = _this.get_pk10_codes(codes[1]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var itemcount = 0;
	// 	if (len_0 >= 1 && len_1 >= 1) 
	// 	{
	// 		var opFlag = false;
	// 		for (var i = 0; i < codes_0.length; i++) 
	// 		{
	// 			var a = codes_0[i];
	// 			for (var s = 0; s < codes_1.length; s++) 
	// 			{
	// 				var b = codes_1[s];
	// 				if (a != undefined && b != undefined) 
	// 				{
	// 					if (a != "" && b != "") {
	// 						if (eval(a) != eval(b)) {
	// 							itemcount = itemcount + 1;
	// 						} 
	// 						else 
	// 						{
	// 							continue;
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return itemcount;
	// },
	// get_pk10q3fs:function(codes){
	// 	var _this=this;
	// 	var codes_0 = _this.get_pk10_codes(codes[0]);
	// 	var codes_1 = _this.get_pk10_codes(codes[1]);
	// 	var codes_2 = _this.get_pk10_codes(codes[2]);
	// 	var len_0 = codes[0].length;
	// 	var len_1 = codes[1].length;
	// 	var len_2 = codes[2].length;
	// 	var itemcount = 0;
	// 	if (len_0 >= 1 && len_1 >= 1 && len_2 >= 1) 
	// 	{
	// 		for (var i = 0; i < codes_0.length; i++) 
	// 		{
	// 			var a = codes_0[i];
	// 			if (a != undefined && a != "") {
	// 				for (var s = 0; s < codes_1.length; s++) 
	// 				{
	// 					var b = codes_1[s];
	// 					if (b != undefined && b != "") 
	// 					{
	// 						if (eval(a) != eval(b)) {
	// 							for (var t = 0; t < codes_2.length; t++) 
	// 							{
	// 								var c = codes_2[t];
	// 								if (c != undefined && c != "") 
	// 								{
	// 									if (eval(c) != eval(b) && eval(c) != eval(a)) 
	// 									{
	// 										itemcount = itemcount + 1;
	// 									}
	// 								}
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return itemcount;
	// }
}