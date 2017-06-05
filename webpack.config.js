
module.exports={
    entry:{
        simple: './test/simple.dust',
        layout: './test/layout.dust'
    },

    module:{
        rules:[{test:/\.dust$/, loader:'./',query:{rootPath:`${__dirname}/test/`}}]
    },

    output:{
        path: `${__dirname}/test/output`,
        filename:'[name].js'
    }
}
