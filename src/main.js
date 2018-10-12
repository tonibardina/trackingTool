import { getTime } from "./utils/getTime";
let tracking = []
let webPageHaveIframes = document.querySelectorAll('iframe').length;
let iframes = Array.from(webPageHaveIframes)
let lineData= [{"x": 10, "y": 0}]
let clicks = 0;


//The data for our line
const drawLine = (data) => {
    clicks += 2
    lineData.push({
        x: (parseInt(data.split(':')[0]) + parseInt(data.split(':')[1])) * 10,
        y: clicks
    })
}

//The SVG Container
const svgContainer = d3.select("body").append("svg")
 .attr("width", 1000)
 .attr("height", 1000);


const clickEvent = (e) => {
    drawLine(getTime())
    //This is the accessor function we talked about above
    const lineFunction = d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .curve(d3.curveLinear);

    //The line SVG Path we draw
    const lineGraph = svgContainer.append("path")
        .attr("d", lineFunction(lineData))
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    if (tracking.length) {
        return tracking = [
            ...tracking,
            {
                stepId: e.timeStamp,
                clickMoment: getTime(),
                elementClicked: {
                    className: e.toElement.className,
                    textContent: e.toElement.textContent,
                    tagName: e.toElement.tagName
                },
                lastClick: tracking[tracking.length - 1].clickMoment
            }
        ]
    } else {
        return tracking = [
            {
                stepId: e.timeStamp,
                clickMoment: getTime(),
                elementClicked: {
                    className: e.toElement.className,
                    textContent: e.toElement.textContent,
                    tagName: e.toElement.tagName
                },
                lastClick: 'firstClick'
            }
        ]
    }
}

if (webPageHaveIframes) {
    iframes.forEach(iframe => {
        iframe.contentDocument.find('body').addEventListener('click', clickEvent)
    })
    document.querySelector('body').addEventListener('click', clickEvent)
} else {
    document.querySelector('body').addEventListener('click', clickEvent)
}

