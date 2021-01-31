// sound effect
let soundsBegin, soundsLightning;
// Config canvas
let startBtn, canvas, div_holder, scale, bg2;
// Config start
let start_1, start_2, start_3, start_4, start_5, start_6, start_7, start_8, start_9;
let imgCenter;
// Time setup
let time_setup = 0.0, time = 0.0, time_run = 0.0, time_spin=0.0;

let spin = 0;
// check event
let is_click = true;
// player list of game
var bet = [], player = {};
var stake =5;
var count = 0;
var index=0;
var reload =0;
var result;
// Keep track of our socket connection
//var socket;
function setup() {
   newGame();
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  // socket = io.connect();
  // // We make a named event called 'mouse' and write an
  // // anonymous callback function
  // socket.on('bet',
  //   // When we receive data
  //   function(data) {
  //     console.log("Got: " + data);
  //   }
  // );
}

function draw() {
   // run sound
   // if(!soundsBegin.isPlaying()){
   //    soundsBegin.loop();
   // }

   if(millis() > START_WAITING_TIME){
     wellcome();
   }

   run_time();
}

/**
 * Load the sound
 */
function preload() {
   // define sounds
   //soundsBegin = loadSound("../audio/bgm.mp3");
   //soundsLightning   = loadSound("../audio/lightning.mp3");
 }

/**
 * Create new a game video
 */
