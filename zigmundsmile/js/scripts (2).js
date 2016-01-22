//  by Unbat / Igor Nedosekov / unbat@unbat.ru / 2016





// jquery
$(window).ready(function () {
	$("#screen1 .screenZoom").addClass("appearedScreen");
});


$(window).load(function () {

	// Placeholder
	var placeHolder = 0;
	$("form").on("focus", ".placeholder", function(){
		placeHolder = $(this).attr("placeholder");
		$(this).attr({"placeholder" : ""});
	});
	$("form").on("focusout", ".placeholder", function(){
		$(this).attr({"placeholder" : placeHolder});
	});


	// Расписание
	// выравнивание высоты
	var sheduleItemHeight = Math.max.apply(null, $(".sheduleContent").map(function () {
		return $(this).height();
	}).get());
	$(".sheduleContent").height(sheduleItemHeight);
	// HOVER
	$(".sheduleItem").hover(
		function(){$(".sheduleClick",this).addClass("active")},
		function(){$(".sheduleClick",this).removeClass("active")}
	);



	// Заявка на услугу
	// синхронизация
	function sinc(elem){
		var elemId = $(elem).attr("sinc");
		if($(elem).hasClass("active") && elemId != "yes" && elemId != "no"){
			$("[sinc='" + elemId + "']").removeClass("active").prop("checked", false);
			if($(elem).hasClass("chk")){
				$(".vibrano", elem).fadeOut(200);
				$(".vibrat", elem).delay(300).fadeIn(200);
			}
		}
		else{
			$("[sinc='" + elemId + "']").addClass("active").prop("checked", true);
			if($(elem).hasClass("chk")){
				$(".vibrat", elem).fadeOut(200);
				$(".vibrano", elem).delay(300).fadeIn(200);
			}
		}

		var yesNoSlide = $("#yesNoSlide");

		yesNoSlide.is(':hidden') && yesNoSlide.height(0);
		yesNoSlide.show();

		$("[sinc]").each(function(){
			if ($(this).attr("sinc") != "yes" && $(this).attr("sinc") != "no"){
				$(this).removeClass("active").prop("checked", false);
			}
		});

		$("#screen5 .content").css('border-color', 'transparent');

		setTimeout(function () {
			yesNoSlide.height(yesNoSlide[0].scrollHeight);
		}, 1000);


		$("#screen5").css('padding', '0');
		$("#screen5 .content").css('margin', '0 auto');

		if(elemId == "yes"){
			$("[sinc='yes']").prop("checked", true).val("Есть база").addClass("active");
			$("[sinc='no']").removeClass("active");

			$("#blockYes").show();
			$("#blockNo").hide();

		}
		if(elemId == "no"){
			$("[sinc='yes']").prop("checked", true).val("Нет базы").addClass("active");
			$("[sinc='yes']").removeClass("active");

			$("#blockNo").show();
			$("#blockYes").hide();
		}
	}
	$(".popupFrameMore").click(function(){
		var brendColor = $(this).attr("data-color");
		$("#grayFrame").fadeIn(300);
		$("body").addClass("fixed");
		$("html").css({marginRight:"17px"});
		$.ajax({
			url: $(this).attr("data-frame"),
			cache: false,
			success: function(html){
				$("#frameContent").html(html);
				$(".brendColor").css({backgroundColor : brendColor});
				$("#grayFrame [sinc]").each(function(){
					if($("#screen5 [sinc='" + $(this).attr("sinc") + "']").hasClass("active")){
						$(this).addClass("active");
						$(".vibrat", this).css({display:"none"});
						$(".vibrano", this).css({display:"inline-block"});
					}
				});
			}
		});
	});

	$("body").on("click", "[sinc]", function(){
		sinc(this);
	});




	// форма фрейма
	$("#frameContent").on("change", "input[type='text']", function() {
    $("#mainForm " + $(this).attr("data-target")).val($(this).val());
	});
	$("#frameContent").on("submit", ".frameForm", function(a){
		$(".req", this).each(function() {
			if($(this).val() === ""){
				$(this).addClass("inputError");
				a.preventDefault();
			}
			else{
				$(this).removeClass("inputError");
			}
		});
		if($(".inputError").size() == 0) {
			$("input[type=submit]", this).attr("disabled", true).attr("value", "отправлено!");
			$("#mainForm input[type=submit]").attr("disabled", true).attr("value", "отправлено!");
			a.preventDefault();
			$("#mainForm").trigger("submit");
			closeFrame();
		}
	});
//*/



	// Портфолио

	// выравнивание высоты
	var portfTextHeight = Math.max.apply(null, $(".portfText").map(function (){return $(this).height();}).get());
	$(".portfText").height(portfTextHeight);

	// More
	$("#more6Button").click(function(){
		var more = $('#more6');

			more.show();
			more.height(more[0].scrollHeight);

		$(this).fadeOut();
		//$(this).text("еще 20 проектов");
	});

	// Ч/Б картинка
	$(".portfItem").hover(
		function(){
			$(".portfPhoto", this).css('background-color', $(this).attr("data-color"));
		},
		function(){
			$(".portfPhoto", this).css('background-color', '');
		}
	);






	// ОБРАБОТКА КНОПОК
	$("body").on("click", ".click, .popupShow", function(){
		if($(this).attr("data-href")){window.open($(this).attr("data-href"))}
		if($(this).attr("data-frame")){$($(this).attr("data-target") + " iframe").attr("src", $(this).attr("data-frame"))}

	});




	// ПРОВЕРКА ФОРМ
	$("form:not(.frameForm)").each(function(){
		$("form").submit(function(a){
			$(".req", this).each(function() {
				if($(this).val() === ""){
					$(this).addClass("inputError");
					a.preventDefault();
				}
				else{
					$(this).removeClass("inputError");
				}
			});
			if($(".inputError").size() == 0 && $(this).is("#mainForm")) {
				$("input[type=submit]", this).attr("disabled", true).attr("value", "отправлено!");
			}
		});
	});



	// MENU
	var menuStatus = 0;
	$("#buterbrod").click(function(){
		if(menuStatus == 0){
			$("#menu ul").slideDown(300);
			menuStatus = 1;
		}
		else{
			$("#menu ul").slideUp(300);
			menuStatus =0;
		}
	});


	// ПРОКРУТКА
	$(".scroll").click(function(){
		$("html, body").animate({
			'scrollTop': $($(this).attr("data-target")).offset().top
		}, 1000);
	});





	// ПОПАПЫ
	// дополнительная информация в битрикс
	$(".popupDopInfo").click(function(){
		$("#bxHidden").val($(this).attr("data-info"));
	});
	// выравнивание по центру экрана
	$(".popup").each(function(){
		$(this).css({
			marginLeft: -$(this).innerWidth()*0.5,
			marginTop: -$(this).innerHeight()*0.5
		});
	});
	//закрытие
	$("#gray, #closePopup").click(function(){
		$(".popup").fadeOut(300);
		$("#gray").fadeOut(300);
	});
	//открытие
	$(".popupShow").click(function(){
		$("#gray").fadeIn(300);
		$($(this).attr("data-target")).fadeIn(300);
		$($(this).attr("data-target") + " input").not("input[type=submit], #bxHidden").val("");
	});

	//фрейм
	function closeFrame(){
		$("#grayFrame").fadeOut(300, function(){
			$("body").removeClass("fixed");
			$("html").css({marginRight:"0"});
			$("#frameContent").html("");
		});
	}
	$("#closeFrame, #closeRight").click(function(){
		closeFrame();
		window.location.hash = "_";

	});
	$(".popupFrame").click(function(){
		var brendColor = $(this).attr("data-color");
		$("#grayFrame").fadeIn(300);
		$("body").addClass("fixed");
		$("html").css({marginRight:"17px"});
		if($("body").attr("id")=="portfolioPage"){
			window.location.hash = $(this).attr("data-frame").split("/")[0];
		}
		else{window.location.hash = $(this).attr("data-frame").split("/")[1];}
	//	window.location.hash = $(this).attr("data-frame").split("/")[1];

		$.ajax({
			url: $(this).attr("data-frame"),
			cache: false,
			success: function(html){
				$("#frameContent").html(html);
				$(".brendColor").css({backgroundColor : brendColor});
			}
		});
	});
	// проверка ссылки на портфолио
	var locationHash = window.location.hash;
	if(locationHash != "#_" & locationHash != "" & locationHash.indexOf("screen")==-1){
		var brendColor = $("[data-frame='portfolio/" + locationHash.split("#")[1] + "/index.html']").attr("data-color");
		$("#grayFrame").fadeIn(300);
		$("body").addClass("fixed");
		$("html").css({marginRight:"17px"});
		//window.location.hash = $(this).attr("data-frame").split("/")[1];
		if($("body").attr("id")=="portfolioPage"){
			var pageUrl = locationHash.slice(1) + "/index.html";
			var brendColor = $("[data-frame='" + locationHash.slice(1) + "/index.html']").attr("data-color")
		}
		else{var pageUrl = "portfolio/" + locationHash.slice(1) + "/index.html"}
		$.ajax({
			url: pageUrl,
			cache: false,
			success: function(html){
				$("#frameContent").html(html);
				$(".brendColor").css({backgroundColor : brendColor});
			}
		});



	}
	//кнопка в портфолио
	if($("body").attr("id")=="portfolioPage"){
		$(".order").css({display:"none"});
	}
	$("#frameContent").on("click", ".order", function(){
		closeFrame();
		if($("body").attr("id")=="portfolioPage"){window.location.replace("http://zigmundsmile.ru/#screen5")}
		else{
			$("html, body").delay(300).animate({
				'scrollTop': $("#screen5").offset().top
			}, 1000);
		}
	});


	/////////////////////////BX24/////////////////////////
	$(document).on("submit", "#bxForm", function(event){
	  if($("#bxForm .inputError").size() == 0) {
			$.ajax({
				url: '//zigmundsmile.ru/bx24/index.php',
				dataType: 'json',
				data: $(this).serialize(),
				type: "POST",
				success: function () {
					console.log($(this).serialize());
				}
			});
			$(".popup").delay(300).fadeOut(300);
			$("#gray").delay(300).fadeOut(300);
		}

	});
	//////////////////////////////////////////////////////



	// ЗУМ ФОНОВ
	$(".screen").on('inview', function(event, visible) {
    if(visible){$(".screenZoom", this).addClass("appearedScreen")}
		else{$(".screenZoom", this).removeClass("appearedScreen")}
  });

	//АНИМАЦИЯ
	var $fadeIn = $(".animFadeIn");
	var $fadeInUp = $(".animFadeInUp");
	var $fadeInLeft = $(".animFadeInLeft");
	var $fadeInRight = $(".animFadeInRight");
	var $bounce = $("#zigmundWords");


	$fadeIn.on('inview', function(event, visible) {
		if(visible){$(this).addClass("animated fadeIn")}
	});
	$fadeInUp.on('inview', function(event, visible) {
		if(visible){$(this).addClass("animated fadeInUp")}
	});
	$fadeInLeft.on('inview', function(event, visible) {
		if(visible){$(this).addClass("animated fadeInLeft")}
	});
	$fadeInRight.on('inview', function(event, visible) {
		if(visible){$(this).addClass("animated fadeInRight")}
	});

	$bounce.addClass("animated bounce");
	setInterval(function(){
		$bounce.removeClass("animated bounce");
		setTimeout(function(){
			$bounce.addClass("animated bounce");
		}, 500);
	},4500);


	if($("body").attr("id")!="portfolioPage"){
		var logoTransform =  + $(window).height()/2 - $("#topLogo").height();
		$("#topLogo").css({transform:"translateY("+logoTransform+"px)"});
		function firstScreenAnim(){
			$("#topLogo").animate({
				opacity:1
			},2000).animate({
				transform:"translateY(0)"
			},2000);
			$(".topAnim").each(function(){
				$(this).delay(500*($(this).index(".topAnim"))+4000).animate({
					opacity:1
				},500);
			});
			setTimeout(function(){
				$("#arrowDown").css({opacity:1}).addClass("arrowDown");
				$("#menu").animate({opacity:1},600);
			},500*($(".topAnim").size()+1)+4000)
		}
		firstScreenAnim();
	}

	$("#screen1").on('inview', function(event, visible) {
		if(visible){}
		else{$("#menu").animate({opacity:1},600)}
	});
	if($(window).scrollTop()>$("#screen1").height()){
		$("#menu").animate({opacity:1},600)
	}

	$("#teamScreen").on('inview', function(event, visible) {
		if(visible){
			$(".member").each(function(){
				$(this).delay(200*($(this).index(".member"))+500).animate({
					opacity:1
				},200);
			});
		}
	});

	$("#screen7").on('inview', function(event, visible) {
		if(visible){
			$(".sheduleItem").each(function(){
				$(this).delay(500*($(this).index(".sheduleItem"))+500).animate({
					opacity:1
				},500);
			});
		}
	});

	$("#screen2").on('inview', function(event, visible) {
		if(visible){
			$("#screen2 .iconBlock").each(function(){
				$(this).delay(200*($(this).index("#screen2 .iconBlock"))+500).animate({
					opacity:1
				},200);
			});
		}
	});

/*	$("#screen4").on('inview', function(event, visible) {
		if(visible){
			$(".portfItem").each(function(){
				$(this).delay(400*($(this).index(".portfItem"))+500).animate({
					opacity:1
				},400);
			});
		}
	});*/



	// ЦЕЛИ
	// отправка заявки
	function requestSendFunc(){
		yaCounter35740270.reachGoal("requestSend");
		ga('send', 'event', 'request', 'send');
	}

	$("#votar").on("load", function(){
		requestSendFunc()
	});


	// социальные кнопки
	$("#socialVK").click(function(){
		yaCounter35740270.reachGoal("socialVK");
		ga('send', 'event', 'social', 'VK');
	});
	$("#socialFB").click(function(){
		yaCounter35740270.reachGoal("socialFB");
		ga('send', 'event', 'social', 'FB');
	});
	$("#socialPN").click(function(){
		yaCounter35740270.reachGoal("socialPN");
		ga('send', 'event', 'social', 'PN');
	});
	$("#socialIN").click(function(){
		yaCounter35740270.reachGoal("socialIN");
		ga('send', 'event', 'social', 'IN');
	});


	// обучение
	$(".educationClick").click(function(){
		yaCounter35740270.reachGoal("educationClick");
		ga('send', 'event', 'education', 'click');
	});

	// портфолио
	$("#more6Button").click(function(){
		yaCounter35740270.reachGoal("wantMore");
		ga('send', 'event', 'want', 'more');
	});

	// события
	$(".event1").click(function(){
		yaCounter35740270.reachGoal("event1Click");
		ga('send', 'event', 'event', 'ev1');
	});
	$(".event2").click(function(){
		yaCounter35740270.reachGoal("event2Click");
		ga('send', 'event', 'event', 'ev2');
	});







});






