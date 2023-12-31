import gsap from "gsap";
// import { GSDevTools } from 'gsap';
import {ScrambleTextPlugin} from "gsap/ScrambleTextPlugin";
gsap.registerPlugin(ScrambleTextPlugin);
// gsap.registerPlugin(GSDevTools);

import {tf_debounce,tf_throttle} from '@andresclua/debounce-throttle';

class Multilang {
    constructor() {
        this.DOM = {
            textContainer: document.querySelectorAll(".js--multilang"),
            paragraph: document.querySelectorAll(".js--lineHeight"),
        };
        this.init();
    }
    init() {

        this.textHeight();
        window.addEventListener('resize', tf_debounce((e)=>{
            this.textHeight();
        },500));

        this.multilang();
    }

    textHeight() {
        if(this.DOM.paragraph){
            this.DOM.paragraph.forEach(section => {
                section.style.minHeight = 0;
                var style = window.getComputedStyle(section, null);

                this.height = section.offsetHeight;
                // console.log('height ' + this.height);

                this.lineHeight = style.getPropertyValue('line-height');
                // console.log('lineHeight ' + this.lineHeight);

                this.extraLines = section.getAttribute('data-extra-lines');

                this.minHeight = 'calc(' + this.height + 'px + ' + this.lineHeight + '*' + this.extraLines + ')';

                section.style.minHeight = this.minHeight;
            })
        }
    }

    multilang() {

        if(this.DOM.textContainer){
            this.DOM.textContainer.forEach((section, i) => {
                this.text = section.getAttribute('data-words');
                this.textElement = this.text.split(",,");
                var tl = gsap.timeline({repeat:-1, delay:0, defaults: {ease: "none"}, repeatDelay: 2});
                this.textElement.forEach((element, index) => {
                    tl.to(section, {duration: 2, delay: (index == 0 ? 0 : 4), scrambleText: {text: element, chars: "terra", revealDelay: 1, tweenLength: true, newClass: (i == 0 || i == 1 ? this.getClass(index) : '')}})
                })
                // GSDevTools.create({animation: tl, minimal: true});
            })
        }
    }

    getClass(index){
        switch (index) {
            // case 0:
            //     return 'f--color-g'
            // break;
            // case 1:
            //     return 'f--color-h'
            // break;
            // case 2:
            //     return 'f--color-f'
            // break;
            default:
                if (index % 3 === 0){
                    return 'f--color-g'
                } else if ((index-1) % 3 === 0){
                    return 'f--color-h'
                } else if ((index-2) % 3 === 0){
                    return 'f--color-f'
                }
            break;
        }
    }
}

export default Multilang
new Multilang()
