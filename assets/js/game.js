var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"] ;
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    while(playerHealth > 0 && enemyHealth > 0) {
    //ask player if they want to fight or run
    var promptFight = window.prompt("Would you like to skip this battle? Enter 'SKIP' to leave this round.");

    //if player picks "skip", confirm and then stop loop
    if (promptFight === "SKIP" || promptFight === "skip" || promptFight === "Skip") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to skip this round?");

        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip the fight.");
            //subtract money from playerMoney for skipping
            playerMoney = playerMoney - 10;
            console.log("playerMoney", playerMoney);
            break;
        }
    }

        //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // Check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

//function to start a new game
var startGame = function() {
    debugger;
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for(var i=0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            //let player know what round they're in
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
            //pick a new enemy based on index of enemyNames
            var pickedEnemyName = enemyNames[i];
            //reset enemyHealth
            enemyHealth = 50;
            //fight
            fight(pickedEnemyName);
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }      
    }
    //after loop either playerHealth is 0 or there are no enemies remaining, call endGame
    endGame();
};

// function to end the entire game
var endGame = function() {
    //if player is still alive, player wins
    if (playerHealth > 0) {
        window.alert("You're the king of the world")
    }
    //if player has died, player loses
    else {
        window.alert("You dead.")
    }
    //ask player if they want to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart game
        startGame();
    } else {
        window.alert("Goodbye.")
    }
};

//start game when page loads
startGame();