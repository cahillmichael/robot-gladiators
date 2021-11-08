//function to fight, invoked by startGame, passed enemy.name
var fight = function(enemy) {
    console.log(enemy);
    while(playerInfo.health > 0 && enemy.health > 0) {
    //ask player if they want to fight or run
    var promptFight = window.prompt("Would you like to skip this battle? Enter 'SKIP' to leave this round.");
    //if player picks "skip", confirm and then stop loop
    if (promptFight === "SKIP" || promptFight === "skip" || promptFight === "Skip") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to skip this round?");
        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip the fight.");
            //subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money", playerInfo.money);
            break;
        }
    }
        //Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack)
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );
        // Check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
        var damage = randomNumber(enemy.attack - 3, enemy.attack)
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );
        // Check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

//function to start a new game
var startGame = function() {
    //reset player stats
    playerInfo.reset();
    for(var i=0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            //let player know what round they're in
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
            //pick a new enemy based on index of enemy.names
            var pickedEnemyObj = enemyInfo[i];
            //reset enemy.health
            pickedEnemyObj.health = randomNumber(40, 60);
            //fight
            fight(pickedEnemyObj);
            //if not dead and enemies remain, offer shop option
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
    //after loop either playerInfo.health is 0 or there are no enemies remaining, call endGame
    endGame();
};

// function to end the entire game
var endGame = function() {
    //if player is still alive, player wins
    if (playerInfo.health > 0) {
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
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "Upgrade":
        case "upgrade":
            playerInfo.upgradeAttack();
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

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (playerInfo.money >= 7) {
            window.alert("Refill your health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You can't afford this.");
        } 
    },
    upgradeAttack: function() {
        if (playerInfo.money >=7) {
            window.alert("Upgrade your attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You can't afford this.");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
     },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
     },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

//start game when page loads
startGame();