function newGame() {
   // fixed frame rate
   frameRate(60);
   if(document.getElementById("info")){
    player = document.getElementById("info").value;
   }
   
   // define canvas
   canvas = select("#game2");
   // Set scale for screen
   scale = canvas.width/CANVAS_HEIGHT;
   // define div holder
   div_holder = select("#holder");
   // Set background 
   bg2 = select("#bg2");
   var bg2_width = bg2.width*scale;
   var bg2_height = bg2.height*scale;
   bg2.style("width",  bg2_width + "px");
   bg2.style("height", bg2_height + "px");
   // Set start
   start_1 = select("#start_1");
   let start_1_W = start_1.width*scale;
   let start_1_H = start_1.height*scale;
   start_1.style("width",  start_1_W + "px");
   start_1.style("height", start_1_H + "px");
   start_2 = select("#start_2");
   let start_2_W = start_2.width*scale;
   let start_2_H = start_2.height*scale;
   start_2.style("width",  start_2_W + "px");
   start_2.style("height", start_2_H + "px");
   start_3 = select("#start_3");
   let start_3_W = start_3.width*scale;
   let start_3_H = start_3.height*scale;
   start_3.style("width",  start_3_W + "px");
   start_3.style("height", start_3_H + "px");
   start_4 = select("#start_4");
   let start_4_W = start_4.width*scale;
   let start_4_H = start_4.height*scale;
   start_4.style("width",  start_4_W + "px");
   start_4.style("height", start_4_H + "px");
   start_5 = select("#start_5");
   let start_5_W = start_5.width*scale;
   let start_5_H = start_5.height*scale;
   start_5.style("width",  start_5_W + "px");
   start_5.style("height", start_5_H + "px");
   start_6 = select("#start_6");
   let start_6_W = start_6.width*scale;
   let start_6_H = start_6.height*scale;
   start_6.style("width",  start_6_W + "px");
   start_6.style("height", start_6_H + "px");
   start_7 = select("#start_7");
   let start_7_W = start_7.width*scale;
   let start_7_H = start_7.height*scale;
   start_7.style("width",  start_7_W + "px");
   start_7.style("height", start_7_H + "px");
   start_8 = select("#start_8");
   let start_8_W = start_8.width*scale;
   let start_8_H = start_8.height*scale;
   start_8.style("width",  start_8_W + "px");
   start_8.style("height", start_8_H + "px");
   imgCenter = select("#img-center");
  //  let center_W = imgCenter.width*scale;
  //  let center_H = imgCenter.height*scale;
  //  imgCenter.style("width",  center_W + "px");
  //  imgCenter.style("height", center_H + "px");
   start_9 = select('#start_9');
   start_9.html(0);
   stake_1 = select("#stake_1");
   let stake_1_W = stake_1.width*scale;
   let stake_1_H = stake_1.height*scale;
  //  stake_1.style("width",  stake_1_W + "px");
  //  stake_1.style("height", stake_1_H + "px");

   stake_2 = select("#stake_2");
   let stake_2_W = stake_2.width*scale;
   let stake_2_H = stake_2.height*scale;
  //  stake_2.style("width",  stake_2_W + "px");
  //  stake_2.style("height", stake_2_H + "px");


   stake_3 = select("#stake_3");
   let stake_3_W = stake_3.width*scale;
   let stake_3_H = stake_3.height*scale;
  //  stake_3.style("width",  stake_3_W + "px");
  //  stake_3.style("height", stake_3_H + "px");

   stake_4 = select("#stake_4");
   let stake_4_W = stake_4.width*scale;
   let stake_4_H = stake_4.height*scale;
  //  stake_4.style("width",  stake_4_W + "px");
  //  stake_4.style("height", stake_4_H + "px");

   result_1 = select("#result_1");
   let result_1_W = result_1.width*scale;
   let result_1_H = result_1.height*scale;
  //  result_1.style("width",  result_1_W + "px");
  //  result_1.style("height", result_1_H + "px");

   result_2 = select("#result_2");
   let result_2_W = result_2.width*scale;
   let result_2_H = result_2.height*scale;
  //  result_2.style("width",  result_2_W + "px");
  //  result_2.style("height", result_2_H + "px");
   
   result_3 = select("#result_3");
   let result_3_W = result_3.width*scale;
   let result_3_H = result_3.height*scale;
  //  result_3.style("width",  result_3_W + "px");
  //  result_3.style("height", result_3_H + "px");

   result_4 = select("#result_4");
   let result_4_W = result_4.width*scale;
   let result_4_H = result_4.height*scale;
  //  result_4.style("width",  result_4_W + "px");
  //  result_4.style("height", result_4_H + "px");

   result_5 = select("#result_5");
   let result_5_W = result_5.width*scale;
   let result_5_H = result_5.height*scale;
  //  result_5.style("width",  result_5_W + "px");
  //  result_5.style("height", result_5_H + "px");

   result_6 = select("#result_6");
   let result_6_W = result_6.width*scale;
   let result_6_H = result_6.height*scale;
  //  result_6.style("width",  result_6_W + "px");
  //  result_6.style("height", result_6_H + "px");

   result_8 = select("#result_8");
   let result_8_W = result_8.width*scale;
   let result_8_H = result_8.height*scale;
  //  result_8.style("width",  result_8_W + "px");
  //  result_8.style("height", result_8_H + "px");

   result_7 = select("#result_7");
   let result_7_W = result_7.width*scale;
   let result_7_H = result_7.height*scale;
  //  result_7.style("width",  result_7_W + "px");
  //  result_7.style("height", result_7_H + "px");
   var loaddingScreen = select("#loadding");
   loaddingScreen.remove();
}
// this function fires when initial running game
function wellcome(){
}
// this function fires with any click anywhere
function mousePressed() {
}


function BtnClicked(start) {
  // soundsLightning.play();
  var lightning = document.getElementById('light');
  // var para = document.createElement("span");
  if(time_run > 0){
    lightning.classList.add("blink-one");
   lightning.style.display = "block";
   setTimeout(()=>{ 
    lightning.style.display = "none"; 
    add_image(start);
   }, 2000);
  }
}

/**
 * Images spin
 */
async function spinBonus(time){
    var a = document.getElementById("start_"+ (parseInt(time) % 8 + 1));
    await a.classList.add("bg-spin");
    var b= document.getElementById("start_"+ ((parseInt(time) % 8) == 0 ? 8 : (parseInt(time) % 8)) );
    await b.classList.remove("bg-spin");  
}

/**
 * Random bonus
 */
function random(){
  var number = Math.floor(Math.random() * 8) + 1;
  var start = select('#start_'+ number);
  start.addClass('bg-spin-color');
}

