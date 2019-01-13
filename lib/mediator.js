//中介者模式 为对象间的通信增加中介者，作为所有需要通信的对象之间的消息中转，对象间解耦合，减少修改时间提高可维护性

function Player(name) {
  
}

class Player {
  constructor(name) {
    this.points = 0;
    tiis.name = name || '';
  }
  play() {
    this.points ++;
  }
}

class Mediator {
  constructor(scoreUpdate) {
    this.players = {};
    this.scoreUpdate = scoreUpdate;
  }
  setup = () => {
    var players = this.players;
    players.HOME = new Player('HOME');
    players.GUEST = new Player('GUEST');
  }
  patch = () => {
    scoreUpdate({
      HOME: this.players.HOME.points,
      GUEST: this.players.GUEST.points,
    })
  }
  keypress = (e) => {
    e = e || window.event;
    if(e.whitch === 49) {//1
      this.players.HOME.play();
      this.patch();
      return
    }
    if(e.whitch === 48) {//0
      this.players.GUEST.play();
      this.patch();
      return
    }
  }
}

class ScoreBoard{
  constructor(elem) {
    this.elem = elem;
  }
  update = (scoreoption) => {
    var msg = '';
    Object.keys(scoreoption).forEach(
      (v) => {
        msg += `<p><strong>${v}<\/strong>:${scoreoption[v]}<\/p>`
      }
    );
    this.elem.innerHTML = msg;
  }
}

const mediator = new Mediator();
const scoreboard = new ScoreBoard();

mediator.setup();
window.onkeypress = mediator.keypress;

setTimeout(
  () => {
    window.onkeypress = null;
    alert('COMPLETE')
  }, 3000
)

