var canvas = document.getElementById("canvas"); //canvas
var ctx = canvas.getContext("2d");
var ballR = 10,
    x = canvas.width / 2, 
    y = canvas.height - 30,
    dx = 3, 
    dy = -3, 
    pongH = 13, 
    pongW = 120, 
    pongX = (canvas.width - pongW) / 2,
    rightKey = false, 
    leftKey = false, 
    brickRows = 3, 
    brickCol = 9,
    brickW = 76, 
    brickH = 25, 
    brickPadding = 7, 
    brickOffsetTop = 30,
    brickOffsetLeft = 30;
				  
    var bricks = [];
                
    for (c = 0; c < brickCol; c++) { //risanje bricksou
        for (r = 0; r < brickRows; r++) {
        	bricks.push({
    		x : (c * (brickW + brickPadding)) + brickOffsetLeft,
    		y : (r * (brickH + brickPadding)) + brickOffsetTop,
            status : 1
    		});
    	 }
       }
			   
       function drawBall() { //zogica
    	 ctx.beginPath();
    	 ctx.arc(x, y, ballR, 0, Math.PI * 2);
    	 ctx.fillStyle = "#9768D1";
    	 ctx.fill();
    	 ctx.closePath();
    	}
			   
       function drawPong() { //kvadratek za odbijat
    	 ctx.beginPath();
    	 ctx.rect(pongX, canvas.height - pongH, pongW, pongH);
    	 ctx.fillStyle = "#553285";
    	 ctx.fill();
    	 ctx.closePath();
	   }
			   
       function drawBricks() { //bricks izgled
    	 bricks.forEach(function(brick) {
    	   if (!brick.status) return;
	   
    	   ctx.beginPath();
    	   ctx.rect(brick.x, brick.y, brickW, brickH);
    	   ctx.fillStyle = "#553285";
    	   ctx.fill();
    	   ctx.closePath();
    	     });
        }
			   
       function collisionDetection() { //odboj
    	 bricks.forEach(function(b) {
    	   if (!b.status) return;
				   
    	   var inBricksColumn = x > b.x  &&  x < b.x + brickW,
    		   inBricksRow = y > b.y  &&  y < b.y + brickH;
					   
    		   if (inBricksColumn && inBricksRow) {
    			 dy = -dy;
    			 b.status = 0;
    		   }
    	 });
    	}
			   
       function draw() {  //delovanje
    	 ctx.clearRect(0, 0, canvas.width, canvas.height);
    	 drawBricks();
    	 drawBall();
    	 drawPong();
    	 collisionDetection();
				 
    	 if (hitSideWall()) //stranski zidi
    	   dx = -dx;
				   
    	 if (hitTop()  ||  hitPong()) //vrhni zid
    	   dy = -dy;
				
    	 if (gameOver()) //ko zgubis
    	   document.location.reload();
				   
    	 var RIGHT_ARROW = 39, LEFT_ARROW = 37;
				 
    	 function hitPong(){
    	     return hitBottom() && ballOverPong();
    	}
         function ballOverPong(){
        	  return x > pongX  &&  x < pongX + pongW;
    	}
         function hitBottom(){
        	  return y + dy > canvas.height - ballR;
    	}
    	 function gameOver(){
              return hitBottom() && !ballOverPong();
    	}
    	 function hitSideWall(){
    		  return x + dx > canvas.width - ballR || x + dx < ballR;
    	}
    	 function hitTop(){
        	  return y + dy < ballR;
    	}
         function xOutOfBounds(){
         	  return x + dx > canvas.width - ballR ||  x + dx < ballR;
    	}
         function rightPressed(e){
              return e.keyCode == RIGHT_ARROW;
    	}
         function leftPressed(e){
              return e.keyCode == LEFT_ARROW;
    	}
         function keyDown(e){
              rightKey = rightPressed(e);
              leftKey = leftPressed(e);
         }
				 
         function keyUp(e) { 
              rightKey = rightPressed(e) ? false : rightKey;
              leftKey = leftPressed(e) ? false : leftKey;
         }

         function mouseMoveHandler(e) {
            var relativeX = e.clientX - canvas.offsetLeft;
            if(relativeX > 0 && relativeX < canvas.width) {
                pongX = relativeX - pongH/2;
            }
        }
				 
         document.addEventListener("keydown", keyDown, false);
         document.addEventListener("keyup", keyUp, false);
         document.addEventListener("mousemove", mouseMoveHandler, false);
				 
    	 var maxX = canvas.width - pongW, minX = 0, pongDelta = rightKey ? 7 : leftKey ? -7 : 0;
				 
    	 pongX = pongX + pongDelta;
    	 pongX = Math.min(pongX, maxX);
    	 pongX = Math.max(pongX, minX);
				 
    	 x += dx;
    	 y += dy;
       }
			   
       setInterval(draw, 10);
               