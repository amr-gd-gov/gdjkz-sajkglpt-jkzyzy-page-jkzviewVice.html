/**作者：黄林(huanglin@iruitech.com)**/
var esscNoDtm; //电子社保卡动态码
var dataRs; //$post数据返回值json，全局结果变量
var user;

/**
 * 获取服务器应用全路径
 * @returns
 */
// function getAllUrl() {
// 	/*return "http://rsj.sg.gov.cn:8089/"; */
// 	return "http://192.168.1.112:8080/"; 
// }

function getAllUrl() {

	 // return 'http://10.0.0.22:8081/';

	 //  return "https://testgdsayyzy.dotrain.cn/inspector/"
	var s = window.location.hostname;		
	 if (s.indexOf('210.76.74.105') >=0  || s.indexOf('amr.gd.gov.cn') >=0){
		return "https://amr.gd.gov.cn/gdjkz/inspector/";
	 }else {
	 	return "https://19.15.88.201/gdjkz/inspector/";
	 } 
	//return "http://localhost:8081/inspector/";

}

function getPicUrl(){
	var s = window.location.hostname;
	if (s.indexOf('210.76.74.105') >=0  || s.indexOf('amr.gd.gov.cn') >=0){
		return "https://amr.gd.gov.cn/gdjkz/inspector/static/images";
	 }else {
	 	return "https://19.15.88.201/gdjkz/inspector/static/images";
	 } 
//	return "http://120.25.104.121:8100/inspector/static/images";
}

function getqrcodeUrl() {

	return 'https://amr.gd.gov.cn/gdjkz/sajkglpt/jkzyzy'; 

}


function getFdaUrl(){
	return 'http://120.25.104.121:8100/api/'
}

function getFdaPicURL() {
	//return 'http://jg.gdsay.cn/attach/';
	return 'http://120.25.104.121:8100/attach/';
}

function getUploadFileUrl() {
	//return 'http://jg.gdsay.cn/api/file/uploadBase64/'
	return 'http://120.25.104.121:8100/api/file/uploadBase64/'
}
function getJkzPicURL(id){
	var s = window.location.hostname;
	var path = ''
	if (s.indexOf('210.76.74.105') >=0  || s.indexOf('amr.gd.gov.cn') >=0){		
		$.ajax({
			url:"https://amr.gd.gov.cn/gdjkz/inspector/app/view/"+id,
			type:"post",
			async:false,
			success:function(r){
				path =  "https://amr.gd.gov.cn/gdjkz/" +r;
			}
		});
	 }else {
		$.ajax({
			url:"https://19.15.88.201/gdjkz/inspector/app/view/"+id,
			type:"POST",
			async:false,
			data:{"id":id},
			success:function(r){
				path = "https://19.15.88.202/gdjkz/"+r;
			},error: function(XMLHttpRequest, textStatus, errorThrown) {
}
		});
	 } 
	return path;
	
}


/**
 *获取客户端全路径 
 * 
 * @returns
 */

function getAllUrlCs() {
	return "";
}

/**
 * POST请求方法-公用
 * @param url                 请求路径
 * @param jsonArgs            请求参数（示例：user:"user",password:"password"）
 * @param successMessage      操作成功提示信息（当为空时，检测返回参数中的msg，返回参数亦为空时跳转操作成功地址，其它情况未处理）
 * @param errorMessage        操作失败提示信息（当为空时，检测返回参数中的msg，返回参数亦为空时跳转操作失败地址，其它情况未处理）
 * @param toSuccessUrl        操作成功跳转地址（当为空时，不作跳转）
 * @param toErrorUrl          操作失败跳转地址（当为空时，不作跳转）
 * @param ywtype              扩展用：业务类型，指明业务类型，作为自定义处理条件，开发者可在该条件下更新$post方法，完成自己特有处理方式
 * @returns
 */
