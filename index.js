const dust = require("dustjs-linkedin")
const path = require("path")
const fs = require("fs")

/**
 * Recursively process dust template
 * @param {string} src Source Code
 * @param {string} name Template name
 * @param {string} rootPath The root path of the template folder
 * @param {boolean} isPartial Render as partial
 */
function recursiveCompile(src, name, rootPath, isPartial = false) {
    let compiledSrc = dust.compile(src, name)
    let regPartials = /\.p\(\"([^\"]*)\"/g
    let partialMatches
    let dependencies = []

    // Find and process partials
    while ((partialMatches = regPartials.exec(compiledSrc)) !== null) {
        // Avoid infinite loops
        regPartials.lastIndex += partialMatches === regPartials.lastIndex ? 1 : 0

        // Set Partial name and fetch source
        let templateName = `${partialMatches[1]}.dust`.replace(".dust.dust", ".dust")
        let templateSource = fs.readFileSync(path.join(rootPath, templateName)).toString("utf-8")

        // Push compiled partial into dependencies list
        dependencies.push(recursiveCompile(templateSource, partialMatches[1], rootPath, true))
        this.addDependency(templateSource);
    }

    return `${dependencies.join("")};${compiledSrc};module.exports = ${isPartial ? null : `function(context,callback=()=>{}){dust.render('${name}',context,callback);};`}`
}

function loader(source) {
    this.cacheable();

    let defaultOptions = {
        rootPath: ""
    }
    
    // Construct options
    let options = Object.assign({}, defaultOptions, this.query)
    options.root = path.resolve(options.rootPath)

    // Create relative template name based on rootPath
    let name = this.resourcePath.replace(options.rootPath, "").replace(".dust", "")

    return recursiveCompile.bind(this)(source, name, options.rootPath, false)
}

module.exports = loader
