var notification = cordova.require("cordova/plugin/localNotification");

$(document).on("pagecreate","#pageone",function(){
  $("#time").on("tap",function(){
      var time =  document.getElementById("time").value;
      var result = calculateTime(time) ; 
      var date = moment().add(result, "seconds")._d;
      putResult(date);
  });                 
 $('#points').next().children('a').bind('taphold', function() {
    console.log("bind");
    $('#points').bind("change", function(event, ui) {
        var time =  document.getElementById("time").value;
        var result = calculateTime(time) ; 
        var date = moment().add(result, "seconds")._d;
        putResult(date);
    });
});
});

          

          document.addEventListener('deviceready', onDeviceReady, false);

          function onDeviceReady() {
            var id = 0;
            var name = document.getElementById("name");
            // nofity later
            var btn_later = document.getElementById("notify-later");

            btn_later.addEventListener("click", function() {
              id++;
            
            var time =  document.getElementById("time").value;
            var result = calculateTime(time); 
            var date = moment().add(result, "seconds")._d;
         
              notification.add({
                id: id,
                date: date,
                message: name
                subtitle: "Subtitle is here",
                ticker: "This is a sample ticker text",
                repeatDaily: false
              });

              //putResult(date);
              window.location.href = 'index.html';

            });
          }

          function calculateTime(time) {

               var now     = new Date();
               var hour    = now.getHours();
               var minute  = now.getMinutes();

               var times = time.split(":");
               var newhour  = parseInt(times[0]);
               var newminutes  = parseInt(times[1]);

               if(newminutes < minute) {
               newhour = newhour - 1;
               newminutes = newminutes+60;
               }

               var addmintues = newminutes - minute;

               if(newhour < hour){
                newhour = newhour+24;
               }

               var addhour = newhour-hour;
         
               var snooze = document.getElementById("points").value;
               var addsnooze = parseInt(snooze);
              
               var result = addhour*60*60+addmintues*60+addsnooze*60;
               
          
               return result;
          }

          function putResult(date) {

            var hour    = parseInt(date.getHours());
            var minute  = parseInt(date.getMinutes());

            var ap = "AM";

            if (hour > 12) {
              var ap = "PM";
              hour = hour - 12;
            }

            if(hour < 10) {
              var hourstr = "0" + hour.toString();
            } else {
             var hourstr = hour.toString();
            }

            if(minute < 10) {
             var minutestr = "0" + minute.toString();
            } else {
             var minutestr = minute.toString();
            }

            var alarm1 = hourstr.concat(":", minutestr, ":00 ", ap);

            document.getElementById("result").innerText = "Alarm ends at:(min):      " + alarm1;
          }