function $post(url, jsonArgs, successMessage, errorMessage, toSuccessUrl,
	toErrorUrl, ywtype) {

	$.ajax({
		type: "POST",
		url: url,
		data: jsonArgs,
		dataType: "json",
		success: function(data) {
			$.DialogByZ.Close();
			var code = data.code;
			var message = data.msg;
			dataRs = data.data;
			if (code == 1) {
				if (ywtype == "login") {
					// var obj = JSON.parse(dataRs);
					
					localStorage.setItem('checkName', dataRs.checkName);
					localStorage.setItem('ssbm', dataRs.ssbm);
					localStorage.setItem('zfzjhm', dataRs.zfzjhm);
					localStorage.setItem('classType', dataRs.classType);
					localStorage.setItem('userid', data.data.id);
					localStorage.setItem('checkuserid', data.data.checkUserId);
					localStorage.setItem('ssxq', data.data.ssxq);
					localStorage.setItem('checkUserId', dataRs.checkUserId);
					// plus.storage.setItem('checkName',dataRs.checkName);
					// plus.storage.setItem('ssbm',dataRs.ssbm);
					// plus.storage.setItem('zfzjhm',dataRs.zfzjhm);
					// plus.storage.setItem('classType',dataRs.classType);

					/* 	toSuccessUrl = toSuccessUrl+"?checkName="+encodeURI(encodeURI(dataRs.checkName))
						+"&ssbm="+encodeURI(encodeURI(dataRs.ssbm))+"&zfzjhm="+dataRs.zfzjhm; */
					$setcookie();
				}
				if (successMessage != null && successMessage != "" &&
					successMessage != undefined &&
					successMessage != "undefined") {
					if (ywtype == "yzm") {
						$.DialogByZ.Autofade({
							Content: "短信验证码已发送"
						})
					} else {
						$.DialogByZ.Alert({
							Title: "系统提示",
							Content: successMessage,
							BtnL: "确定",
							FunL: forwordToUrl(toSuccessUrl)
						});
					}
				} else {
					if (toSuccessUrl != null && toSuccessUrl != "" &&
						toSuccessUrl != undefined &&
						toSuccessUrl != "undefined") {
						forwordToUrl(toSuccessUrl);
						//location.href = toSuccessUrl;
					}
				}
			} else {
				var titlems = "操作失败";
				if (ywtype == "login") {
					titlems = "登录失败";
					if (errorMessage != null && errorMessage != "" &&
						errorMessage != undefined &&
						errorMessage != "undefined") {
						$.DialogByZ.Alert({
							Title: titlems,
							Content: errorMessage,
							BtnL: "确定",
							FunL: alerts
						});
					} else if (message != null && message != "" &&
						message != undefined && message != "undefined") {
						$.DialogByZ.Alert({
							Title: titlems,
							Content: message,
							BtnL: "确定",
							FunL: alerts
						});
					} else {
						if (toErrorUrl != null && toErrorUrl != "" &&
							toErrorUrl != undefined &&
							toErrorUrl != "undefined") {
							mui.openWindow(toErrorUrl);
						}
					}
				}else if (ywtype == "chkuser") {
					if (errorMessage != null && errorMessage != "" &&
						errorMessage != undefined &&
						errorMessage != "undefined") {
						$.DialogByZ.Alert({
							Title: titlems,
							Content: errorMessage,
							BtnL: "确定",
							FunL: childbacklogin
						});
					} else if (message != null && message != "" &&
						message != undefined && message != "undefined") {
						$.DialogByZ.Alert({
							Title: titlems,
							Content: message,
							BtnL: "确定",
							FunL: childbacklogin
						});
					} else {
						if (toErrorUrl != null && toErrorUrl != "" &&
							toErrorUrl != undefined &&
							toErrorUrl != "undefined") {
						}
					}
				} else {
					if (errorMessage != null && errorMessage != "" &&
						errorMessage != undefined &&
						errorMessage != "undefined") {
						$.DialogByZ.Alert({
							Title: titlems,
							Content: errorMessage,
							BtnL: "确定"
						});
					} else if (message != null && message != "" &&
						message != undefined && message != "undefined") {
						$.DialogByZ.Alert({
							Title: titlems,
							Content: message,
							BtnL: "确定"
						});
					} else {
						if (toErrorUrl != null && toErrorUrl != "" &&
							toErrorUrl != undefined &&
							toErrorUrl != "undefined") {
							backl();
						}
					}
				}
			}
		},
		error: function(textStatus) { //请求失败后调用的函数
			$.DialogByZ.Alert({
				Title: "操作失败",
				Content: "无法连接服务器超时，请确认你的网络是否已正常连接",
				BtnL: "确定"
			});
		}
	});
}

function openUrl(url) {
	if (url != null && url != "" &&
		url != undefined &&
		url != "undefined") {
		location.href = encodeURI(url);
	}
}

function $checkLoginUser() {
	var url = getAllUrl() + "a/sysuser/fdaUser/checkLogin"
	var jsonArges = {username:localStorage.getItem("checkName")};
	$post(url, jsonArges, null, null, "", "../login", "chkuser");
}