/**
*/
async function run_time() {
   time_run = TIME_DICE;
   time_run -= millis()/1000;
  //  spinBonus(time_run*SPEED);
   if (time_run <= 0) {
    count+=1;

    await getResult(count);
    start_9.html("TIME'S UP");
    is_click = false;
    var time_stamp = millis();
    time_spin -= (millis()-time_stamp);
    if(-time_spin >1){
      reload++;
      if(reload ==1){
        console.log(1);
        location.reload();
      }
      
    }
    console.log(result);
    if (time_spin > 0 || (time_spin <= 0 && !document.getElementById("start_"+result).classList.contains('bg-spin'))) {
      await spinBonus(-time_run*SPEED);
    }
    else{
      index++;
      if(index = 1){
        var a = document.getElementById("oval_2");
        if(bet.indexOf(result)==-1){
          a.innerHTML= `You lose`;
        }else{
          a.innerHTML = `You win`;
        }
      }
    }

  } else {start_9.html(time_run.toFixed(2));}


}

function result() {
  var number = Math.floor(Math.random() * 8) + 1;
  if (find_index(bet, number)) return 1;
  else return 0;
}

function remove_index(list, number) {
  const index = list.indexOf(number);
  if (index > -1) {
    list.splice(index, 1);
  }

  return list;
}

function find_index(list, index) {
  const isNumber = (element) => element == index;
  const is_check = list.findIndex(isNumber);

  return is_check;
}


function add_image(start) {
  var ordinal = start.getAttribute('att');
    if(bet.indexOf(ordinal)==-1){
      bet.push(ordinal);
      // start.classList.add("ring");
      //lấy hình của start
      var image = start.getElementsByTagName('img')[0].src;
      //lấy ô cuối chưa có hình
      var a = document.getElementById("result_"+(bet.length));
      a.innerHTML= `<img src="`+image+`" class="result-image">`;
      //truyền hình vào a 
      // tạm thời chưa có lên truyền class ring
      // a.classList.add("ring")
    }else {
      
      // start.classList.remove("ring");
      //lấy vị trí đã đặt
      var a = document.getElementById("result_"+(bet.indexOf(ordinal)+1));
      //xóa image ( chưa có tạm thời xóa ring)
      a.innerHTML= ``;
      // a.classList.remove("ring");
      // di chuyển các image sau dồn lên (tạm thời di chuyển class ring)
      for(i= bet.indexOf(ordinal); i < bet.length -1;i++ ){
        
        //lấy image của i+1
        var img = document.getElementById("result_"+(i+2)).getElementsByTagName('img')[0].src;
        //truyền image đó vào i
        var b = document.getElementById("result_"+(i+1));
        b.innerHTML = `<img src="`+img+`" class="result-image">`;
        // b.classList.add("ring");
      }
      //xóa hình ảnh ở cuối
      var b = document.getElementById("result_"+(bet.length));
      b.innerHTML='';
      // b.classList.remove("ring");
      bet = remove_index(bet, ordinal);
    }
}

  
function StakeClicked(start){
  if(time_run > 0){
    for(i=1;i<=4;i++){
      var a = document.getElementById("stake_"+i);
      a.classList.remove("ring");
    }
    start.classList.add("ring");
    stake = start.getAttribute('att');
  }
}

// data em truyền gọi api 
//khi click nó truyền con đặt vào bet

async function getResult(count){

  
  if(count == 1){
    console.log(bet);
    time_spin =1;
    await $.ajax({
      url: "http://localhost:3002/user/end-game",
      method: "POST",
      dataType: "JSON",
      data: {user_id: player,
      bet: bet.toString(),
      type_bet: 1,
      stake
    },
      // dạ anh
      // giờ em muốn truyền mảng bet vô và có thể gọi đc chứ nó truyền là bet[] gọi không được
      success: function(res) {
        if(res.success){
           result = res.result;
        }else{
          swal.fire("", res.message, "error");
        }
      },
      error: function(res) {
          if (res.responseJSON != undefined) {
              var mess_error = '';
              $.map(res.responseJSON.errors, function(a) {
                  mess_error = mess_error.concat(a + '<br/>');
              });
              swal.fire("", mess_error, "error");
          }
      }
  });

  }
}
