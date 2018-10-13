export class CreateGraphic {
    constructor(args) {
        this.lineData = [{"x": 0, "y": 0}]
        this.svgContainer = args.svgContainer
        this.lineColor = args.color || 'green'
        this.pathStyle = args.pathStyle || {
            lc: "round",
            lj: "round",
            width: 5
        }
        this.type = args.type || 'time'
        this.frequency = args.frequency || 'minutes'
        this.time = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
        this.clicks = 0
        this.svgContainer = d3.select("body").append("svg")
                .attr("width", 1000)
                .attr("height", 1000);

    }

    createLineData () {
        if (this.type == 'time') {
            switch(this.frequency) {
                case 'hours':
                    return this.lineData.push({
                        x: this.time.split(':')[0],
                        y: this.clicks
                    })
                break;
                case 'minutes':
                    return this.lineData.push({
                        x: parseInt(this.time.split(':')[0]) + parseInt(this.time.split(':')[1]),
                        y: this.clicks
                    })
                break;
                case 'seconds':
                    return this.lineData.push({
                        x: parseInt(this.time.split(':')[0]) + parseInt(this.time.split(':')[1]) + parseInt(this.time.split(':')[2]),
                        y: this.clicks
                    })
                break;
            }
        }
    }

    drawLine () {
        // set new click
        this.clicks+=1
        //This is the accessor function we talked about above
        const lineFunction = d3.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .curve(d3.curveLinear);
        
        //The line SVG Path we draw
        const lineGraph = this.svgContainer.append("path")
            .attr("d", lineFunction(this.createLineData()))
            .attr("stroke", this.lineColor)
            .style("stroke-linecap", this.pathStyle.lc)
            .style("stroke-linejoin", this.pathStyle.lj)
            .attr("stroke-width", this.pathStyle.width)
            .attr("fill", "none");
    }
    
}