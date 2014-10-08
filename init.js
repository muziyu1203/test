//公共函数
function addEvtHandler(ele,evtType,func){
	if(ele.addEventListener){
		ele.addEventListener(evtType,func,false);
	}else if(ele.attachEvent){
		ele.attachEvent('on'+evtType,func);
	}else{
		ele['on'+evtType]=func;
	}
	// if (evt == 'mousewheel') { //对于mousewheel事件单独处理 ff
	// 	ele.addEventListener("DOMMouseScroll", func, false);
	// }

}
/**
 * 通过类名获取元素
 * @param  {[type]} classflag 类名
 * @param  {[type]} node      指定节点
 * @return {[type]}           [description]
 */
function getElesByclass(classflag,node){
	var elements=[];
	if(!document.getElementsByClassName){
		var children=(node || document).getElementsByTagName('*'); //如果未指定元素，则获取所有标签
		for(var i=0,len=children.length;i<len;i++){
			var child=children[i];
			if(child.className==classflag){
				elements.push(child);
			}
		}
	}else{
		elements=document.getElementsByClassName(classflag);
	}
	
	return elements;
}
/**
 * 获取要素样式
 */
function getEleStyle(obj,attr){
  return obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, null)[attr];

}

//绘制的通用函数
function drawText(ctx,text,x,y){
	//ctx.textBaseline='middle';
	//ctx.textAlign='center';
	ctx.fillText(text,x,y);  //maxwidth
}
function drawHollowText(ctx,text,x,y){
	ctx.strokeText(text,x,y);  //maxwidth
}
function showInCenter(canvas,text){
	var ctx=canvas.getContent('2d');
	var metrics=ctx.measureText(text);   //返回的对象中包含一个width属性
	var txtWid=metrics.width;   //文本的宽度
	var x=canvas.width/2-txtWid/2;
	var y=canvas.height/2;
	ctx.fillText(text,x,y);
}
function drawPoint(ctx,point,radius){
	ctx.beginPath();
   	ctx.arc(point.x,point.y,radius,0,Math.PI*2,true);
    ctx.fillStyle='red';
    ctx.closePath();
   	ctx.fill();
}
function drawImg(ctx,point,selectedImg,size){  //在该点绘制图标
    var imgw=parseInt(getEleStyle(selectedImg,'width')); 
    var imgh=parseInt(getEleStyle(selectedImg,'height'));  
    var startX=point.x-imgw/2; 
    var startY=point.y-imgh;  
	ctx.drawImage(selectedImg,startX,startY,size,size);
 }
function drawLine(ctx,pointArr){
	ctx.beginPath();
	ctx.moveTo(pointArr[0].x,pointArr[0].y);
   	for(var i=1,len=pointArr.length;i<len;i++){	
   	    ctx.lineTo(pointArr[i].x,pointArr[i].y);
   	}
   	ctx.stroke();
}
function drawPolygon(ctx,pointArr){
	ctx.beginPath();    //清除内存中的路径 开辟新路径
   	ctx.moveTo(pointArr[0].x,pointArr[0].y);
   	for(var i=1,len=pointArr.length;i<len;i++){	
   	    ctx.lineTo(pointArr[i].x,pointArr[i].y);
   	}
   	ctx.closePath();  //闭合路径
   	ctx.fill();
   	ctx.stroke();
}
	/**
	 * 绘制虚线
	 * @param  {[type]} p1   起点
	 * @param  {[type]} p2   终点
	 * @param  {[type]} dis1 虚线端的长度
	 * @param  {[type]} dis2 虚线段之间的间隔
	 */
function drawDashLine(ctx,p1,p2,dis1,dis2){  
		ctx.beginPath();
		var x=p1.x;
		var y=p1.y;
		var x2=p2.x;
		var y2=p2.y;
		var dashArray = [dis1, dis2];
		var dashCount = dashArray.length;
	    ctx.moveTo(x, y);
	    var dx = (x2 - x),
	    dy = (y2 - y);
	    var slope = dy / dx;
	    var distRemaining = Math.sqrt(dx * dx + dy * dy);
	 
	    var dashIndex = 0,draw = true;
	    while (distRemaining >= 0.1) {
		var index=(dashIndex++) % dashCount;
		var dashLength = dashArray[index];
		if (dashLength > distRemaining) dashLength = distRemaining;
		var xStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
		//console.log(xStep);
		if (dx < 0) xStep = -xStep;
		x += xStep;
		y += slope * xStep;
		if(draw){
			ctx.lineTo(x,y);	
		}else{
			ctx.moveTo(x,y);	
		}
		distRemaining -= dashLength;
		draw = !draw;
	}
	ctx.stroke();
}
/**
 * 绘制箭头箭头 默认长度10  夹角30
 * @param  {[type]} ctx     
 * @param  {[type]} lastpos 方向线的起点
 * @param  {[type]} currpos 方向线的终点
 */
function drawArror(ctx,lastpos,currpos){
 var arrorLen=10;
// var arrorAngle=30;
 var angle=parseInt(Math.atan2(currpos.y-lastpos.y,currpos.x-lastpos.x)/Math.PI*180);
 var arror1_x=currpos.x - parseInt(arrorLen * Math.cos(Math.PI/180*(angle + 30)));
 var arror1_y=currpos.y - parseInt(arrorLen * Math.sin(Math.PI/180*(angle + 30)));
 var arror2_x=currpos.x - parseInt(arrorLen * Math.cos(Math.PI/180*(angle - 30)));
 var arror2_y=currpos.y - parseInt(arrorLen * Math.sin(Math.PI/180*(angle - 30)));
 ctx.beginPath();
 ctx.moveTo(arror1_x,arror1_y);
 ctx.lineTo(currpos.x,currpos.y);
 ctx.lineTo(arror2_x,arror2_y);
 ctx.strokeStyle="red";
 ctx.lineWidth=3;
 ctx.stroke();
 ctx.closePath();
}