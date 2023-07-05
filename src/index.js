/**
/**
 * Lazy Loading
 */
// import Blazy from "blazy";
import Multilang from "./multilang";

class Index {
    constructor() {
        this.init()
    }
    init() {
        // lazy loading for images
        // new Blazy({
        //     selector: ".g--lazy-01",
        //     successClass: "g--lazy-01--is-loaded",
        //     errorClass: "g--lazy-01--is-error",
        //     loadInvisible: true,
        // })

        new Multilang();
    }
}

export default Index
new Index()
