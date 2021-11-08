var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"] ;
var enemyHealth = 50;
var enemyAttack = 12;

//function to fight, invoked by startGame, passed enemyName
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
            playerMoney = Math.max(0, playerMoney - 10);
            console.log("playerMoney", playerMoney);
            break;
        }
    }
        //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        var damage = randomNumber(playerAttack - 3, playerAttack)
        enemyHealth = Math.max(0, enemyHealth - damage);
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
        var damage = randomNumber(enemyAttack - 3, enemyAttack)
        playerHealth = Math.max(0, playerHealth - damage);
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
            enemyHealth = randomNumber(40, 60);
            //fight
            fight(pickedEnemyName);
            //if not dead and enemies remain, offer shop option
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                //ask if player wants to go to shop
                var shopConfirm = window.confirm("The round has ended. Wanna go shopping?");
                //if yes (true) call shop()
                if (shopConfirm) {
                shop();
                }
            }
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

//shop function
var shop = function() {
    //ask player what they want to do
    var shopOptionPrompt = window.prompt (
        "Do ya wanna REFILL your health, UPGRADE your attack, or LEAVE the damn shop? Enter REFILL, UPGRADE, or LEAVE to make a choice"
    );
    //register player choice
    switch (shopOptionPrompt) {
        case "REFILL":
        case "Refill":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refill your health by 20 for 7 dollars.");
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You can't afford this.");
            }    
            break;
        case "UPGRADE":
        case "Upgrade":
        case "upgrade":
            if (playerMoney >=7) {
                window.alert("Upgrade your attack by 6 for 7 dollars.");
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You can't afford this.");
            }
            break;
        case "LEAVE":
        case "Leave":
        case "leave":
            window.alert("Get out the shop.");
            //do nothing, end function
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            //call shop() to force choice
            shop();
            break;
    }
};

//random number generator function
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max-min+1) + min);
    return value;
}

//start game when page loads
startGame();