/**扫描身份证号码
 * formData 
 * jsonArgs 调用参数
 */
function $saomiaoSFZ(formData) {
	$.DialogByZ.Loading({
		Url: '../messagealert/image/loading.png',
		Title: "扫描中，请稍后"
	});
	$.ajax({
		url: getAllUrl() + "/iruitechapp/tenxunyoutu/getIdcardInfo.do",
		type: 'POST',
		data: formData,
		cache: false,
		contentType: false,
		processData: false,
		success: function(result) {
			$.DialogByZ.Close();
			var data = result.data;
			if (result.code == "1") {
				var obj = JSON.parse(data);
				$.DialogByZ.Autofade({
					Content: result.msg
				});
				$("#name").val(obj.name);
				$("#idcard").val(obj.id);
				//setMobile(obj.name,obj.id);
			} else {
				$.DialogByZ.Alert({
					Title: "扫描失败",
					Content: result.msg,
					BtnL: "确定",
					FunL: alerts
				});
			}
		}
	});
}

/**扫描身份证号码(门诊约定)
 * formData 
 * jsonArgs 调用参数
 */
function $saomiaoSFZ2(formData) {
	$.DialogByZ.Loading({
		Url: '../messagealert/image/loading.png',
		Title: "扫描中，请稍后"
	});
	$.ajax({
		url: getAllUrl() + "/iruitechapp/tenxunyoutu/getIdcardInfo.do",
		type: 'POST',
		data: formData,
		cache: false,
		contentType: false,
		processData: false,
		success: function(result) {
			$.DialogByZ.Close();
			var data = result.data;
			if (result.code == "1") {
				var obj = JSON.parse(data);
				$.DialogByZ.Autofade({
					Content: result.msg
				});
				$("#name").val(obj.name);
				$("#idcard").val(obj.id);
				setMobile(obj.name, obj.id);
			} else {
				$.DialogByZ.Alert({
					Title: "扫描失败",
					Content: result.msg,
					BtnL: "确定",
					FunL: alerts
				});
			}
		}
	});
}

/**根据姓名和身份证获取手机号码**/
function $setMobile() {
	/*$.DialogByZ.Loading({
		Url: '../messagealert/image/loading.png',
		Title: "扫描中，请稍后"
	});*/

	$.ajax({
		url: getAllUrl() + "/iruitechapp/cytsmrz/getRzxqByNameAndIdcard.do",
		type: 'POST',
		data: {
			idcard: $("#idcard").val(),
			name: $("#name").val()
		},
		dataType: "json",
		success: function(result) {
			$.DialogByZ.Close();
			var data = result.data;
			if (result.code == "1") {
				$("#mobile").val(data.mobile);
				//$("#sbzh").val(data.sbzhsub8);
			} else {
				$.DialogByZ.Alert({
					Title: "系统提示",
					Content: result.msg,
					BtnL: "确定",
					FunL: alerts
				});
			}
		}
	});
}
/**根据姓名和身份证获取手机号码**/
function setMobile(xm, sfzhm) {
	$.ajax({
		url: getAllUrl() + "/iruitechapp/cytsmrz/getRzxqByNameAndIdcard.do",
		type: 'POST',
		data: {
			idcard: sfzhm,
			name: xm
		},
		dataType: "json",
		success: function(result) {
			var data = result.data;
			if (result.code == "1") {
				$("#mobile").val(data.mobile);
				//$("#sbzh").val(data.sbzhsub8);
			} else {
				$.DialogByZ.Alert({
					Title: "系统提示",
					Content: result.msg,
					BtnL: "确定",
					FunL: alerts
				});
			}
		}
	});
}
/**扫描身份证号码(拍照扫描)
 * path 路径
 * type 来自模块
 */
function saomiaoCm(path, type) {
	$.DialogByZ.Loading({
		Url: '../messagealert/image/loading.png',
		Title: "扫描中，请稍后"
	});
	var task = plus.uploader.createUpload(getAllUrl() + "/iruitechapp/tenxunyoutu/getIdcardInfoCar.do", {
			method: "POST",
			blocksize: 204800,
			priority: 100
		},
		function(t, status) {
			// 上传完成
			if (status == 200) {
				$.DialogByZ.Close();
				var obj = JSON.parse(t.responseText);
				if (obj.code == "1") {
					var objv = JSON.parse(obj.data);
					$.DialogByZ.Autofade({
						Content: obj.msg
					});
					$("#name").val(objv.name);
					$("#idcard").val(objv.id);
					if (type == "menzhengyueding") {
						setMobile(objv.name, objv.id);
					}
				} else {
					$.DialogByZ.Alert({
						Title: "扫描失败",
						Content: obj.msg,
						BtnL: "确定",
						FunL: alerts
					});
				}
			} else {
				$.DialogByZ.Alert({
					Title: "扫描失败",
					Content: "连接服务器失败，请检查您的网络",
					BtnL: "确定",
					FunL: alerts
				});
			}
		}
	);
	task.addFile(path, {
		key: "camera"
	});
	task.addData("key", type);
	//task.addEventListener( "statechanged", onStateChanged, false );
	task.start();
}

