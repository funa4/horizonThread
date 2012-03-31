##First of all
アプリケーションの動作環境、作成時に工夫した点をまとめています。イイね・ダメだね、な点があればご連絡お願いします。  
writing application's operating environment and some twists in this application. if you found out 
some good / bad point , please infome me.

##Operating Environment
**server:**  node.js 0.6.13 / npm 1.1.9  
**database:**  mongodb(using mongolab in heroku addon)  
**framework:** express 2.5.18  
**template engine:** jade 0.21.0  
**main javascript library:** jquery mobile 1.0.1  
**database tool:** mongoose 2.5.11 

##What Can?
イベント等のスケジュール調整を行えるアプリケーションです。具体的には、候補日程の登録/参加者による予定入力が可能です。  
This is web application for schedule adjust. You can register candidate schedule and participants can input there's schedules.

##Twist on View
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
jQuery mobileは残念なことに動的に追加された要素のスタイリングがされないようなので、
わざわざロードした要素に応じてリフレッシュをかけてやる必要があります。。。
don't forget ... jquery mobile can't styling dynamic renderd elements. so I have to refresh elements that loaded.

##Twist on Control
各ルーティングとその処理をapp.js一本に書いているとかなり長いコードになるので、これをindex.jsへ分割しています。  
write routing rule and it's logic to app.js , the code is very long ... so devide code to index.js.  

##Twist on Model
mongooseの接続関数(connect)を少し拡張して、接続しやすくしました。  
I extended mongoose's connect function for my utility.  

    mongoose.connectDB = function(){
      console.log("db connect state "+ this.connections[0].readyState + " uri is" + db_uri);
      //refer about mongoose connecting state http://mongoosejs.com/docs/api.html
      if(this.connections[0].readyState == 1 || this.connections[0].readyState == 2){//connecting now
        console.log("connecting is alive. ");
      }else{
        this.connect(db_uri,function(err){
          if(err) console.log("db connection error on " + db_uri ); throw err;
        })
      }
    }

それと、mongooseの使用に当たってはスキーマを定義する必要がありますが、またもこれをapp.jsに書いていると長くなるので分割しています。
mongooseは_db.model("schemaname",schemaObj)_で登録したモデルを_db.model("schema")_で呼び出せるので、分割は以下の感じで行っています。  
writing mongoose's schema define in app.js , code is too long ... so I devide it too.  

_schema define_

    exports.registerSchema = function(mongoose_obj){
     var Schema = mg_connected.Schema,ObjectId = Schema.ObjectId;
     var User = new Schema({
      name:String,
      email:String	
     })
     mongoose_obj.model("User",User)
    }

_when using_

    mongoose = require('mongoose');
    var schema = require('(path to schema define file)');
    schema.registerSchema(mongoose);
	var User = mongoose.model("User")

