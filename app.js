const app = {
    
    colors: ['red','green','blue','yellow'],
  
    // this var will contain the sequence said by Simon
    sequence: [],
    //player position in the sequence
    indice: 0, 
  
  //create the 4 cells
    drawCells: function () {
      const playground = document.getElementById('playground');
      for (const color of app.colors) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = color;
        cell.style.backgroundColor = color;
        playground.appendChild(cell);
      }
    },
  //handle cell transformation when hit
    bumpCell: function (color) {
      // let's modify the syle directly
      document.getElementById(color).style.borderWidth = '45px';
      // and reset the same style, after a small pause (150 ms)
      setTimeout( () => {
        document.getElementById(color).style.borderWidth = '0';
      }, 150);
    },
  
  // launch a  new game with 3 moves
    newGame: function () {
      // start by reseting the sequence 
      app.sequence = [];
      // make it 3 times :
      for (let index = 0; index < 3; index++) {
        // get a random number between 0 and 3
        let random = Math.floor(Math.random()*4);
        // add the corresponding color to the sequence
        app.sequence.push( app.colors[random] );
      }
  
      app.simonSays(app.sequence);
    },

    // make Simon plays a sequence 
    simonSays: function (sequence) {
      if (sequence && sequence.length) {
        // after 500ms, bump the first cell
        setTimeout( app.bumpCell, 500, sequence[0] );
        // plays the rest of the sequence after a longer pause
        setTimeout( app.simonSays, 850, sequence.slice(1));
      }
    },
  
    //init the game
    init: function () {
      console.log('init');
      app.drawCells();
      // listen click on the "go" button
      document.getElementById('go').addEventListener('click', app.newGame );
    },
  
  //display the message, hide the button
    showMessage: function (message) {
      document.getElementById('go').style.display = "none";
      document.getElementById('message').innerHTML = "message";
      
    },
  
    //display the button, hide the message
    hideMessage: function() {
      document.getElementById('go').style.display = "block";
      document.getElementById('message').style.display = "none";
    },

    //reset the game, show the score
    gameOver: function (){
      alert(`Game Over, votre score est de ${app.sequence.length}! Félicitations`);
      app.hideMessage();
      app.sequence=[];
    }


  };
  
document.addEventListener('DOMContentLoaded', app.init);