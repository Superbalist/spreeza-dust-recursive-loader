# dust-recursive-loader
A webpack loader for processing DustJs templates including processing any dependencies found (layout and partials)

## Overview
dust-recursive-loader is a webpack loader that compiles DustJS template files into their JavaScript template functions.
### Features:
1. Returns a function that can be directly called with context and callback.
2. It finds all layout and partial dependencies and adds them to your bundle.

## Installation
```
    npm install --save-dev dust-recursive-loader
```
	
## Usage

### Webpack Loader config
```javascript
    { test: /\.dust$/, loader: "dust-recursive-loader",options:{ rootPath:'/' } }
```
### Options
#### rootPath
Set a root path for your dust templates. This root will be removed from the beginning of the dust module path before it is turned into the template name.

