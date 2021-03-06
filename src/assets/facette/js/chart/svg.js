chart.fn.drawSVG = function() {
    var $$ = this,
        element = d3.select($$.config.bindTo),
        elementOld = element.selectAll('svg.chart');

    if (elementOld.node()) {
        // Preserve legend state
        $$.config.legend.enabled = chart.get(elementOld.node()).config.legend.enabled;

        // Remove existing chart
        elementOld.remove();
        element.selectAll('.chart-tooltip').remove();
    }

    // Set chart dimensions
    $$.width = $$.config.bindTo.clientWidth;
    $$.height = $$.config.bindTo.clientHeight;

    // Draw main SVG chart compoment
    $$.svg = element.append('svg')
        .attr('class', 'chart')
        .attr('width', $$.width)
        .attr('height', $$.height);

    $$.svg.node()._chart = this;
};

chart.fn.getSVG = function() {
    var node = this.svg.node(),
        clone = node.cloneNode(true);

    clone.setAttribute('version', '1.1');
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    chart.utils.inlineStyles(node, clone);

    // Remove UI-related nodes
    d3.select(clone).selectAll('.chart-cursor, .chart-event, .chart-zoom').remove();

    return new XMLSerializer().serializeToString(clone);
};
