import gsap from "gsap";
import { GSDevTools } from 'gsap';
import {ScrambleTextPlugin} from "gsap/ScrambleTextPlugin";
gsap.registerPlugin(ScrambleTextPlugin);

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

                this.minHeight = 'calc(' + this.height + 'px + ' + this.lineHeight + '*2)';

                section.style.minHeight = this.minHeight;
            })
        }
    }

    multilang() {

        if(this.DOM.textContainer){
            this.DOM.textContainer.forEach(section => {
                this.text = section.getAttribute('data-words');
                this.textElement = this.text.split(",,");
                var tl = gsap.timeline({repeat:-1, delay:0, defaults: {ease: "none"}, repeatDelay: 2});
                this.textElement.forEach((element, index) => {
                    tl.to(this.DOM.textContainer, {duration: 2, delay: (index == 0 ? 0 : 4), scrambleText: {text: element, chars: "terra", revealDelay: 1, tweenLength: true, newClass: this.getClass(index)}})
                })
                // GSDevTools.create({animation: tl, minimal: true});
            })
        }
    }

    getClass(index){
        switch (index) {
            case 0:
                return 'f--color-g'
            break;
            case 1:
                return 'f--color-h'
            break;
            case 2:
                return 'f--color-f'
            break;
            default:
            break;
        }
    }
}

export default Multilang
new Multilang()
