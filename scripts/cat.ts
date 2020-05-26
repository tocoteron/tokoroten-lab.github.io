interface Point {
    x: number;
    y: number;
}

interface Division {
    width: number;
    height: number;
}

interface CatEye {
    ball: HTMLElement;
    client: {
        centerPos: Point;
        size: Division;
    };
    svg: {
        centerPos: Point;
        size: Division;
    };
}

function moveCatEyes(catEyes: CatEye[], mousePos: Point) {
    catEyes.forEach((catEye) => {
        const ClientXDiff = mousePos.x - catEye.client.centerPos.x;
        const ClientYDiff = mousePos.y - catEye.client.centerPos.y;
        const ClientXRange = Math.min(
            Math.abs(ClientXDiff),
            (catEye.client.size.width - catEye.ball.getBoundingClientRect().width) / 2
        );
        const ClientYRange = Math.min(
            Math.abs(ClientYDiff),
            (catEye.client.size.height - catEye.ball.getBoundingClientRect().height) / 2
        );
        const ClientToSVGCoeffX = catEye.svg.size.width / catEye.client.size.width;
        const ClientToSVGCoeffY = catEye.svg.size.height / catEye.client.size.height;
        const rad = Math.atan2(ClientYDiff, ClientXDiff);

        const CatEyeCX = catEye.svg.centerPos.x + ClientXRange * ClientToSVGCoeffX * Math.cos(rad);
        const CatEyeCY = catEye.svg.centerPos.y + ClientYRange * ClientToSVGCoeffY * Math.sin(rad);

        catEye.ball.setAttribute("cx", Math.round(CatEyeCX).toString());
        catEye.ball.setAttribute("cy", Math.round(CatEyeCY).toString());
    })
}

function getCatEyes(): CatEye[] {
    return ["1", "2"].map((eyeIdx) => {
        const catEye = document.getElementById(`cat-eye-${eyeIdx}`);
        const catEyeBall = document.getElementById(`cat-eyeball-${eyeIdx}`);
        const CatEyeBounds = catEye.getBoundingClientRect();
        const CatEyeClientCenterX = (CatEyeBounds.left + CatEyeBounds.right) / 2 + window.pageXOffset;
        const CatEyeClientCenterY = (CatEyeBounds.top + CatEyeBounds.bottom) / 2 + window.pageYOffset;
        return {
            ball: catEyeBall,
            client: {
                centerPos: {
                    x: CatEyeClientCenterX,
                    y: CatEyeClientCenterY,
                },
                size: {
                    width: CatEyeBounds.width,
                    height: CatEyeBounds.height,
                }
            },
            svg: {
                centerPos: {
                    x: parseFloat(catEye.getAttribute("cx")),
                    y: parseFloat(catEye.getAttribute("cy")),
                },
                size: {
                    width: parseFloat(catEye.getAttribute("rx")) * 2,
                    height: parseFloat(catEye.getAttribute("ry")) * 2,
                }
            }
        }
    });
}

window.onload = function() {
    document.addEventListener("mousemove", function(e) {
        let OriginalCatEyes = getCatEyes();
        let mousePos: Point = {
            x: e.pageX,
            y: e.pageY,
        };

        moveCatEyes(OriginalCatEyes, mousePos);
    });
}