/**获取验证码**/
function $getYzm(jsonArges) {
	var url = getAllUrl() + "/iruitechapp/cytsmrz/getYzm.do"
	$post(url, jsonArges, "", "", "", "", "yzm");
}

/**
 *获取cookie 
 * @returns
 */
function $getcookie() {
	if (localStorage.getItem("autoLogin") == "true") {
		$("#autoLogin").attr("checked", true);
		$("#username").val(localStorage.getItem("username"));
		$("#password").val(localStorage.getItem("password"));
	}
}
/**
 * 登录
 */


function $login() {
	$.DialogByZ.Loading({
		Url: 'messagealert/image/loading.png',
		Title: "登录中"
	});
	//var url = getAllUrl() + "a/login";
	var url = getAllUrl() + "a/sysuser/fdaUser/login";
	var usernameQd = $("#username").val();
	var passwordQd = $("#password").val();
	if (usernameQd == null || usernameQd == "") {
		$.DialogByZ.Alert({
			Title: "系统提示",
			Content: "请输入用户名",
			BtnL: "确定",
			FunL: alerts
		})
		/*$.message({
		    message:'用户名不能为空',
		    type:'error'
		});*/
		return;
	}
	if (passwordQd == null || passwordQd == "") {
		$.DialogByZ.Alert({
			Title: "系统提示",
			Content: "请输入密码",
			BtnL: "确定",
			FunL: alerts
		})
		/*$.message({
		    message:'密码不能为空',
		    type:'error'
		});*/
		return;
	}
	
	var jsonArges = {
		username: usernameQd,
		password: passwordQd
	};
	$post(url, jsonArges, null, null, "page/firstPage", "",
		"login");
}


/**
 * 设置cookie
 * @returns
 */
function $setcookie() {
	if ($("#autoLogin").is(":checked")) {
		localStorage.setItem('autoLogin',"true" );
		localStorage.setItem('username',$("#username").val() );
		localStorage.setItem('password',$("#password").val() );
	}

	/*if ($("#autoLogin").is(":checked")) {
		$.cookie("autoLogin", "true", {
			expires : 14
		}); //存储一个带2周期限的cookie  
		$.cookie("username", $("#username").val(), {
			expires : 14
		});
		$.cookie("password", $("#password").val(), {
			expires : 14
		});
		var k=$.cookie("password");
		alert("cookie设置成功,自动登录状态=="+k);
	}*/
}

function $setUserCookie(name, value) {
	$.cookie(name, value, {
		expires: 14
	});
}

function isEmpty(obj){
	    if(typeof obj == "undefined" || obj == null || obj == ""){
	        return true;
	    }else{
	        return false;
	    }
	}

/**
 * 自动登录
 * @param username
 * @param password
 * @returns
 */
function $checkAutoLogin() {
	var url = getAllUrl() + "a/sysuser/fdaUser/login";
	var atl = localStorage.getItem('autoLogin');
	var username = localStorage.getItem('username');
	var password = localStorage.getItem('password');
	if(!isEmpty(username) && !isEmpty(password)){
		if (atl == "true") {
			var jsonArges = {
				username: username,
				password: password
			};
			$post(url, jsonArges, null, null, "page/firstPage", "login",
				"login");
		} else {
			//location.href = "login.html";
		}
	}
	
	/*if ($.cookie("autoLogin") == "true") {
		$.cookie("autoLogin", "true", {
			expires : 14
		}); //存储一个带2周期限的cookie  
		$.cookie("username", $.cookie("username"), {
			expires : 14
		});
		$.cookie("password", $.cookie("password"), {
			expires : 14
		});
		var jsonArges = {
			username : $.cookie("username"),
			password : $.cookie("password")
		};
		$post(url, jsonArges, null, null, "plus/firstPage.html", "plus/errorInfo.html",
				"");
		//location.href ="firstPage.html";
	} else {
		location.href = "login.html";
	}*/
}
/**
 * 获取url参数
 * @param name
 * @returns
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return decodeURI(r[2]);
	return null;
}
/**
 * 确定关闭
 * @returns
 */
