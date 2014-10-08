// JavaScript Document
//»­ÐéÏß

function dashedLine(x, y, x2, y2,event) {
	var dashArray = [10, 5];
	//if (dashLength == 0) dashLength = 0.001; // Hack for Safari
	var dashCount = dashArray.length;
	context.moveTo(x, y);
	var dx = (x2 - x),
	dy = (y2 - y);
	var slope = dy / dx;
	var distRemaining = Math.sqrt(dx * dx + dy * dy);
	if(distRemaining>10){
		centerX=event.offsetX;
		centerY=event.offsetY;	
	}
	var dashIndex = 0,
	draw = true;
	while (distRemaining >= 0.1) {
		var index=(dashIndex++) % dashCount;
		var dashLength = dashArray[index];
		if (dashLength > distRemaining) dashLength = distRemaining;
		var xStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
		if (dx < 0) xStep = -xStep;
		x += xStep;
		y += slope * xStep;
		if(draw){
			context.lineTo(x,y);	
		}else{
			context.moveTo(x,y);	
		}
		distRemaining -= dashLength;
		draw = !draw;
	}
}

