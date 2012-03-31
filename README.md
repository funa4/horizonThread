#Operating Environment
**server:**  node.js 0.6.13 / npm 1.1.9  
**database:**  mongodb(using mongolab in heroku addon)  
**framework:** express 2.5.18  
**template engine:** jade 0.21.0  
**main javascript library:** jquery mobile 1.0.1  
**database tool:** mongoose 2.5.11 

#What Can?
イベント等のスケジュール調整を行えるアプリケーションです。具体的には、候補日程の登録/参加者による予定入力が可能です。  
This is web application for schedule adjust. You can register candidate schedule and participants can input there's schedules.

#Twist on View
スケジュール日程をロードするのに、jQueryのloadを使用しています。  
using jquery load function to load schedules.  

on server side  

     res.render('hp_scheduleList', { layout:false,saObj:obj});

'hp\_schedulelist'はビューヘルパー的なものです(そのため、レイアウトを適用しないようにlayout:falseを入れてます)。これでスケジュールのリスト部分のみレンダリングし、クライアント側でこのレンダリングしたものをloadでを読み込んでます。  
'hp\_schedulelist' is used like view helper( so layout:false ) . it render part of schedule list only.on client side , loading it's renderd list.

    $("#pnlScheduleList").load("/reloadList",{"said":$("#parentId").val()},
	 function(){
	 	//set mobile style
	 	$("#pnlScheduleList").find("a[data-role=button]").button();	 	
	 	$("#pnlScheduleList").find("div[data-role=collapsible]").collapsible({refresh:true});	
	 	
	 	}
	 }
	);
jQuery mobileは残念なことに動的に追加された要素のスタイリングがされないようなので、わざわざロードした要素に応じてリフレッシュをかけてやる必要があります。。。  
don't forget ... jquery mobile can't styling dynamic renderd elements. so I have to refresh elements.

