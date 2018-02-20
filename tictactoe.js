$(document).ready(function(){
  var t1 = 0;
  var t2 = 0;
  var t3 = 0;
  var t4 = 0;
  var t5 = 0;
  var t6 = 0;
  var t7 = 0;
  var t8 = 0;
  var t9 = 0;
  var pct1 = 0;
  var pct2 = 0;
  var pct3 = 0;
  var pct4 = 0;
  var pct5 = 0;
  var pct6 = 0;
  var pct7 = 0;
  var pct8 = 0;
  var pct9 = 0;
  var arrAll = [t1, t2, t3, t4, t5, t6, t7, t8, t9];
  var arrPcAll = [t1, t2, t3, t4, t5, t6, t7, t8, t9];
  var r1 = t1 + t2 + t3;
  var r2 = t4 + t5 + t6;
  var r3 = t7 + t8 + t9;
  var c1 = t1 + t4 + t7;
  var c2 = t2 + t5 + t8;
  var c3 = t3 + t6 + t9;
  var d1 = t1 + t5 + t9;
  var d2 = t3 + t5 + t7;
  var pcr1 = t1 + t2 + t3;
  var pcr2 = t4 + t5 + t6;
  var pcr3 = t7 + t8 + t9;
  var pcc1 = t1 + t4 + t7;
  var pcc2 = t2 + t5 + t8;
  var pcc3 = t3 + t6 + t9;
  var pcd1 = t1 + t5 + t9;
  var pcd2 = t3 + t5 + t7;
  var pcResult = [pcr1, pcr2, pcr3, pcc1, pcc2, pcc3, pcd1, pcd2];
  var pc = 0;
  var turn = 0;
  var pcSign = 0;
  var indexOfBestRes = 0;
  var bestRes = "";
  var minimaxLoop = [];
  var startingPlayer = 0;
  var player1 = 0;
  var player1wins = 0;
  var player2wins = 0;
  var depth = 0;
  var depthReversed = 0;
  var arrFree = [];
  var arrPcFree = [];
  var arrBestVal = [];
  var pcRand = 0;
  
  function pcStart() {
    if (startingPlayer % 2 === 0 && turn % 2 === 0 && pcSign == 2) {
        pcRand = Math.floor(Math.random() * 9) + 1;
        $("#t" + pcRand).text("O");
        eval("t" + pcRand + " = -1");
        eval("pct" + pcRand + " = -1");
        $("#t" + pcRand).removeClass("th");
        turn++;
    } else if (startingPlayer % 2 !== 0 && turn % 2 !== 0 && pcSign == 1) {
        pcRand = Math.floor(Math.random() * 9) + 1;
        $("#t" + pcRand).text("X");
        eval("t" + pcRand + " = 1");
        eval("pct" + pcRand + " = 1");
        $("#t" + pcRand).removeClass("th");
        turn++;
    };
    checkTurn();
  }
  
  function end(x) {
    if(startingPlayer % 2 !== 0 && turn % 2 !== 0) {
      turn++;
    } else if (startingPlayer % 2 === 0 && turn % 2 === 0) {
      turn++;
    }
    $("#alertwin").text(x);
    $("#alertwin").css("display", "block");
    startingPlayer++;
    console.log(startingPlayer);
  };
  
  $("#alertwin").click(function() {
    $("#alertwin").css("display", "none");
    $("#alertwin").text("Oh my god! It's a draw!");
    for (var i = 1; i < 10; i++) {
      $("#t" + i).removeClass("th");
      $("#t" + i).addClass("th");
      $("#t" + i).text("");
      $("#t" + i).css("background-color", "#000000");
    };
    t1 = 0;
    t2 = 0;
    t3 = 0;
    t4 = 0;
    t5 = 0;
    t6 = 0;
    t7 = 0;
    t8 = 0;
    t9 = 0;
    pct1 = 0;
    pct2 = 0;
    pct3 = 0;
    pct4 = 0;
    pct5 = 0;
    pct6 = 0;
    pct7 = 0;
    pct8 = 0;
    pct9 = 0;
    if (pc == 1) {
      pcStart();
    };
  });
  
  function recalc() {
    r1 = t1 + t2 + t3;
    r2 = t4 + t5 + t6;
    r3 = t7 + t8 + t9;
    c1 = t1 + t4 + t7;
    c2 = t2 + t5 + t8;
    c3 = t3 + t6 + t9;
    d1 = t1 + t5 + t9;
    d2 = t3 + t5 + t7;
    pcr1 = pct1 + pct2 + pct3;
    pcr2 = pct4 + pct5 + pct6;
    pcr3 = pct7 + pct8 + pct9;
    pcc1 = pct1 + pct4 + pct7;
    pcc2 = pct2 + pct5 + pct8;
    pcc3 = pct3 + pct6 + pct9;
    pcd1 = pct1 + pct5 + pct9;
    pcd2 = pct3 + pct5 + pct7;
    arrAll = [t1, t2, t3, t4, t5, t6, t7, t8, t9];
    arrPcAll = [pct1, pct2, pct3, pct4, pct5, pct6, pct7, pct8, pct9];
    pcResult = [pcr1, pcr2, pcr3, pcc1, pcc2, pcc3, pcd1, pcd2];
  };
  
  function checkTurn () {
    if (player1 == 1 && turn % 2 !== 0 || player1 == 2 && turn % 2 === 0) {
      $("#turnpl2").animate({ opacity: 0 });
      $("#turnpl1").animate({ opacity: 1 });
    } else {
      $("#turnpl1").animate({ opacity: 0 });
      $("#turnpl2").animate({ opacity: 1 });
    };
  };
  
  function checkwin() {
    recalc();
    if(r1 == 3 || r1 == -3) {
      $("#t1").css("background-color", "#222222");
      $("#t2").css("background-color", "#222222");
      $("#t3").css("background-color", "#222222");
    } else if (r2 == 3 || r2 == -3) {
      $("#t4").css("background-color", "#222222");
      $("#t5").css("background-color", "#222222");
      $("#t6").css("background-color", "#222222");
    } else if (r3 == 3 || r3 == -3) {
      $("#t7").css("background-color", "#222222");
      $("#t8").css("background-color", "#222222");
      $("#t9").css("background-color", "#222222");
    } else if (c1 == 3 || c1 == -3) {
      $("#t1").css("background-color", "#222222");
      $("#t4").css("background-color", "#222222");
      $("#t7").css("background-color", "#222222");
    } else if (c2 == 3 || c2 == -3) {
      $("#t2").css("background-color", "#222222");
      $("#t5").css("background-color", "#222222");
      $("#t8").css("background-color", "#222222");
    } else if (c3 == 3 || c3 == -3) {
      $("#t3").css("background-color", "#222222");
      $("#t6").css("background-color", "#222222");
      $("#t9").css("background-color", "#222222");
    } else if (d1 == 3 || d1 == -3) {
      $("#t1").css("background-color", "#222222");
      $("#t5").css("background-color", "#222222");
      $("#t9").css("background-color", "#222222");
    } else if (d2 == 3 || d2 == -3) {
      $("#t3").css("background-color", "#222222");
      $("#t5").css("background-color", "#222222");
      $("#t7").css("background-color", "#222222");
    }
    
    if(r1 == 3 || r2 == 3 || r3 == 3 || c1 == 3 || c2 == 3 || c3 == 3 || d1 == 3 || d2 == 3) {
      if (player1 == 1) {
        player1wins ++;
        end("Winner winner chicken dinner! Player 1 won!");
      } else {
        player2wins ++;
        end("Winner winner chicken dinner! Player 2 won!");
      };
    } else if (r1 == -3 || r2 == -3 || r3 == -3 || c1 == -3 || c2 == -3 || c3 == -3 || d1 == -3 || d2 == -3) {
      if (player1 == 2) {
        player1wins ++;
        end("Winner winner chicken dinner! Player 1 won!");
      } else {
        player2wins ++;
        end("Winner winner chicken dinner! Player 2 won!");
      };
    };
    if (t1*t2*t3*t4*t5*t6*t7*t8*t9 !== 0) {
      end();
    };
    $("#schet").text("Player 1: " + player1wins + " Player 2: " + player2wins);
  };
  
  $("#pc").click(function(){
    pc = 1;
    $(".selector").css("display", "none");
    $(".selectorxo").css("display", "block");
  });
  
  $("#human").click(function(){
    pc = 0;
    $(".selector").css("display", "none");
    $(".selectorxo").css("display", "block");
  });
  
  $("#x").click(function(){
    turn = 1;
    startingPlayer = 1;
    player1 = 1;
    $(".selectorxo").css("display", "none");
    $("#grid").css("display", "block");
  });
  
  $("#o").click(function(){
    turn = 2;
    startingPlayer = 2;
    player1 = 2;
    $(".selectorxo").css("display", "none");
    $("#grid").css("display", "block");
  });
  
  function addFree() {
    arrFree.length = 0;
    arrPcFree.length = 0;
    for (var i = 1; i < arrAll.length + 1; i++) {
      if (arrAll[i - 1] == 0) {
        arrFree.push("t" + i);
      };
    };
    for (var i = 1; i < arrPcAll.length + 1; i++) {
      if (arrPcAll[i - 1] == 0) {
        arrPcFree.push("pct" + i);
      };
    };
  };
  
  $("#t1, #t2, #t3, #t4, #t5, #t6, #t7, #t8, #t9").click(function(){
    if (eval(this.id) === 0) {
      $(this).removeClass("th");
      if (turn % 2 === 0) {
        $(this).text("O");
      eval(this.id  + "=" + "-1");
      eval("pc" + this.id  + "=" + "-1");
        turn ++;
        checkwin();
      } else {
      eval(this.id  + "=" + "1");
      eval("pc" + this.id  + "=" + "1");
        $(this).text("X");
        turn ++;
        checkwin();
      };
    
      function minimax(mtile, mdepth, max) {
        recalc();
        if (arrPcAll[mtile - 1] !== 0) {
          if (max) {
            return -100;
          } else {
            return 100;
          }
        };
        if (max) {
          eval("pct" + mtile + " = 1");
          recalc();
        } else {
          eval("pct" + mtile + " = -1");
          recalc();
        };
        if (pcr1 == 3 || pcr2 == 3 || pcr3 == 3 || pcc1 == 3 || pcc2 == 3 || pcc3 == 3 || pcd1 == 3 || pcd2 == 3) {
          eval("pct" + mtile + " = 0");
          return 10 + mdepth;
        } else if (pcr1 == -3 || pcr2 == -3 || pcr3 == -3 || pcc1 == -3 || pcc2 == -3 || pcc3 == -3 || pcd1 == -3 || pcd2 == -3) {
          eval("pct" + mtile + " = 0");
          return -10 - mdepth;
        };
        if (mdepth === 0) {
          eval("pct" + mtile + " = 0");
          return 0;
        };
        if (max) {
          var temp1 = [];
          for (var i = 1; i <= 9; i++) {
            temp1.push(minimax(i, mdepth - 1, false));
          };
          var temp = Math.min(10, ...temp1);
          eval("pct" + mtile + " = 0");
          return temp;
        } else {
          var temp1 = [];
          for (var i = 1; i <= 9; i++) {
            temp1.push(minimax(i, mdepth - 1, true));
          };
          var temp = Math.max(-10, ...temp1);
          eval("pct" + mtile + " = 0");
          return temp;
        };
      };

      if (pc == 1 && t1*t2*t3*t4*t5*t6*t7*t8*t9 == 0) {
        turn++;
        addFree();
        arrBestVal.length = 0;
        depth = arrPcFree.length;
        if (player1 == 1) {
          pcSign = 2;
          for (var i = 1; i <= 9; i++) {
            arrBestVal.push(minimax(i, depth - 1, false));
            if (arrAll[i - 1] !== 0) {
              arrBestVal[i - 1] = 1000;
            };
          };
          bestRes = "t" + (arrBestVal.indexOf(Math.min(...arrBestVal)) + 1);
          eval(bestRes  + "=" + "-1");
          eval("pc" + bestRes  + "=" + "-1");
          $("#" + bestRes).text("O");
          $("#" + bestRes).removeClass("th");
          checkwin();
        } else {
          pcSign = 1;
          for (var i = 1; i <= 9; i++) {
            arrBestVal.push(minimax(i, depth - 1, true));
            if (arrAll[i - 1] !== 0) {
              arrBestVal[i - 1] = -1000;
            };
          };
          bestRes = "t" + (arrBestVal.indexOf(Math.max(...arrBestVal)) + 1);
          eval(bestRes  + "=" + "1");
          eval("pc" + bestRes  + "=" + "1");
          $("#" + bestRes).text("X");
          $("#" + bestRes).removeClass("th");
          checkwin();
        };
      };
      checkTurn();
    };
  });
});
