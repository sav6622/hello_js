'use strict';

const ToneSignal = require('./tone');

var sin800Hz = new ToneSignal(800, 0.5);
var sin300Hz = new ToneSignal(400, 0.5);

for (let i = 0; i < 15; i++) {
    console.log(sin300Hz.arg,sin300Hz.generator_int(),sin800Hz.arg,sin800Hz.generator_int());
}
console.log("End");
