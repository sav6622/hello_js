'use strict';

//Global consts
const FREQ = 8000;       
const BITS_PER_VOICE_SAMPLE = 16;
const PRECISION = 0.001;

//Local class consts
const PI = Math.PI;
const TWO_POW_32 = Math.pow(2, 32);
const TWO_POW_31 = Math.pow(2, 31);
const TWO_POW_BITS_PER_SAMPLE = Math.pow(2, BITS_PER_VOICE_SAMPLE);
const PI_DIVIDE_BY_TWO_POW_31 = PI/TWO_POW_31;
const TWO_POW_32_DIVIDE_BY_FREQ = TWO_POW_32/FREQ;

//Define the class for generate tone signals
class ToneSignal {
    constructor(freq, i_nom_level) {                    //Constructor
        this.level_old = this.nom_level = i_nom_level; 
        this.freq_old = freq;
        this.inc_arg = Math.round(freq*TWO_POW_32_DIVIDE_BY_FREQ);  
        this.arg = 0;
        this.out_float = 0;
        this.out_int = 0;
    }

    generator_float() {                                 //Generate float tone signal
        let out_gen = 0;
        out_gen = this.nom_level * Math.sin(PI_DIVIDE_BY_TWO_POW_31 * this.arg);
	    
        this.arg += this.inc_arg;                       
        if (this.arg > TWO_POW_32) {                    
            this.arg -= TWO_POW_32; 
        }
	
	    this.out_float = out_gen;						
	    return this.out_float;
    }

    generator_int() {                                   //Generate int tone signal
        this.out_int = Math.round(this.generator_float() * TWO_POW_BITS_PER_SAMPLE);   
	    return this.out_int;
    }

    reset() {                                           //Reset the generator tone signal
        this.arg = 0;
        this.out_float = 0;
        this.out_int = 0;
    }

    change_freq(freq) {                                 //Change the frequency of tone signal
        if (Math.abs(freq - this.freq_old) > PRECISION) {
            this.freq_old = this.freq;
            this.freq = freq;
            this.inc_arg = Math.round((freq*TWO_POW_32_DIVIDE_BY_FREQ));
            this.reset();
        }
    }
    
    change_level(level) {                               //Change the level of tone signal
        if (Math.abs(level - this.nom_level) > PRECISION) {
            this.nom_level = level;
            this.reset();
        }
    }
  }

module.exports = ToneSignal;