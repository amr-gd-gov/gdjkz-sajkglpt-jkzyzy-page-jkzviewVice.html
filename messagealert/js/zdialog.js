/*! zdialog | (c) 2016 | by zcy */
/**
 * FunL: 表示左侧按钮的触发事件      
 * FunR: 代表右侧的触发事件
 * 默认事件 关闭弹出层
 * **/
;(function($,window,document,undefined){
		   //默认参数
		    var PARAMS;
		    var DEFAULTPARAMS = { Title: "标题", Content: "",BtnL:"确定",BtnR:"取消" ,BtnT:"noshow", FunL: new Object, FunR: new Object,FunT: new Object };
		    var lodingParams={Url:"图片地址",Title:"标题"};
		    $.DialogByZ = {
		        //弹出提示框
		        Alert: function (params) {
		            Show(params,"Alert");
		        },
		        //弹出确认框
		        Confirm: function (params) { Show(params,"Confirm"); },
		        //自动显示弹框
		        Autofade: function (params) { Show(params,"Autofade") },
				MenuChange: function(params){
					 Show(params,"MenuChange")
				},
		        //关闭弹出框
		        Close: function () {
		            $(".zbox-popup,.zbox-popup-backdrop").remove();
		        },				
		        //加载图形
		        Loading:function(lodingParams){
		        	loadBox(lodingParams)
		        }
		
		    };
		        //初始化参数
		    function Init(params) {
		        if (params != undefined && params != null) {
		            PARAMS = $.extend({},DEFAULTPARAMS, params);
		        }
		    };
		    function loadBox(lodingParams){
		    	//color:rgba(0,0,0,.4)
		    	var url=lodingParams.Url;
		    	var title=lodingParams.Title;
		    	//var dislogContainer=$('<div class="zbox-popup" style="display: block;color:#22bbca">'+title+'<img  id="zchange" src="'+url+'"></div>');
		    	var dislogContainer=$('<div class="zbox-popup" style="display: block;color:#22bbca"><img  id="zchange" src="'+url+'"></div>');
		    	var blackFilter=$('<div class="zbox-popup-backdrop" style="display: block;"></div>');
		    	setTimeout(function(){
		    	  		 $(".zbox-popup").addClass('zbox-popup-in');
		    	  		 $(".zbox-popup-backdrop").addClass('zbox-active');
		    	  	},30)
		    	$("body").append(blackFilter);
		    	$("body").append(dislogContainer);
		    }
		    function Show(params, caller){
		    	  Init(params);
		    	  var dislogContainer;
		    	  var dialogInner;
		    	  var dialogBtn;
		    	  var dialogBtn2;
		    	  var blackFilter=$('<div class="zbox-popup-backdrop" style="display: block;"></div>');
		    	  if(caller=='Autofade'){
		    	  	 dislogContainer=$('<div class="zbox-toast-container"><div class="zbox-toast-message">'
		    	  	 +PARAMS.Content+'</div></div>');
		    	  	 $("body").append(dislogContainer);
		    	  	 setTimeout(function(){
		    	  		 $(".zbox-toast-container").addClass('zbox-active');
		    	  	},30)
		    	  	 setTimeout(function(){
		    	  	 	  $(".zbox-toast-container").remove();
		    	  	 },3000)
		    	  }else if(caller=='MenuChange'){				  
		    	  	dislogContainer=$('<div class="zbox-popup" style="display: block;"></div>'); 
		    	  	dialogInner=$('<div class="zbox-popup-buttons"><span class="zbox-popup-button" index="0" style="color:#007aff;font-size:12pt;border-radius:0px;">'+PARAMS.BtnImg+'</span></div>'+
					'<div class="zbox-popup-buttons" style="border-top: 1px solid #dddddd"><span class="zbox-popup-button" index="1" style="color:#007aff;font-size:12pt; border-radius:0px; ">'+PARAMS.BtnCamera+'</span></div>');
		    	  	dialogBtn=$('<div class="zbox-popup-buttons" style="border-top: 1px solid #dddddd"><span class="zbox-popup-button" index="2" style="font-weight: bold;font-size:12pt;">'+PARAMS.BtnCl+'</span></div>');
		    	  	dislogContainer.append(dialogInner);
		    	  	dislogContainer.append(dialogBtn);
		    	  	setTimeout(function(){
		    	  		 $(".zbox-popup").addClass('zbox-popup-in');
		    	  		 $(".zbox-popup-backdrop").addClass('zbox-active');
		    	  	},10)
		    	  	$("body").append(blackFilter);
		    	    $("body").append(dislogContainer); 
		    	    
		    	  	$(".zbox-popup-button").click(function(){
		    	  		//alert("123");
		    	  		 var indexs=$(this).attr('index');
		    	  		 if(indexs==0){
		    	  		 	if($.isFunction(PARAMS.FunImg)){
		    	  		 		    PARAMS.FunImg();
					    	}else{
					    			$.DialogByZ.Close(); 
					    	}
		    	  		 }else if(indexs==1){
		    	  		 	if($.isFunction(PARAMS.FunCamera)){
		    	  		 		    PARAMS.FunCamera();
					    	}else{
					    			$.DialogByZ.Close(); 
					    	}
		    	  		 }else{
		    	  		 	if($.isFunction(PARAMS.FunCl)){
		    	  		 		    PARAMS.FunCl();
					    	}else{
					    			$.DialogByZ.Close(); 
					    	}
		    	  		 }
		    	  		 return false;
		    	  	})
				  }else{
		    	  	dislogContainer=$('<div class="zbox-popup" style="display: block;"></div>');
		    	  	dialogInner=$('<div class="zbox-popup-inner"><div class="zbox-popup-title">'+PARAMS.Title+'</div><div class="zbox-popup-text">'+PARAMS.Content+'</div></div>');
		    	  	dialogBtn=$('<div class="zbox-popup-buttons"><span class="zbox-popup-button" index="0">'+PARAMS.BtnL+'</span></div>');
		    	  	if(caller=='Confirm'){
		    	  		dialogBtn="";
		    	  		dialogBtn=$('<div class="zbox-popup-buttons"><span class="zbox-popup-button" index="1">'+PARAMS.BtnR+'</span></div>')
		    	  		dialogBtn.append($('<span class="zbox-popup-button R" index="0">'+PARAMS.BtnL+'</span>'));
		    	  		if(PARAMS.BtnT!=null&&PARAMS.BtnT!=""&&PARAMS.BtnT!="noshow"){
		    	  			dialogBtn2=$('<div class="zbox-popup-buttons" style="border-top:0.1rem solid #ccc;"><span class="zbox-popup-button" index="2" style="color:#3dabff">'+PARAMS.BtnT+'</span></div>');
		    	  		}
		    	  	}
		    	  	dislogContainer.append(dialogInner);
		    	  	dislogContainer.append(dialogBtn);
		    	  	dislogContainer.append(dialogBtn2);
		    	  	setTimeout(function(){
		    	  		 $(".zbox-popup").addClass('zbox-popup-in');
		    	  		 $(".zbox-popup-backdrop").addClass('zbox-active');
		    	  	},10)
		    	  	$("body").append(blackFilter);
		    	    $("body").append(dislogContainer);
		    	    
		    	  	$(".zbox-popup-button").click(function(){
		    	  		//alert("123");
		    	  		 var indexs=$(this).attr('index');
		    	  		 if(indexs==0){
		    	  		 	//左侧按钮
		    	  		 	if($.isFunction(PARAMS.FunL)){
		    	  		 		    PARAMS.FunL();
					    	}else{
					    			$.DialogByZ.Close(); 
					    	}
		    	  		 }if(indexs==1){
		    	  		 	//右侧按钮 
		    	  		 	if($.isFunction(PARAMS.FunR)){
		    	  		 		    PARAMS.FunR();
					    	}else{
					    			$.DialogByZ.Close(); 
					    	}
		    	  		 }else{
		    	  		 	if($.isFunction(PARAMS.FunT)){
		    	  		 		    PARAMS.FunT();
					    	}else{
					    			$.DialogByZ.Close(); 
					    	}
		    	  		 }
		    	  		 return false;
		    	  	})
		    	  	 
		    	  }
		    	  //	  
		    }
		})(jQuery,window,document);