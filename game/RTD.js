var pause = false;
var drawMe;
var town;
var spawnPoints;
var heros;
var monsters;
var bullets;
var trees;
var effects;
var water;
var gameWidth = 500;
var gameHeight = 500;
var mapImg;
var classArray;
var maxTownHealth = 5000;
var updateID;
var turnsSinceSpawn =0;
var herbalistLvl=0;
var carpenterLvl=0;
function initGame(canvasElement)
{
	if (!canvasElement)
	 {
        canvasElement = document.createElement("canvas");
	canvasElement.id = "halma_canvas";
	document.body.appendChild(canvasElement);
    }
    else
    {
    	
    }
    defineClasses();
    canvasElement.width = gameWidth;
    canvasElement.height = gameHeight;
    town = new Object();
    heros = new Array();
    monsters = new Array();
    bullets = new Array();
    trees = new Array();
    effects = new Array();
    spawnPoints = new Array();
    drawMe = canvasElement.getContext("2d");
    createMap();
    drawMap();
    spawnHero("Apprentice");
    spawnHero("Squire");
    spawnMonster();
    drawMap();
    //updateID = setInterval(update,25);
	update();
}


function createMap(){
	
	drawMe.fillStyle = "rgb(20,240,10)";
	drawMe.fillRect(0,0,gameWidth,gameHeight);
	town.x = Math.random()*gameWidth*1/3+gameWidth*1/3;
	town.y = Math.random()*gameHeight*1/3+gameHeight*1/3;
	town.health = maxTownHealth;
	drawMe.fillStyle = "rgb(139,69,18)";
	drawMe.arc(town.x,town.y,20,0,7);
	drawMe.closePath();
	drawMe.fill();
	
	createSpawn();
	spawnTree();
	spawnTree();
	spawnTree();
	spawnTree();
	spawnTree();
	spawnTree();
	spawnTree();
	spawnTree();
	spawnTree();
	spawnTree();
	spawnTree();
	spawnTree();
	spawnMonster();
	//update();
	//update();
	//update();
	//for(i=0;i<500;i++)
	//{
	//	update();
	//}
}


function spawnMonster(){
	i = Math.floor(spawnPoints.length*Math.random());
	var monster = new Object();
	monster.x = spawnPoints[i].x + Math.random()*30-15;
	monster.y = spawnPoints[i].y + Math.random()*30-15;
	monster.vx = 0;
	monster.vy = 0;
	monster.hp = 50;
	monster.atk = 50;
	monster.color = "rgb(0,0,0)";
	
	monster.sprite = document.getElementById('img-monster-1');
	//monster.sprite = new Image();
	//monster.sprite.src = 'images/monster-1.gif';
	
	monsters.push(monster);
}

function createSpawn()
{
	var spawn = new Object();
	do
	{
		spawn.x = Math.random()*gameWidth;
		spawn.y = Math.random()*gameHeight;
	}	
	while (dist(spawn.x,spawn.y,town.x,town.y)<50)	
	spawnPoints.push(spawn);
}

function dist(x1,y1,x2,y2)
{
	return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))
}

function drawMap()
{
	drawMe.canvas.height = drawMe.canvas.height;
	
	drawMe.fillStyle = "rgb(20,240,10)";
	drawMe.fillRect(0,0,gameWidth,gameHeight);
	drawMe.fillStyle = "rgb(139,69,18)";
	drawMe.arc(town.x,town.y,20,0,Math.PI*2*town.health/maxTownHealth);
	drawMe.closePath();
	drawMe.fill();
	var p;
	for (i in trees)
	{
		p = trees[i];
		/* drawMe.beginPath();
		drawMe.fillStyle = "rgb(20,120,50)";
		drawMe.arc(p.x,p.y,5,0,7);
		drawMe.closePath();
		drawMe.fill(); */
		var img = new Image();
		img.src = 'images/tree-s-' + p.type + '.png';
		var xOffset = Math.round(img.width / 2);
		var yOffset = Math.round(img.height / 2);
		
		drawMe.drawImage(img, p.x - xOffset, p.y - yOffset);
	}
	
	//console.log(spawnPoints);
	for (i in spawnPoints)
	{
		p = spawnPoints[i];
		drawMe.beginPath();
		//console.log(p);
		//drawMe.moveTo(p.x,p.y);
		drawMe.fillStyle = "rgb(200,20,50)";
		drawMe.arc(p.x,p.y,15,0,7);
		drawMe.closePath();
		drawMe.fill();
	}
	for (i in heros)
	{
		p = heros[i];
		/* drawMe.beginPath();
		drawMe.fillStyle = p.color;
		drawMe.arc(p.x,p.y,10,0,7);
		drawMe.closePath();
		drawMe.fill(); */
		
		// Draw Sprite
		var sprite = new Image();
		sprite.src = 'images/blackmage.png';
		drawMe.drawImage(sprite, p.x - 14, p.y - 21);
	}
	for (i in monsters)
	{
		p = monsters[i];
		/* drawMe.beginPath();
		drawMe.fillStyle = p.color;
		drawMe.arc(p.x,p.y,5,0,7);
		drawMe.closePath();		
		drawMe.fill(); */
		
		var xOffset = 0; //Math.round(p.sprite.width / 2);
		var yOffset = 0; //Math.round(p.sprite.height / 2);
		
		//console.log(p);
		
		drawMe.drawImage(p.sprite, p.x - xOffset, p.y - yOffset);
	}
	for(i in effects)
	{
		p = effects[i];
		p.draw();
		p.frameLife = p.frameLife-1;
		//console.log(p.frameLife);
		if (p.frameLife < 1)
		{
			//console.log("WTF");
			effects.splice(i,1);
			i=i-1;
		}
	}
}