function alerts() {
	$.DialogByZ.Close();
}

/**
 * 功能跳转
 */
function forwordToUrl(urlArgs) {
	$.DialogByZ.Close();
	try{
		 mui.openWindow(urlArgs + ".html",urlArgs,{});
	} catch (e) {
		//TODO handle the exception
		console.log(e);
	}
	//location.href = urlArgs + ".html";
}

function forwordToUrlLc(urlArgs) {
	//mui.openWindow(urlArgs + ".html");
	location.href = urlArgs + ".html";
}
/**
 * 数据检测
 */
var typeJson = {
	"mobile": /^1[34578]\d{9}$/,
	"idcard": /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
	"phone": /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/,
	"networkLink": /(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?/,
	"email": /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
	"imageUrl": /(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?/,
	"ip": /(\d+)\.(\d+)\.(\d+)\.(\d+)/,
	"postalcode": /[1-9]{1}(\d+){5}/,
	"chineseFont": /[^\x00-\xff]*/,
	"chineseFontString": /[\u4e00-\u9fa5]*/,
	"number": /^[0-9]*[1-9][0-9]*$/,
	"decimal": /(-?\d*)\.?\d+/,
	"int": /\d+/
}
/**
 * 输入数据检测
 * value 检测值
 * type  检测类型 可为空，为空时不检测
 * message 提示信息 type为空时可为空
 * length value的长度限制 可为空
 * isnotempty Y:非空判断；N或空：不判断是否非空
 * isnotemptymessage 非空判断信息 可为空
 */
function checkInput(value, type, message, length, isnotempty, isnotemptymessage) {
	var bds = typeJson[type];
	if (isnotempty == "Y" &&
		(value == null || value == "" || value == undefined || value == "undefined")) {
		$.DialogByZ.Alert({
			Title: "系统提示",
			Content: isnotemptymessage,
			BtnL: "确定",
			FunL: alerts
		});
		return false;
	}
	if (length != null && length != "" && length != undefined &&
		length != "undefined" && value.length != length) {
		$.DialogByZ.Alert({
			Title: "系统提示",
			Content: message,
			BtnL: "确定",
			FunL: alerts
		});
		return false;
	}
	if (bds != null && bds != "" && bds != undefined && bds != "undefined" &&
		!(bds.test(value))) {
		$.DialogByZ.Alert({
			Title: "系统提示",
			Content: message,
			BtnL: "确定",
			FunL: alerts
		});
		return false;
	} else {
		return true;
	}
}

/**拍照或选择图片**/
var h5_upload_ops = {
	init: function() {
		this.eventBind();
	},
	eventBind: function() {
		var that = this;
		$("#upload").change(function() {
			var reader = new FileReader();
			reader.onload = function(e) {
				that.compress(this.result);
			};
			reader.readAsDataURL(this.files[0]);
		});
	},
	compress: function(res) {
		var that = this;
		var img = new Image(),
			maxH = 300;

		img.onload = function() {
			var cvs = document.createElement('canvas'),
				ctx = cvs.getContext('2d');

			if (img.height > maxH) {
				img.width *= maxH / img.height;
				img.height = maxH;
			}
			cvs.width = img.width;
			cvs.height = img.height;

			ctx.clearRect(0, 0, cvs.width, cvs.height);
			ctx.drawImage(img, 0, 0, img.width, img.height);
			var dataUrl = cvs.toDataURL('image/jpeg', 1);
			$(".img_wrap").attr("src", dataUrl);
			$(".img_wrap").show();
			// 上传略
			that.upload(dataUrl);
		};

		img.src = res;
	},
	upload: function(image_data) {
		/*这里写上次方法,图片流是base64_encode的*/
	}
}

/**
 * 获取卫生院名称 jsonArgs 调用参数
 */
function $getunitName() {
	var formData = new FormData(document.getElementById("smForm")); // 表单id
	$.ajax({
		url: getAllUrl() + "/iruitechapp/cytmzyd/getunitName.do",
		type: 'POST',
		data: formData,
		async: false,
		cache: false,
		contentType: false,
		processData: false,
		success: function(data) {
			$.DialogByZ.Close();
			var unitName = data.data;
			if (data.code == "1") {
				$("#unitName").val(unitName);
			} else {
				$("#unitName").val("获取约信息异常");
			}
		}
	});
}
/**
 * 获取卫生站名称 jsonArgs 调用参数
 */
function $getunitNameByCode() {
	var formData = new FormData(document.getElementById("smForm")); // 表单id
	$.ajax({
		url: getAllUrl() + "/iruitechapp/cytmzyd/getunitNameByCode.do",
		type: 'POST',
		data: formData,
		async: false,
		cache: false,
		contentType: false,
		processData: false,
		success: function(data) {
			$.DialogByZ.Close();
			var unitName = data.data;
			if (data.code == "1") {
				$("#unitName").val(unitName);
			} else {
				$("#unitName").val("获取约信息异常");
			}
		}
	});
}

//下拉刷新的回调
function downCallback() {
	$.ajax({
		type: "POST",
		url: getAllUrl() + "/iruitechapp/cytsmrz/page.do",
		data: {
			searcharg: $("#arg").val(),
			pageindex: 1,
			pagesize: 10
		},
		dataType: "json",
		success: function(data) {
			//联网成功的回调,隐藏下拉刷新的状态;
			mescroll.endSuccess(); //无参
			//设置数据
			getDataList(data, data.rssize, "down");
		},
		error: function(data) {
			//联网失败的回调,隐藏下拉刷新的状态
			mescroll.endErr();
		}
	});
}

//上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数
function upCallback(page) {
	$.ajax({
		type: "POST",
		url: getAllUrl() + "/iruitechapp/cytsmrz/page.do",
		data: {
			searcharg: $("#arg").val(),
			pageindex: page.num,
			pagesize: page.size
		},
		dataType: "json",
		success: function(data) {
			mescroll.endBySize(data.rssize, data.total);
			//设置列表数据
			getDataList(data, data.rssize, "up");

		},
		error: function(data) {
			//联网失败的回调,隐藏下拉刷新和上拉加载的状态
			mescroll.endErr();
		}
	});
}

function checkboxmt(id) {
	if ($("#" + id).attr("src") == "images/c_checked.png") {
		$("#" + id).attr("src", "images/c_check.png");
	} else if ($("#" + id).attr("src") == "images/c_check.png") {
		$("#" + id).attr("src", "images/c_checked.png");
	}

}
/**
 * 获取所有checkboxids
 */
function getAllCheckboxsValue() {
	var RewardLevelIds = "";
	$('input[type=checkbox]').each(function(i) {
		var name = $(this).attr("name");
		var id = name.substring(name.indexOf("_") + 1) //name后面为value值
		if (i != 0) {
			RewardLevelIds += "," + id;
		} else {
			RewardLevelIds += id;
		}
	})
	return RewardLevelIds;
}
/**
 * 获取已选中checkboxids
 */
function getCheckboxsValue() {
	var RewardLevelIds = "";
	$("input:checkbox:checked").each(function(i) {
		var name = $(this).attr("name");
		var id = name.substring(name.indexOf("_") + 1) //name后面为value值
		if (i != 0) {
			RewardLevelIds += "," + id;
		} else {
			RewardLevelIds += id;
		}
	})
	return RewardLevelIds;
}
/**
 * 获取未选中checkboxids
 */
function getCheckboxsNOcheckedValue() {
	var RewardLevelIds = "";
	$('input[type=checkbox]:not(:checked)').each(function(i) {
		var name = $(this).attr("name");
		var id = name.substring(name.indexOf("_") + 1) //name后面为value值
		if (i != 0) {
			RewardLevelIds += "," + id;
		} else {
			RewardLevelIds += id;
		}
	})
	return RewardLevelIds;
}
/**
 * 通过勾选数据的ID字符串组合，删除数据
 */
function $deletePl() {
	var ids = getCheckboxsValue();
	if (ids.length == 0) {
		$.DialogByZ.Alert({
			Title: "系统提示",
			Content: "请至少选择一条数据",
			BtnL: "确定",
			FunL: alerts
		});
		return;
	}
	$.DialogByZ.Confirm({
		Title: "系统提示",
		Content: "确定要删除出选中的数据吗？",
		FunL: deletePl,
		FunR: cancel
	});
}

function jia(idd) {
	$("#" + idd + "ft").text(parseInt($("#" + idd + "ft").text()) + 1);
}

function cancel() {
	$.DialogByZ.Close();
}


/**
 * 删除指定的div
 * @param {Object} divids DIV,id组合字符串，逗号隔开
 * @param {Object} alertYN 是否需要提示选中
 */
function delDivByIds(divids, alertYN) {
	if (alertYN == "Y") {
		if (divids.length == 0) {
			$.DialogByZ.Alert({
				Title: "系统提示",
				Content: "请至少选择一条数据",
				BtnL: "确定",
				FunL: alerts
			});
			return;
		}
		var waitDelCheckBoxNames = divids.split(",");
		for (var i = 0; i < waitDelCheckBoxNames.length; i++) {

			var box = document.getElementById(waitDelCheckBoxNames[i]);
			box.parentNode.removeChild(box);
		}
	} else if (alertYN == "N") {
		if (divids.length > 0) {
			var waitDelCheckBoxNames = divids.split(",");
			for (var i = 0; i < waitDelCheckBoxNames.length; i++) {

				var box = document.getElementById(waitDelCheckBoxNames[i]);
				box.parentNode.removeChild(box);
			}
		}
	} else {
		$.DialogByZ.Alert({
			Title: "系统提示",
			Content: "参数alertYN值有误，只能为字符串Y或N",
			BtnL: "确定",
			FunL: alerts
		});
		return;
	}

}
/**
 * 获取本年度本月第一天，返回类型 yyyy-MM-dd
 */
function getFirstDay() {
	var date = new Date(),
		y = date.getFullYear(),
		m = date.getMonth();
	var firstDay = data_string(new Date(y, m, 1), 'yyyy-MM-dd');
	return firstDay;
}

/**
 * 获取本年度本月最后一天,返回类型 yyyy-MM-dd
 */
function getLastDay() {
	var date = new Date(),
		y = date.getFullYear(),
		m = date.getMonth();
	var lastDay = data_string(new Date(y, m + 1, 0), 'yyyy-MM-dd');
	return lastDay;
}

/**
 * 获取当前月，返回类型 yyyy-MM
 */
function getNowMonth() {
	var date = new Date(),
		y = date.getFullYear(),
		m = date.getMonth();
	var nowmonth = data_string(new Date(y, m, 1), 'yyyy-MM');
	return nowmonth;
}

//时间日期转换成string
function data_string(d, value) {
	if (value == "yyyy-MM-dd hh:mm:ss") {
		var ar_date = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
		for (var i = 0; i < ar_date.length; i++) ar_date[i] = dFormat(ar_date[i]);
		return ar_date.slice(0, 3).join('-') + ' ' + ar_date.slice(3).join(':');

		function dFormat(i) {
			return i < 10 ? "0" + i.toString() : i;
		}
	} else if (value == "yyyy-MM-dd") {
		var ar_date = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
		for (var i = 0; i < ar_date.length; i++) ar_date[i] = dFormat(ar_date[i]);
		return ar_date.join('-');

		function dFormat(i) {
			return i < 10 ? "0" + i.toString() : i;
		}
	} else if (value == "yyyy-MM") {
		var ar_date = [d.getFullYear(), d.getMonth() + 1];
		for (var i = 0; i < ar_date.length; i++) ar_date[i] = dFormat(ar_date[i]);
		return ar_date.join('-');

		function dFormat(i) {
			return i < 10 ? "0" + i.toString() : i;
		}
	}
}

function muiback() {
	mui.back();
}





/**我的-个人资料**/
function $initminepageGrzl() {
	$.DialogByZ.Loading({
		Url: '../messagealert/image/loading.png',
		Title: "处理中，请稍后"
	});
	$.ajax({
		type: "POST",
		url: getAllUrl() + "/iruitechapp/cytlogin/my.do",
		data: {},
		dataType: "json",
		success: function(rs) {
			$.DialogByZ.Close();
			var tbody = '<div class="mui-card-header">个人资料</div>'

				+
				'<div class="mui-card-content"><div style="margin:15px;">' +
				'<p style="color:black;">单位：' +
				rs.data.unitName +
				'</p>' +
				'<p style="color:black;">账号：' +
				rs.data.account +
				'</p>' +
				'<p style="color:black;">姓名：' +
				rs.data.name +
				'</p>' +
				'<p style="color:black;">手机：'
				/*+ rs.data.unitName */
				+
				'</p>' +
				'<p style="color:black;">电话：'
				/*+ rs.data.unitName */
				+
				'</p>' +
				'<p style="color:black;">Email：'
				/*+ rs.data.unitName */
				+
				'</p>' +
				'<p style="color:black;">医师编号：'
				/*+ rs.data.unitName */
				+
				'</p>' +
				'<p style="color:black;">资格证：'
				/*	+ rs.data.unitName */
				+
				'</p>' +
				'<p style="color:black;">资产编号：'
				/*+ rs.data.unitName */
				+
				'</p>' +
				'</div></div>';
			$("#tzxx").html(tbody);

		},
		error: function(data) {
			//联网失败的回调,隐藏下拉刷新和上拉加载的状态
			$.DialogByZ.Alert({
				Title: "系统提示",
				Content: "连接服务器失败，请检测您的网络，或联系管理员",
				BtnL: "确定",
				FunL: alerts
			});
		}
	});
}
/**无空格验证**/
function sfbbhkg(value, errormsg) {
	if (value.indexOf(" ") == -1) {
		return true;
	} else {
		$.DialogByZ.Alert({
			Title: "系统提示",
			Content: errormsg,
			BtnL: "确定",
			FunL: alerts
		});
		return false;
	}
}


/**保存药品**/
function $saveYp() {
	$.DialogByZ.Loading({
		Url: '../messagealert/image/loading.png',
		Title: "保存中，请稍后"
	});
	var jsonArgs = seqMedArgs();
	$.ajax({
		type: "POST",
		url: getAllUrl() + "/iruitechapp/cytMed/save.do",
		data: jsonArgs,
		dataType: "json",
		success: function(rs) {
			$.DialogByZ.Close();
			if (rs.code == 1) {
				dotype = "save";
				mui.back();
			} else {
				$.DialogByZ.Alert({
					Title: "系统提示",
					Content: "保存失败，系统出现未知错误",
					BtnL: "确定",
					FunL: alerts
				});
			}
		},
		error: function(data) {
			//联网失败的回调,隐藏下拉刷新和上拉加载的状态
			$.DialogByZ.Alert({
				Title: "错误提示",
				Content: "连接服务器失败，请检测您的网络，或联系管理员",
				BtnL: "确定",
				FunL: alerts
			});
		}
	})
}




function backl() {
	try{
		 mui.openWindow( "../login.html");
	} catch (e) {
		//TODO handle the exception
		console.log(e);
	}
}

function backHis1() {
	mui.back();
}

function childbacklogin() {
	try{
		 var backLogin = mui.openWindow( "../login.html");
		 mui.fire(backLogin,'backLogin',{});
	} catch (e) {
		//TODO handle the exception
		console.log(e);
	}
}

//检查是否有最新版本
function $checkAppVersion() {
	var wgtVer = "";
	$.DialogByZ.Loading({
		Url: '../messagealert/image/loading.png',
		Title: "检测中，请稍后"
	});
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		wgtVer = inf.version;
		$.ajax({
			type: "POST",
			url: getAllUrl() + "/iruitechapp/cytsmrz/getAppVersionInfo.do",
			data: {
				version: wgtVer
			},
			dataType: "json",
			success: function(rs) {
				$.DialogByZ.Close();
				if (rs.code == 1) {
					var wgtUrl = rs.data["FILENAME"];
					alert(wgtUrl);
					checkupdateapp(wgtUrl);
				} else {
					$.DialogByZ.Alert({
						Title: "系统提示",
						Content: rs.msg,
						BtnL: "确定",
						FunL: alerts
					});
				}
			},
			error: function(data) {
				//联网失败的回调,隐藏下拉刷新和上拉加载的状态
				$.DialogByZ.Alert({
					Title: "错误提示",
					Content: "连接服务器失败，请检测您的网络，或联系管理员",
					BtnL: "确定",
					FunL: alerts
				});
			}
		})
	});

}

//检查更新
function checkupdateapp(wgtUrl) {
	// var wgtUrl=getAllUrl()+"/iruitechapp/appwgt/H5901A83E.wgt";
	plus.nativeUI.showWaiting("检测下载更新文件...");
	plus.downloader.createDownload(wgtUrl, {
		filename: "_doc/update/"
	}, function(d, status) {
		alert(status);
		if (status == 200) {
			installWgt(d.filename); // 安装wgt包 
		} else {
			plus.nativeUI.alert("更新包下载失败！");
		}
		plus.nativeUI.closeWaiting();
	}).start();
}
// 更新应用资源
function installWgt(path) {
	plus.nativeUI.showWaiting("更新APP文件...");
	plus.runtime.install(path, {}, function() {
		plus.nativeUI.closeWaiting();
		plus.nativeUI.alert("应用资源更新完成！", function() {
			plus.runtime.restart();
		});
	}, function(e) {
		plus.nativeUI.closeWaiting();
		plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
	});
}



