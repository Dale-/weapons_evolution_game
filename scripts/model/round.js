function Round(player, soldier) {
  this.player = player;
  this.soldier = soldier;
  this.times = 1;
  this.dizzyTimes = 0;
}

Round.prototype.roundBlood = function() {
  var info = '';

  var value = this.getSoldierAP() + this.getSoldierWeaponAp();
  this.player.hp -= value;

  if(this.times === 1){

    info += '战士' + this.getSoldierName() + '用' + this.getSoldierWeaponName() +
            '攻击了普通人' + this.getPlayerName() + '，' +
            this.getPlayerName() + '受到了' + value + '点伤害，' +
            this.getPlayerName() + this.getSoldierWeaponSkillInfo() +
            this.getPlayerName() + '剩余生命：' + this.getPlayerHP() + '\n';
  } else {
    info += '//' + this.getSoldierName() + '进攻\n';
  }

  if(this.getPlayerHP() <= 0) {
    info += '\n' + this.getPlayerName() + '被打死了';
    return info;
  }

  this.player.hp -= this.getSoldierWeaponSkillBlood() ;

  info += this.getPlayerName() + '受到' +
          this.getSoldierWeaponSkillBlood() + '点' +
          this.getSoldierWeaponSkillName() + '伤害,' +
          this.getPlayerName() + '剩余生命：' + this.getPlayerHP() + '\n';

  if(this.getPlayerHP() <= 0) {
    info += '\n' + this.getPlayerName() + '被打死了';
    return info;
  }

  this.soldier.hp -= this.getPlayerAP();
  info += '//' + this.getPlayerName() + '进攻\n';

  if(this.getSoldierHP() <= 0) {
    info += '\n' + this.getSoldierName() + '被打死了';
    return info;
  }
  this.times ++;
  return info;
};

Round.prototype.roundCtriticalStrike = function() {
  var info = '';

  var value = (this.getSoldierAP() + this.getSoldierWeaponAp()) * 3;
  this.player.hp -= value;

  if(this.times === 1){

    info += '战士' + this.getSoldierName() + '用' + this.getSoldierWeaponName() +
            '攻击了普通人' + this.getPlayerName() + '，' +this.getSoldierName() +
            this.getSoldierWeaponSkillInfo() + this.getPlayerName() + '受到了' +
            value + '点伤害' + '，' + this.getPlayerName() + '剩余生命：' +
            this.getPlayerHP() + '\n';

  } else {
    info += '//' + this.getSoldierName() + '进攻\t' +
            this.getPlayerName() + '剩余生命：' + this.getPlayerHP() + '\n';
  }

  if(this.getPlayerHP() <= 0) {
    info += '\n' + this.getPlayerName() + '被打死了';
    return info;
  }

  this.soldier.hp -= this.getPlayerAP();

  info += '//' + this.getPlayerName() + '进攻\n';

  if(this.getSoldierHP() <= 0) {
    info += '\n' + this.getSoldierName() + '被打死了';
    return info;
  }
  this.times ++;
  return info;
};

Round.prototype.roundFrozen = function() {
  var info = '';

  var value = (this.getSoldierAP() + this.getSoldierWeaponAp());
  this.player.hp -= value;

  if(this.times % 3 === 1) {

    info += '战士' + this.getSoldierName() + '用' +
            this.getSoldierWeaponName() + '攻击了普通人' +
            this.getPlayerName() + '，' + this.getPlayerName() +
            '受到了' + value + '点伤害，';

  } else {
    info += '//' + this.getSoldierName() + '进攻\t' +
    this.getPlayerName() + '剩余生命：' + this.getPlayerHP() + '\n';
  }

  if(this.getPlayerHP() <= 0) {
    info += '\n' + this.getPlayerName() + '被打死了';
    return info;
  }

  if(this.times % 3 === 1) {
    info += this.getPlayerName() + this.getSoldierWeaponSkillInfo() +
            this.getPlayerName() + '剩余生命：' + this.getPlayerHP() + '\n' +
            '//' + this.getPlayerName() +'进攻\n';

  }else if(this.times % 3 === 0) {
    info += this.getPlayerName() + '冻得直哆嗦，没有击中' +
            this.getSoldierName() + '\n';
  } else {
    this.soldier.hp -= this.getPlayerAP();
    info += '//' + this.getPlayerName() + '进攻\n';
  }

  if(this.getSoldierHP() <= 0) {
    info += '\n' + this.getSoldierName() + '被打死了';
    return info;
  }
  this.times ++;
  return info;
};

Round.prototype.roundDizzy = function() {
  var info = '';

  var value = (this.getSoldierAP() + this.getSoldierWeaponAp());
  this.player.hp -= value;

  if(this.times === 1 || this.times === 2){

    info += '战士' + this.getSoldierName() + '用' + this.getSoldierWeaponName() +
            '攻击了普通人' + this.getPlayerName() + '，' +this.getPlayerName() +
            '受到了' + value + '点伤害' + '，' + this.getPlayerName() +
            this.getSoldierWeaponSkillInfo() + this.getPlayerName() +
            '剩余生命：' + this.getPlayerHP() + '\n';

    this.dizzyTimes ++;

  } else {

    info += '//' + this.getSoldierName() + '进攻\n';
    this.dizzyTimes = this.dizzyTimes > 0 ? this.dizzyTimes-1 : this.dizzyTimes;
  }

  if(this.getPlayerHP() <= 0) {
    info += '\n' + this.getPlayerName() + '被打死了';
    return info;
  }

  if(this.dizzyTimes > 0) {

    info += this.getPlayerName() +'晕倒了，无法攻击, 眩晕还剩：' +
            this.dizzyTimes + '轮\n';
  } else {

    this.soldier.hp -= this.getPlayerAP();
    info += '//' + this.getPlayerName() + '进攻\n';
  }

  if(this.getSoldierHP() <= 0) {
    info += '\n' + this.getSoldierName() + '被打死了';
    return info;
  }
  this.times ++;
  return info;
};

Round.prototype.getSoldierAP = function() {
  return this.soldier.attackPoint;
};

Round.prototype.getPlayerAP = function() {
  return this.player.attackPoint;
};

Round.prototype.getPlayerHP = function() {
  return this.player.hp;
};

Round.prototype.getSoldierHP = function() {
  return this.soldier.hp;
};

Round.prototype.getSoldierName = function() {
  return this.soldier.name;
};

Round.prototype.getPlayerName = function() {
  return this.player.name;
};

Round.prototype.getSoldierWeaponName = function() {
  return this.soldier.getWeaponName();
};

Round.prototype.getSoldierWeaponAp = function() {
  return this.soldier.getWeaponAP();
};

Round.prototype.getSoldierWeaponSkillInfo = function() {
  return this.soldier.getWeaponSkillInfo();
};

Round.prototype.getSoldierWeaponSkillName = function() {
  return this.soldier.getWeaponSkillName();
};

Round.prototype.getSoldierWeaponSkillBlood = function() {
  return this.soldier.getWeaponSkillBlood();
};

module.exports = Round;