function defineClasses()
{
	var App = [1,2];
	var Sqr = [1,2];
	var y = [App,Sqr];
	classArray = y;
	
	classArray[0][0] = "Apprentice";
	classArray[0][1] = "15";
	classArray[0][2] = "10";
	classArray[0][3] = "6";
	classArray[0][4] = "1";
	classArray[0][5] = rangeAttack;
	classArray[0][6] = noSpecial;
	classArray[0][7] = "rgb(10,0,200)";
	
	classArray[1][0] = "Squire";
	classArray[1][1] = "25";
	classArray[1][2] = "15";
	classArray[1][3] = "2";
	classArray[1][4] = "1";
	classArray[1][5] = meeleAttack;
	classArray[1][6] = noSpecial;
	classArray[1][7] = "rgb(200,100,100)";
}


function promoteHero(hero,heroType)
{
	var i,j;
	hero.heroTyoe= heroType;
	//i = classID[heroType];
	if (heroType == "Apprentice")
		i = 0;
	else
		i = 1;
	
	
	hero.lvl =1;
	hero.hp =classArray[i][1]*10*(1+Math.random()*.3);
	hero.atkDmg =classArray[i][2]*10*(1+Math.random()*.3);
	hero.rng =classArray[i][3]*10*(1+Math.random()*.3);
	hero.spd =classArray[i][4]*10*(1+Math.random()*.3);
	hero.attack =classArray[i][5];
	hero.special = classArray[i][6];
	hero.color = classArray[i][7];
	hero.vx = 0;
	hero.vy = 0;
}

function classID()
{
	var Apprentice = 0;
	var Squire = 1;
}

function noSpecial()
{
	
}

function distance(a,b)
{
	return dist(a.x,a.y,b.x,b.y);
}

function attract(a,b,str) //Function that accelerates a towards b str scales the attraction.  Negative will repel
{
	r = Math.max(distance(a,b),10);
	a.vx = Math.max(-25,Math.min(25,a.vx))
	a.vy = Math.max(-25,Math.min(25,a.vy))
	a.vx += str*(b.x-a.x)/(r*r);
	a.vy += str*(b.y-a.y)/(r*r);
}
function relocate(a)
{
	a.x += a.vx;
	a.y += a.vy;
	a.vx *=.95;
	a.vy *=.95;
}
function wallForce(a)
{
	var k = .1;
	if (a.x > gameWidth-10)
	{
		a.vx += (-a.x+gameWidth-10)*k;
	}
	if (a.x < 10)
	{
		a.vx += (10 - a.x)*k;
	}
	if (a.y > gameHeight-10)
	{
		a.vy += (-a.y+gameHeight-10)*k;
	}
	if (a.y < 10)
	{
		a.vy += (10 - a.y)*k;
	}
}

function update()
{
	var i,j;
	//move Monsters
	for(i in monsters)
	{
		wallForce(monsters[i]);
		for (j in trees)
		{
			attract(monsters[i],trees[j],25);
		}
		if (trees.length == 0)
		{
			attract(monsters[i],town,50);
		}
		relocate(monsters[i]);
	}
	//move Heros
	for(i in heros)
	{
		wallForce(heros[i]);
		for (j in monsters)
		{
			attract(heros[i],monsters[j],heros[i].spd*5);
		}
		if (monsters.length == 0)
		{
			if (town.health<maxTownHealth)
			{
				for (j in trees)
				{
					attract(heros[i],trees[j],25);
				}
			}
			else
			{
				attract(heros[i],town,50);
			}
		}
			relocate(heros[i]);
	}
	//Heros Attack
	for (i in heros)
	{
		heros[i].cd--;
		if (monsters.length!=0)
		{
			heros[i].attack();
			checkLvl(heros[i]);
		}
		if(town.health < maxTownHealth)
		{
			for (j in trees)
			{
				if (distance(trees[j],heros[i])<heros[i].rng)
				{
					trees[j].resources -=10;
					town.health +=10 + carpenterLvl;
				}
			}
		}	
	}
	//Monsters Nom Stuff
	for(i in monsters)
	{
		for(j in trees)
		{
			if (distance(monsters[i],trees[j]) < 15 )
			{
				//console.log(trees[j].resources);
				trees[j].resources -= monsters[i].atk;
				if (trees[j].resources < 0)
				{
					//console.log("WTF?");
					trees.splice(j,1);
						
					j = j-1;
				}
			}
		}
		if (distance(monsters[i],town)<15)
		{
			town.health -= monsters[i].atk;
			if (town.health <= 0)
			{
				town.health = 0;
				endGame();
				return;
			}
		}
	}
	//Spawn New Monster
	if (Math.random()<.01)
	{
		for (i=0;i<=spawnPoints.length/2 + 1;i++)
		{
			spawnMonster();
		}
	}
	
	//Spawn New Trees
	if (Math.random()<.01 + herbalistLvl)
	{
		spawnTree();
	}
	//Spawn New SpawnPoint
	turnsSinceSpawn++;
	if (Math.random()<.001 + turnsSinceSpawn/10000)
	{
		turnsSinceSpawn = 0;
		createSpawn();
		for (i=0;i<=spawnPoints.length/2 + 1;i++)
		{
			spawnMonster();
		}
	}
	//Redraw Map
	drawMap();
	setTimeout("update();", 25);
}

