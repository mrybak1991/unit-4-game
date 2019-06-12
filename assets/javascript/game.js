$(document).ready(function () {
      var boxerHp = {
              "anthonyJoshua": 125,
              "tysonFury": 110,
              "deontayWilder": 100,
              "andyRuiz": 150
            };
            
      var punchPower = {
              "anthonyJoshua": 10,
              "tysonFury": 5,
              "deontayWilder": 25,
              "andyRuiz": 35
            };
            
      var boxerNames = {
              "anthonyJoshua": 'Anthony Joshua',
              "tysonFury": 'Tyson Fury',
              "deontayWilder": 'Deontay Wilder',
              "andyRuiz": 'Andy Ruiz'
            };
      var boxerImages = {
              "anthonyJoshua": 'assets/css/images/anthonyJoshua.jpg',
              "tysonFury": 'assets/css/images/tysonFury.jpg',
              "deontayWilder": 'assets/css/images/deontayWilder.jpeg',
              "andyRuiz": 'assets/css/images/andyRuiz.jpeg'
            };
      var challengerHp;
      var challengerName;
      var challengerImage;
      var defCheck = 0;
    // select intial boxer
      function boxer(boxerNameDiv, boxerHpDiv, id,healthIdToAdd) {
        challengerHp = boxerHp[id];
        challengerPP = punchPower[id];
        challengerName = boxerNames[id];
        challengerImage = boxerImages[id];
        $(boxerNameDiv).append(`<img id=${id} src="${challengerImage}"><p>${challengerName}</p>`);
        $(boxerHpDiv).append(`<p id=${healthIdToAdd}>${challengerHp}</p>`);
        var arr = [boxerHp, boxerImages, boxerNames];
        arr.map(x=> delete x[id]);
      };
    // display div to possibleDefender
      function possibleDefenders(div) {
        var boxersHp = [];
        var boxersPP = [];
        var boxersName = [];
        var boxersImage = [];
        var boxersKey = [];
        for (var key in boxerHp) {
          boxersHp.push(boxerHp[key]);
        }
        for (var key in punchPower) {
          boxersPP.push(punchPower[key]);
        }
        for (var key in boxerHp) {
          boxersName.push(boxerNames[key]);
        }
        for (var key in boxerHp) {
          boxersImage.push(boxerImages[key]);
        }
    
        for (var key in boxerHp) {
          boxersKey.push(key);
        }
    
        for(var i = boxersHp.length -1; i >= 0; i--) {
          $(div).prepend(`<div id=${boxersKey[i]} class="img possible-defenders"><img src="${boxersImage[i]}" ><p>${boxersName[i]}</p></div>`);
        }
          
      };
      
      $('.select-challenger').on('click', function() {
        boxer('#challenger-name','#challenger-hp', this.id, 'c-hp');
        possibleDefenders($('#defenders'));
        $('.select-challenger').remove();
        //pick defender
        $('.possible-defenders').on('click', function() {
          $('.possible-defenders').remove();
          boxer('#defender-boxer','#defender-hp', this.id, 'def-hp');
          possibleDefenders($('#defenders'));
          defCheck = 1;
        });
      });
    
          $('.select-defender').on('click', function() {
        boxer('#challenger-name','#challenger-hp', this.id, 'def-hp');
      });
      function punch() {
        if(defCheck === 1) {
          var cPP = punchPower[$('#challenger-name').children('img').attr("id")];
          var defPP = punchPower[$('#defender-boxer').children('img').attr("id")];
          var cHealth = parseInt($('#c-hp').text());
          var defHealth = parseInt($('#def-hp').text());
          //change health by punchPower
          $('.challengerStatement').text(`Challenger's punch-power: ${cPP}`);
          $('#def-hp').text(defHealth - cPP);
          if(Object.keys(boxerNames).length === 0 && $('#def-hp').text() <= "0") {
            $('.challengerStatement').text(`Result`);
            $('.defenderStatement').text(`You Win!`);
            defCheck = 0;
          } else {
            $('#c-hp').text(cHealth - defPP);
            $('.defenderStatement').text(`Defender's punch-power: ${defPP}`);
          }
          
          
          if($('#c-hp').text() <= "0") {
            $('.challengerStatement').text(`Result`);
            $('.defenderStatement').text(`You Lost!`);
            $('#c-hp').text("0");
            console.log("You lost!");
            defCheck = 0;
          }
          if($('#def-hp').text() <= "0") {
            defCheck = 0;
            //pick next defender
            $('.possible-defenders').on('click', function() {
              $('.possible-defenders').remove();
              boxer('#defender-boxer','#defender-hp', this.id, 'def-hp');
              possibleDefenders($('#defenders'));
              defCheck = 1;
            });
            $('#defender-boxer').children('img').remove();
            $('#defender-boxer').children('p').empty()
            $('#def-hp').empty();
            $('#def-hp').attr('id', '');
          }
        }
      }
      $('#punch').on('click', punch);
    
      $('#reset').on('click',function() {
        boxerHp = {
          "anthonyJoshua": 125,
          "tysonFury": 110,
          "deontayWilder": 100,
          "andyRuiz": 150
        };
        
        punchPower = {
            "anthonyJoshua": 10,
            "tysonFury": 5,
            "deontayWilder": 25,
            "andyRuiz": 35
          };
          
        boxerNames = {
            "anthonyJoshua": 'Anthony Joshua',
            "tysonFury": 'Tyson Fury',
            "deontayWilder": 'Deontay Wilder',
            "andyRuiz": 'Andy Ruiz'
          };
        boxerImages = {
            "anthonyJoshua": 'assets/images/anthonyJoshua.jpg',
            "tysonFury": 'assets/images/tysonFury.jpg',
            "deontayWilder": 'assets/images/deontayWilder.jpeg',
            "andyRuiz": 'assets/images/andyRuiz.jpeg'
          };
    
        defCheck = 0;
        $('#fighters').append('<div id="anthonyJoshua" class="select-challenger col-md-3"><img id="pic" src="assets/images/anthonyJoshua.jpg" alt="Anthony Joshua"><div id="anthonyJoshuaValue">Anthony Joshua</div></div><div id="tysonFury" class="select-challenger col-md-3"><img id="pic" src="assets/images/tysonFury.jpg" alt="Tyson Fury"><div class="furyText">Tyson Fury</div></div><div id="deontayWilder" class="select-challenger col-md-3"><img id="pic" src="assets/images/deontayWilder.jpeg" alt="Deontay Wilder"><div class="wilderText">Deontay Wilder</div></div><div id ="andyRuiz" class="select-challenger col-md-3"><img id="pic" src="assets/images/andyRuiz.jpeg" alt="Andy Ruiz Jr."><div class="ruizText">Andy Ruiz Jr.</div></div>');
        $('.possible-defenders').remove();
        $('#challenger-name').children('img').remove();
        $('#challenger-name').children('p').remove();
        $('#c-hp').remove();
        $('#defender-boxer').children('img').remove();
        $('#defender-boxer').children('p').remove();
        $('#def-hp').remove();
        $('#challengerStatement').text(``);
        $('#defenderStatement').text(``);
        $('.select-challenger').on('click', function() {
          boxer('#challenger-name','#challenger-hp', this.id, 'c-hp');
          possibleDefenders($('#defenders'));
          $('.select-challenger').remove();
          //pick defender
          $('.possible-defenders').on('click', function() {
            $('.possible-defenders').remove();
            boxer('#defender-boxer','#defender-hp', this.id, 'def-hp');
            possibleDefenders($('#defenders'));
            defCheck = 1;
          });
        });
      
        $('.select-defender').on('click', function() {
          boxer('#challenger-name','#challenger-hp', this.id, 'def-hp');
        });
        $('#punch').on('click', punch);
      });
    });