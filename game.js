//Set up basic game with Phaser

//brackets IDE

let prizes = {
    count:12,
    prize_names : ["3000 CB Credits","35% Off","Hard Luck","70% OFF","CB Swagpack","100% OFF","Netflix Subs","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}


let config = {
    type : Phaser.CANVAS,
    width : 800,
    height : 600,
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
};
let game = new Phaser.Game(config);
    
function preload(){
    //load the images
    this.load.image('background',"Assets/back.jpg");
    this.load.image('wheel',"Assets/wheel.png");
    this.load.image('stand',"Assets/stand.png");
    this.load.image('pin',"Assets/pin.png");
    this.load.image('button', 'Assets/spin-n-win-logo.png');
    //load the background sound 
    this.load.audio('sound_effect', 'Assets/wheel.mp3');
}
function create(){
    //create the game image
    let W = game.config.width;
    let H = game.config.height;
    this.add.sprite(0,0,'background');
    let pin = this.add.sprite(W/2,H/2-200,'pin').setScale(0.20);
    pin.depth = 5;
    this.add.sprite(W/2,H/2 + 200,'stand').setScale(0.20);
    
    
    //let create wheel
    this.wheel = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.20);
    
    //let create button for starting the spin
    this.button = this.add.sprite(150, 80, 'button').setScale(.15).setInteractive({
        cursor: 'pointer'
    });
    
    //Create the prize text to show what user has won
    this.add.text(20, 0, "Tap on SPIN N WIN to Spin the wheel", {
            font: "bold 40px Arial",
            align: "center",
            color: "white"
    });
    
    this.prizeText = this.add.text(400, H - 20, "", {
            font: "bold 40px Arial",
            align: "center",
            color: "white"
    });
    
    this.prizeText.setOrigin(0.5);
    
    //Add background sound
    this.sound_effect = this.sound.add('sound_effect');
    
    this.canSpin = true;
    this.button.on("pointerdown",spinwheel,this);
    
}
function update(){
    //console.log("In Update");
    //this.wheel.angle -= 1;
    
}

function spinwheel(){
    
    if(this.canSpin){
        this.prizeText.setText("");
        let rounds = Phaser.Math.Between(2,4);
        let extra_degrees = Phaser.Math.Between(0,11)*30;
        let total_angle = rounds*360 + extra_degrees;
        let idx = prizes.count - 1 - Math.floor(extra_degrees/(360/prizes.count));
        this.canSpin = false;
        this.sound.play('sound_effect');
        
        let tween = this.tweens.add({
            targets: this.wheel,
            angle: total_angle,
            ease:"Cubic.easeOut",
            duration: 3000,
            callbackScope: this,
        
            onComplete: function(tween){
                // displaying prize text
                this.prizeText.setText("You win " + prizes.prize_names[idx]);
                // player can spin again
                this.canSpin = true;
            }
        });
    }
}