function checkLvl(hero)
{
	if (hero.xp>hero.lvl*100)
	{
		levelUp(hero);	
	}
}

function levelUp(hero)
{
	hero.xp -= hero.lvl*100;
	hero.atkSpd -= 1/3;
	hero.maxTargets++;
	hero.rng +=1.1;
	hero.lvl++;
	carpenterLvl +=2.5;
	herbalistLvl +=.001;
}

function endGame()
{
	alert("Game Over!");
	//clearInterval(updateID);
}

function meeleAttack()
{
	//console.log("Meele Attack");
	for(i in monsters)
	{
		var m;
		m = monsters[i];
		if (dist(m.x,m.y,this.x,this.y) < this.rng)
		{
			m.hp = m.hp - this.atkDmg;
			this.xp += spawnPoints.length;
			this.cd = 4;
			var efx = new Object;
			efx.frameLife = 4;
			efx.x = this.x;
			efx.y = this.y;
			efx.rng = this.rng
			efx.draw = function(){
				drawMe.beginPath();
				drawMe.strokeStyle = "rgb(0,20,40)";
				drawMe.arc(this.x,this.y,this.rng,0,7);
				drawMe.stroke();
			}
			effects.push(efx);
			if (m.hp < 1 )
			{
				monsters.splice(i,1);
				i=i-1;
			}
		}
	}
}

function rangeAttack()
{
	var m;
	var distance;
	var closestDistance;
	var closest;
	if (this.cd<1)
	{
		var atks = this.maxTargets;
		for (i in monsters)
		{
			
			m = monsters[i];
			distance = dist(m.x,m.y,this.x,this.y);
			
			if (distance < this.rng && atks > 0)
			{
				console.log(this.maxTargets+":"+atks+" xp:"+this.xp);
				atks--;
				this.cd = this.atkSpd;
				this.xp += spawnPoints.length;
			monsters[i].hp = monsters[i].hp - this.atkDmg
			var efx = new Object();
			efx.sx = this.x;
			efx.sy = this.y;
			efx.ex = monsters[i].x;
			efx.ey = monsters[i].y;
			efx.a = this.x-100+Math.random()*200 ;
			efx.b = this.y-100+Math.random()*200 ;
			efx.c = monsters[i].x-100+Math.random()*200 ;
			efx.d = monsters[i].y-100+Math.random()*200 ;
			
			efx.frameLife = 60;
			efx.draw = function(){
				
				drawMe.beginPath();
				drawMe.strokeStyle = "rgb(20,42,220)";
				drawMe.moveTo(this.sx,this.sy)
				drawMe.bezierCurveTo(this.a,this.b,this.c,this.d,this.ex,this.ey)
				drawMe.stroke();
				}
			effects.push(efx);
				if (monsters[i].hp < 1 )
				{
							monsters.splice(i,1);
				}
			}
		}
	}
}


function spawnTree()
{
		var tree = new Object();
		tree.resources = 1000*Math.random()+150;
		tree.x = Math.random()*gameWidth;
		tree.y = Math.random()*gameHeight;
		
		tree.type = (Math.round(Math.random() * 100) % 3) + 1;
		
		
		trees.push(tree);
}

function spawnHero(heroType)
{
	var hero = new Object();
	if (heroType == null) 
	{
		if (Math.random() < .5) 
		{
			//alert("App");
			promoteHero(hero,"Apprentice");
		}
		else
		{	
			//alert("Squire");
			promoteHero(hero,"Squire");
			
			
		}
	}
	else
	{
		promoteHero(hero,heroType);
	}
	hero.maxTargets = 1;
	hero.atkSpd = 8;
	hero.cd = -1;
	hero.xp =0;
	hero.lvl = 1;
	hero.x = town.x+Math.random()*50-25;
	hero.y = town.y+Math.random()*50-25;
	heros.push(hero);
}
