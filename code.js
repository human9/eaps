var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
var svgNS = svg.namespaceURI;
svg.setAttribute('id', 'bg');
document.body.appendChild(svg);

var w = Math.min(Math.max(1000, window.innerWidth), 2600);
var pstart = [w/2-100, 400]; // start of parallel lines
var step = 18; // distance between lines
var pend = [pstart[0]+200, pstart[1]+160];

var mind = {c: '#0000FF', c0: [190,134], c1: [w- 397,257], l: []};
var leaf = {c: '#3AB649', c0: [108,193], c1: [w- 195,279], l: []};
var comp = {c: '#662D91', c0: [225,663], c1: [w- 355,505], l: []};
var blob = {c: '#ED1C23', c0: [82,pstart[1] + step*3], c1: [w- 336,790], l: []};
var meds = {c: '#F7931E', c0: [300,771], c1: [w- 110,404], l: []};
var vrus = {c: '#FFFF02', c0: [111,801], c1: [w- 197,pend[1]+5*step], l: []};

	var i = 0;
logos = [leaf, mind, comp, blob, meds, vrus];
for (var l = 0; l < logos.length; l++) {
    logos[l].l.push(logos[l].c0);
    if(l == 4) {
        logos[l].l.push([logos[l].c0[0]-140, logos[l].c0[1]]);
        logos[l].l.push([logos[l].c0[0]-140, pstart[1]+step*l]);
    }
    logos[l].l.push([logos[l].c0[0], pstart[1] + step * l]);
    logos[l].l.push([pstart[0]-100, pstart[1] + step * l]);
    logos[l].l.push([pstart[0]+100, pend[1] + step * l]);
    switch(l) {
        case 0:
            logos[l].l.push([pstart[0]+300, pend[1]]);
            logos[l].l.push([pstart[0]+300, logos[l].c1[1]+60]);
            logos[l].l.push([logos[l].c1[0]-60, logos[l].c1[1]+60]);
        break;
        case 1:
            logos[l].l.push([pstart[0]+350, pend[1]+step*l]);
            logos[l].l.push([pstart[0]+350, logos[l].c1[1]]);
        break;
        case 2:
            logos[l].l.push([pstart[0]+410, pend[1]+step*l]);
            logos[l].l.push([pstart[0]+410, logos[l].c1[1]]);
        break;
        case 3:
            opp = pend[0] - pstart[0];
            adj = pend[1] - pstart[1];
            theta = Math.atan(opp / adj);
            y = logos[l].c1[1];
            x = pstart[0] + Math.tan(theta) * (y - pstart[1]+l*step);
            logos[l].l.push([x, y]);
        break;
        case 4:
            logos[l].l.push([pstart[0]+380, pend[1]+step*l]);
            logos[l].l.push([pstart[0]+380, logos[l].c1[1]]);

        break;
        case 5:

        break;
    }
    logos[l].l.push(logos[l].c1);
    drawLogo(logos[l], 'logo');
}


function drawLogo(o, cl) {
    var l = drawLine(o.c, o.l, cl)
    var c0 = drawCircle(o.c, 20, o.c0, cl);
    var c1 = drawCircle(o.c, 40, o.c1, cl+i);
	i++;

	function biggly() {
		c0.setAttribute('r', 30);
		c1.setAttribute('r', 60);
		c0.setAttribute('fill', 'white');
		c1.setAttribute('fill', 'white');
		l.setAttribute('stroke-width', 9);
	}
	function smally() {
		c0.setAttribute('r', 20);
		c1.setAttribute('r', 50);
		c0.setAttribute('fill', shade(o.c, 0.66));
		c1.setAttribute('fill', shade(o.c, 0.66));
		l.setAttribute('stroke-width', 5);
	}
    c0.addEventListener("mouseover", function(event){
		biggly();
	});
    c0.addEventListener("mouseout", function(event){
		smally();
	});
    c1.addEventListener("mouseover", function(event){
		biggly();
	});
    c1.addEventListener("mouseout", function(event){
		smally();
	});
    l.addEventListener("mouseover", function(event){
		biggly();
	});
    l.addEventListener("mouseout", function(event){
		smally();
	});

}

function drawCircle(color, r, pos, cl)
{
    var c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('class', cl);
    c.setAttribute('cx', pos[0]);
    c.setAttribute('cy', pos[1]);
    c.setAttribute('r', r);
    c.setAttribute('fill', shade(color, 0.66));
    c.setAttribute('stroke', color);
    c.setAttribute('stroke-width', 5);
    svg.appendChild(c);
	return c;
}

function drawLine(color, points, cl)
{
    var l = document.createElementNS(svgNS, 'polyline');
    l.setAttribute('class', cl);
    l.setAttribute('points', points);
    l.setAttribute('stroke', color);
    l.setAttribute('fill', 'none');
    l.setAttribute('stroke-width', 5);
    svg.appendChild(l);
	return l;
}

function shade(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
