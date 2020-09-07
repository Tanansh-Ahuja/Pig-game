/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Global declaration
var scores , roundscores , activeplayer, game;
game = true;

//document.querySelector('#current-'+ activeplayer).textContent = dice;
//document.querySelector('#current-' + activeplayer).innerHTML = '<em>' + dice + '</em>'
//var x = document.querySelector('#score-'+activeplayer).textContent;
//console.log(x)
function init()
{
    game = true;
    scores= [0,0];
    roundscores = [0,0];
    activeplayer = 0;
    document.querySelector('.dice').style.display = 'None';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'PLAYER 1';
    document.querySelector('#name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function funcbtn()
{
    if(game)
    {
        //1. Random number
        var dice = Math.floor(Math.random()*5) + 1;

        //2. Display the dice number as image
        var diceselection = document.querySelector('.dice');
        diceselection.style.display = 'block';
        diceselection.src = 'dice-'+dice+'.png';

        //3. Add the dice number to current
        if(dice == 1)
        {
            scores[activeplayer]=0;
            document.getElementById('current-'+activeplayer).textContent = scores[activeplayer];
            document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active');
            activeplayer = (activeplayer+1) % 2;
            document.querySelector('.player-' + activeplayer + '-panel').classList.add('active');
        }
        else
        {
            scores[activeplayer] = scores[activeplayer] + dice;
            document.getElementById('current-'+activeplayer).textContent = scores[activeplayer];
        }
    }
    
}

function funcbtnhold()
{
    roundscores[activeplayer] = roundscores[activeplayer] + scores[activeplayer];
    document.getElementById('score-'+activeplayer).textContent = roundscores[activeplayer];
    scores[activeplayer] = 0;
    document.getElementById('current-'+activeplayer).textContent = scores[activeplayer];
    if(roundscores[activeplayer]>=20)
    {
        document.querySelector('#name-'+activeplayer).textContent = 'WINNER!!!';
        document.querySelector('.dice').style.display = 'None';
        document.querySelector('.player-'+activeplayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active');
        game = false;
    }
    else
    {
        document.querySelector('.player-'+activeplayer+'-panel').classList.toggle('active');
        activeplayer=(activeplayer+1)%2;
        document.querySelector('.player-'+activeplayer+'-panel').classList.toggle('active');
        console.log('Active player = '+activeplayer);
    }
}   


//Main
init();
document.querySelector('.btn-roll').addEventListener('click', funcbtn);
document.querySelector('.btn-hold').addEventListener('click', funcbtnhold);
document.querySelector('.btn-new').addEventListener('click', init);

/* What is an anonymous function?
document.querySelector('.btn-roll').addEventListener('click', function()
{
    and you type what you want to do here;
}
);
now this function doesnt have a name
*/