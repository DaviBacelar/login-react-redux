const models = require("./models")

module.exports = {
    create: (model, values) => {
        return new Promise((resolve, reject) => {
            if(!models[model]) return reject(`Model "${model}" is invalid`)
            else if(!values) return reject("Values are invalid")
            else {                
                new models[model](values).save(function (err, item) {
                   return err ? reject(err) : resolve(item)
                })                    
            }
        })
    },

    find: (model, filter, sortBy, select) => {  
        return new Promise((resolve, reject) => {            
            if(!models[model]) return reject("Model is invalid")
            else {
                models[model].find(filter).sort(sortBy ? sortBy : {created_on: -1})
                .select(select)                     
                .exec(function (err, itens) {
                    return err ? reject(err) : resolve(itens)
                })          
            }
        })
    },

    findOne: (model, filter, select) => {  
        return new Promise((resolve, reject) => {            
            if(!models[model]) return reject("Model is invalid")
            else if(!filter) return reject("Filter is invalid")  
            else {
                models[model].findOne(filter, select)
                .exec(function (err, item) {
                    return err ? reject(err) : resolve(item)
                })
            }
        })
    },

    updateMany: (model, filter, values) => {
        return new Promise((resolve, reject) => {
            if(!models[model]) return reject("Model is invalid")
            else if(!filter) return reject("Filter is invalid") 
            else if(!values) return reject(values) 
            else {
                models[model].updateMany(filter, values, function(err, item) {
                    return err ? reject(err) : resolve(item)  
                })
            }
        })
    },

    updateOne: (model, filter, values) => {
        return new Promise((resolve, reject) => {
            if(!models[model]) return reject("Model is invalid")
            else if(!filter) return reject("Filter is invalid") 
            else if(!values) return reject(values) 
            else {
                models[model].updateOne(filter, values, function(err, item) {
                    return err ? reject(err) : resolve(item)  
                })
            }
        })
    },

    findOneAndRemove: (model, filter) => {
        return new Promise((resolve, reject) => {
            if(!models[model]) return reject("Model is invalid")
            else if(!filter) return reject("Filter is invalid")  
            else {
                models[model].findOneAndRemove(filter, function(err, item) {
                    return err ? reject(err) : resolve(item)            
                })
            }
        })
    },

    search: (model, searchString, sortBy) => {        
        return new Promise((resolve, reject) => {            
            if(!models[model]) return reject("Model is invalid")
            else {
                models[model].find(
                       { $text: { $search: searchString } },
                       { score: { $meta: "textScore" } }
                    )
                .sort({ score: { $meta: "textScore" } })                     
                .exec(function (err, itens) {
                    return err ? reject(err) : resolve(itens)
                })          
            }
        })
    },

    searchAll: (searchString, sortBy) => {        
        return new Promise((resolve, reject) => {            
            let searchResults = {};
            let modelsArray = ['dates', 'news', 'estudies'];
            let searchedArray = [];
            modelsArray.map((model, index) => {
                models[model].find(
                   { $text: { $search: searchString } },
                   { score: { $meta: "textScore" } }
                )
                .sort({ score: { $meta: "textScore" } })                     
                .exec(function (err, itens) {
                    searchedArray.push(model);
                    if(itens)
                        searchResults[model] = itens;
                    if(searchedArray.length == modelsArray.length) 
                        return resolve(searchResults)
                })  
            })
            
        })
    }
}