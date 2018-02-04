var vlSpec = {
    '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
    'data': { 'url': 'https://vega.github.io/vega-lite/data/stocks.csv' },
    'mark': 'line',
  "encoding": {
    "x": {"field": "date", "type": "temporal", "axis": {"format": "%Y"}},
    "y": {"field": "price", "type": "quantitative"},
    "color": {"field": "symbol", "type": "nominal"}
  }
};
vegaEmbed('#chart', vlSpec).then(function(res) {
    /**
     * Generates a new tuple with random walk.
     */
    // function newGenerator() {
    //     var counter = -1;
    //     var previousY = [5, 5, 5, 5];
    //     return function () {
    //         counter++;
    //         var newVals = previousY.map(function (v, c) { return ({
    //             x: counter,
    //             y: v + Math.round(Math.random() * 10 - c * 3),
    //             category: c
    //         }); });
    //         previousY = newVals.map(function (v) { return v.y; });
    //         return newVals;
    //     };
    // }

    // var valueGenerator = newGenerator();
    // var minimumX = -100;
    // window.setInterval(function () {
    //     minimumX++;
    //     var changeSet = vega.changeset().insert(valueGenerator()).remove(function (t) { return t.x < minimumX; });
    //     res.view.change('url', changeSet).run();
    // }, 500);
    console.log(res.view);

});
