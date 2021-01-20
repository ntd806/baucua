let startBtn, canvas, div_holder, scale, bg2;
// Config start
let start_1, start_2, start_3, start_4, start_5, start_6, start_7, start_8, start_9;
// Time setup
let time_setup = 0.0, time = 0.0, time_run = 0.0, count =0;

let spin = 0;
// check event
let is_click = true;
// player list of game
var bet = [], player = {};
var result = 0;
// Keep track of our socket connection
var socket;
var time_spin = 0.0;
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
   if(!soundsBegin.isPlaying()){
      soundsBegin.loop();
   }

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
   soundsBegin = loadSound("../audio/bgm.mp3");
 }

/**
 * Create new a game video
 */
function newGame() {
   // fixed frame rate
   frameRate(60);
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
   start_3.style("height", start_3_W + "px");
   start_4 = select("#start_4");
   let start_4_W = start_4.width*scale;
   let start_4_H = start_4.height*scale;
   start_4.style("width",  start_4_W + "px");
   start_4.style("height", start_4_W + "px");
   start_5 = select("#start_5");
   let start_5_W = start_5.width*scale;
   let start_5_H = start_5.height*scale;
   start_5.style("width",  start_5_W + "px");
   start_5.style("height", start_5_W + "px");
   start_6 = select("#start_6");
   let start_6_W = start_6.width*scale;
   let start_6_H = start_6.height*scale;
   start_6.style("width",  start_6_W + "px");
   start_6.style("height", start_6_W + "px");
   start_7 = select("#start_7");
   let start_7_W = start_7.width*scale;
   let start_7_H = start_7.height*scale;
   start_7.style("width",  start_7_W + "px");
   start_7.style("height", start_7_W + "px");
   start_8 = select("#start_8");
   let start_8_W = start_8.width*scale;
   let start_8_H = start_8.height*scale;
   start_8.style("width",  start_8_W + "px");
   start_8.style("height", start_8_W + "px");
   start_9 = select('#start_9');
   start_9.html(0);
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
  if(time_run >0){
    if(start.classList.contains('bg-white-color')){
      start.classList.remove('bg-white-color');
      start.classList.add("bg-chartreuse-color");
      var ordinal = start.getAttribute('att');
      bet = remove_index(bet, ordinal);
    } else {
      start.classList.remove("bg-chartreuse-color");
      start.classList.add("bg-white-color");
      var ordinal = start.getAttribute('att');
      bet.push(ordinal);
    }
  }
}

/**
 * Images spin
 */
function spinBonus(time){
    var a = document.getElementById("start_"+ (parseInt(time) % 8 + 1));
    a.classList.add("bg-spin-color");
    var b= document.getElementById("start_"+ ((parseInt(time) % 8) == 0 ? 8 : (parseInt(time) % 8)) );
    b.classList.remove("bg-spin-color");  
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
  //  time_spin = time_spin;
   time_run -= millis()/1000;
   if (time_run <= 0) {
    count+=1;
    await getResult(count);
    start_9.html("TIME IS UP");
    is_click = false;
    var time_stamp = millis();
    time_spin -= (millis()-time_stamp);
    if (time_spin > 0 || (time_spin <= 0 && document.getElementById("start_"+result).classList.contains('bg-spin-color'))) {
     spinBonus(-time_run*SPEED);

    }
  } else {start_9.html(time_run.toFixed(2));}


}

async function getResult(count){
  if(count == 1){
    time_spin =2;
    await $.ajax({
      url: "http://127.0.0.1:3001/user/end-game",
      method: "POST",
      dataType: "JSON",
      data: {
          user_id: 1,
          bet,
          type_bet: 1,
          stake: 10
      },
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