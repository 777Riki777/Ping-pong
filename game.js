const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1d1d1d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let paddle1, paddle2, ball;
let paddleSpeed = 300;
let ballSpeedX = 200;
let ballSpeedY = 200;
let cursors;
let score1 = 0;
let score2 = 0;
let scoreText1, scoreText2;

function preload() {}

function create() {
    paddle1 = this.add.rectangle(50, game.config.height / 2, 20, 100, 0xffffff);
    paddle2 = this.add.rectangle(game.config.width - 50, game.config.height / 2, 20, 100, 0xffffff);
    this.physics.add.existing(paddle1);
    this.physics.add.existing(paddle2);
    paddle1.body.setImmovable(true);
    paddle2.body.setImmovable(true);
    ball = this.add.circle(game.config.width / 2, game.config.height / 2, 10, 0xff0000);
    this.physics.add.existing(ball);
    ball.body.setBounce(1).setCollideWorldBounds(true).setVelocity(ballSpeedX, ballSpeedY);

    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(ball, paddle1);
    this.physics.add.collider(ball, paddle2);

    scoreText1 = this.add.text(20, 20, 'Player 1: 0', { fontSize: '20px', fill: '#ffffff' });
    scoreText2 = this.add.text(game.config.width - 150, 20, 'Player 2: 0', { fontSize: '20px', fill: '#ffffff' });
}

function update(time, delta) {
    
    if (cursors.up.isDown) {
        paddle1.y -= paddleSpeed * delta / 1000;
    } else if (cursors.down.isDown) {
        paddle1.y += paddleSpeed * delta / 1000;
    }

   
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey('W'))) {
        paddle2.y -= paddleSpeed * delta / 1000;
    } else if (this.input.keyboard.checkDown(this.input.keyboard.addKey('S'))) {
        paddle2.y += paddleSpeed * delta / 1000;
    }

   
    paddle1.body.updateFromGameObject();
    paddle2.body.updateFromGameObject();

    
    paddle1.y = Phaser.Math.Clamp(paddle1.y, paddle1.height / 2, game.config.height - paddle1.height / 2);
    paddle2.y = Phaser.Math.Clamp(paddle2.y, paddle2.height / 2, game.config.height - paddle2.height / 2);

    
    if (ball.x < paddle1.x - paddle1.width / 2) {
        score2++;
        scoreText2.setText('Player 2: ' + score2);
        resetBall(1);
    } else if (ball.x > paddle2.x + paddle2.width / 2) {
        score1++;
        scoreText1.setText('Player 1: ' + score1);
        resetBall(-1);
    }
}

function resetBall(direction) {
    ball.setPosition(game.config.width / 2, game.config.height / 2);
    ball.body.setVelocity(ballSpeedX * direction, Phaser.Math.Between(-200, 200));
}
