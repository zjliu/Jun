function drawTriangle(left_width, right_width, height, color, dir) {
	left_width = parseInt(left_width) + "px";
	right_width = parseInt(right_width) + "px";
	height = parseInt(height) + "px";
	var arr = {
		top: [height, right_width, 0, left_width],
		right: [left_width, height, right_width, 0],
		bottom: [0, left_width, height, right_width],
		left: [right_width, 0, left_width, height],
	}
	var arr = arr[dir];
	var div = document.createElement("div");
	div.style.width = "0px";
	div.style.height = "0px";
	div.style.border = "0px solid rgba(0,0,0,0)";
	div.style.borderWidth = arr.join(" ");
	div.style["border-" + dir + "-color"] = color;

	return div;
}

function drawRegularTriangle(width, color, dir) {
	var qWidth = parseInt(width) / 2;
	return drawTriangle(qWidth, qWidth, Math.sqrt(3) * qWidth, color, dir);
}

function drawTrapezoid(left_width, right_width, height, short_wh, color, dir) {
	var tEl = drawTriangle(left_width, right_width, height, color, dir);
	if (tEl) {
		short_wh = parseInt(left_width) + parseInt(right_width) + parseInt(short_wh) + "px"
		tEl.style.boxSizing = "border-box";
		if (dir === "top" || dir === "bottom") tEl.style.width = short_wh;
		if (dir === "left" || dir === "right") tEl.style.height = short_wh;
	}
	return tEl;
}

