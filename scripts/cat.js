function moveCatEyes(catEyes, mousePos) {
    catEyes.forEach(function (catEye) {
        var ClientXDiff = mousePos.x - catEye.client.centerPos.x;
        var ClientYDiff = mousePos.y - catEye.client.centerPos.y;
        var ClientXRange = Math.min(Math.abs(ClientXDiff), (catEye.client.size.width - catEye.ball.getBoundingClientRect().width) / 2);
        var ClientYRange = Math.min(Math.abs(ClientYDiff), (catEye.client.size.height - catEye.ball.getBoundingClientRect().height) / 2);
        var ClientToSVGCoeffX = catEye.svg.size.width / catEye.client.size.width;
        var ClientToSVGCoeffY = catEye.svg.size.height / catEye.client.size.height;
        var rad = Math.atan2(ClientYDiff, ClientXDiff);
        var CatEyeCX = catEye.svg.centerPos.x + ClientXRange * ClientToSVGCoeffX * Math.cos(rad);
        var CatEyeCY = catEye.svg.centerPos.y + ClientYRange * ClientToSVGCoeffY * Math.sin(rad);
        catEye.ball.setAttribute("cx", Math.round(CatEyeCX).toString());
        catEye.ball.setAttribute("cy", Math.round(CatEyeCY).toString());
    });
}
function getCatEyes() {
    return ["1", "2"].map(function (eyeIdx) {
        var catEye = document.getElementById("cat-eye-" + eyeIdx);
        var catEyeBall = document.getElementById("cat-eyeball-" + eyeIdx);
        var CatEyeBounds = catEye.getBoundingClientRect();
        var CatEyeClientCenterX = (CatEyeBounds.left + CatEyeBounds.right) / 2 + window.pageXOffset;
        var CatEyeClientCenterY = (CatEyeBounds.top + CatEyeBounds.bottom) / 2 + window.pageYOffset;
        return {
            ball: catEyeBall,
            client: {
                centerPos: {
                    x: CatEyeClientCenterX,
                    y: CatEyeClientCenterY
                },
                size: {
                    width: CatEyeBounds.width,
                    height: CatEyeBounds.height
                }
            },
            svg: {
                centerPos: {
                    x: parseFloat(catEye.getAttribute("cx")),
                    y: parseFloat(catEye.getAttribute("cy"))
                },
                size: {
                    width: parseFloat(catEye.getAttribute("rx")) * 2,
                    height: parseFloat(catEye.getAttribute("ry")) * 2
                }
            }
        };
    });
}
window.onload = function () {
    document.addEventListener("mousemove", function (e) {
        var OriginalCatEyes = getCatEyes();
        var mousePos = {
            x: e.pageX,
            y: e.pageY
        };
        moveCatEyes(OriginalCatEyes, mousePos);
    });
};
