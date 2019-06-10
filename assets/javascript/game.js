$(document).ready(function () {

// select intial boxer
    function pickBoxer(boxerNames, boxerHp, punchPower) {
        $('#ajPic, #furyPic, wilderPic, ruizPic').on('click', function(event) {
            
            // display intial boxer
            var selectedBoxer = event.currentBoxer.id;
           
            $('.challenger').html(
            `<div id=${selectedBoxer}> ${ 
            boxerNames[selectedBoxer] 
            }<br><img class='pic' src="assests/images/${selectedBoxer}.jpg" alt=""><br><p class="${selectedBoxer}Value">${
                boxerHp[selectedBoxer]
            }</p></div>`
        );
// take selected boxer out of possible defenders
        var defenders = Object.keys(boxerNames).filter(defender => {
         return defender !== selectedBoxer;
        });
    // make defenders red
        defenders.forEach(defender =>{
        $('.possibleDefenders').append(
            `<div class="champ" id=${defender}> ${
                boxerNames[defender]
            }<br><img class='pic' src="assets/images/${defender}.jpg" alt""><br> <p id="${defender}Value">${
                boxerHp[enemy]
            }</p><div>`
        ); 

        $(`#${defender}`).css({
            'border-color':'red',
            'border-width': '5px',
        });
    });

    // determine defenders 
        var defenderIDs = defenders 
        .map(defender => {
            return '#' + defender;
        })
        .toString();

        var click = 0;

        $(defenderIDs).one('click',function(defender) {
            click++;
// only one defender can be clicked
        if (click === 1) {
            var defender = defender.currentBoxer.id;
            $('#' + defender).remove();
            $('.defender').html(
                `<div id=${defender}> ${
                    boxerNames[defender]
                }<br><img class='pic' src="assets/images/${defender}.jpg" alt""><br> <p id="${defender}Value">${
                    boxerHp[defender]
                }</p></div>`
            );
        }
    });
});
}

function showDefender(defendersLeft, boxerNames, boxerHp) {
    $(defendersLeft.toString().one('click', function(defender) {
        var defender = defender.currentBoxer.id;
        $("#" + defender).remove();
        
        $('.defender').html(
            `<div id=${enemy}> ${
                boxerNames[defender]
              }<br><img class='pic' src="assets/images/${defender}.jpg" alt=""><br> <p id="${defender}Value">${
                boxerHP[defender]
              }</p></div>`
            );
            $('#defender').show();
    }));
}

function punch(boxerHp, boxerNames, punchPower) {
    var defeatedDefenderArr = [];
    var clicks = 1;

    $('#punch').on('click'), function(event) {
        if($('.challenger').children().length !== 0 && $('.defender').children().length !==0) {
            // determines who is who
            var challenger = $('.challenger').children()[0].id;
            var defender = $('.defender').children()[0].id;
// take away points from defenders health
            boxerHp[defender] -= punchPower[challenger] * clicks;
            $('#' + defender + 'Value').html(boxerHp[defender]);
           if (boxerHp[defender] > 0) {
// take away points from challengers health
            boxerHp[challenger] -= punchPower[defender];
            $('#' + challenger + 'Value').html(boxerHp[challenger]);
        }

        // show fight messages 
        if (boxerHp[challenger] > 0 && boxerHp[defender] > 0) {
            // both are still alive 
            $('.challengerStatement').html(
                `<p> You punched ${boxerNames[defender]} with ${punchPower[challenger] * clicks} damage.</p><p>${
                    boxerNames[defender]} punched you back for ${punchPower[defender]} damage.`
            )
        } else if (boxerHp[challenger] > 0 && boxerHp[defender] < 0){
            // add defender to defeated list
            defeatedDefenderArr.push(defender);
            $('.challengerStatement').html(
                `<p>You have defeated ${
                    boxerNames[defender]},
                    choose your next opponent.</p>`
            );
            // take away defeated defender 
            $('.defender').hide();
            var defendersLeft = [];
            for (let i = 0; i < $('#possibleDefenders').children().length; i++) {
                defendersLeft.push("#" + $('#possibleDefenders').children()[i].id);
            }

            showDefender(defendersLeft, boxerNames, boxerHp);

            defeatedDefenderArr = Array.from(new Set(defeatedDefenderArr));

            if (defeatedDefenderArr.length === 3) {
                $('.challengerStatement').text('You have unifed the belts and are World Champion');
                $('challengerStatement').append("<br><button id='startOver'>Start Over</button>");
            }
            } else {
                $('.challengerStatement').text('You have been knocked out.... Please see a Doctor');
                $('challengerStatement').append("<br><button id='startOver'>Start Over</button>");         
               }
               clicks++;
            }
        };
    }

    function reset(){
        var boxerHp = {
            anthonyJoshua: 125,
            tysonFury: 110,
            deontayWilder: 100,
            andyRuiz: 150,
        };
        
        var punchPower = {
            anthonyJoshua: 10,
            tysonFury: 5,
            deontayWilder: 25,
            andyRuiz: 30,
        };
        
        var boxerNames = {
            anthonyJoshua: 'Anthony Joshua',
            tysonFury: 'Tyson Fury',
            deontayWilder: 'Deontay Wilder',
            andyRuiz: 'Andy Ruiz',
        };
        pickBoxer(boxerNames, boxerHP, punchPower);
        punch(boxerNames, boxerHP, punchPower);
    }
$(document).on('click', '#startOver', function(){
    $('.container').html(
        '<h2> Rules: 1. Pick a challenger 2. Pick an opponent 3. Click Punch until a winner is determined </h2>'
        );
        reset();
});

reset();
});
