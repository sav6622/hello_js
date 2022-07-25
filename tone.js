'use strict';

const FREQ = 8000;       
const PI = Math.PI;
const TWO_POW_32 = Math.pow(2, 32);
const TWO_POW_31 = Math.pow(2, 31);
const BITS_PER_SAMPLE = 16;
const TWO_POW_BITS_PER_SAMPLE = Math.pow(2, BITS_PER_SAMPLE);
const PI_DIVIDE_BY_TWO_POW_31 = PI/TWO_POW_31;
const TWO_POW_32_DIVIDE_BY_FREQ = TWO_POW_32/FREQ;

class ToneSignal {
    constructor(freq, i_nom_level) {
        this.level_old = this.nom_level = i_nom_level; 
        this.freq_old = freq;
        this.inc_arg = Math.round((freq*TWO_POW_32_DIVIDE_BY_FREQ));  
        this.arg = 0;
        this.out_float = 0;
        this.out_int = 0;
    }

    generator_float() {    
        let out_gen = 0;
        out_gen = this.nom_level * Math.sin(PI_DIVIDE_BY_TWO_POW_31 * this.arg);
	    
        this.arg += this.inc_arg;                       
        if (this.arg > TWO_POW_32) {                    
            this.arg -= TWO_POW_32; 
        }
	
	    this.out_float = out_gen;						
	    return this.out_float;
    }

    generator_int() {    
        this.out_int = Math.round(this.generator_float() * TWO_POW_BITS_PER_SAMPLE);   
	    return this.out_int;
    }

    reset() {
        this.arg = 0;
        this.out_float = 0;
        this.out_int = 0;
    }

    change_freq(freq) {
        if (freq != this.freq_old) {
            this.freq_old = this.freq;
            this.freq = freq;
            this.inc_arg = Math.round((freq*TWO_POW_32_DIVIDE_BY_FREQ));
            this.reset();
        }
    }
    
    change_level(level) {
        if (level != this.nom_level) {
            this.nom_level = level;
            this.reset();
        }
    }
  }

module.exports = ToneSignal;