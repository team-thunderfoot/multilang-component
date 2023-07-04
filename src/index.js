/**
 * Styles
 */
// import "./index.scss";

/**
 * Lazy Loading
 */
import Blazy from "blazy"
class Index {
    constructor() {
        this.init()
    }
    init() {
        // lazy loading for images
        new Blazy({
            selector: ".g--lazy-01",
            successClass: "g--lazy-01--is-loaded",
            errorClass: "g--lazy-01--is-error",
            loadInvisible: true,
        })
    }
}

export default Index
new Index()
