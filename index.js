'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('./swagger.json');
let swagger = JSON.parse(rawdata);


//console.log(swagger.components.schemas);

if (swagger && swagger.components && swagger.components.schemas) {

    /*              if(schema && schema.properties)
                 {
 
                 } */
    let obj = swagger.components.schemas;
    for (const key of Object.keys(obj)) {
        let modelName = key;
        console.log(modelName);

        const model = obj[key];
        for (const key of Object.keys(model.properties)) {
            let modelsPropertyName =key;
            let modelsPropertyType =model.properties[key].type;
            console.log(modelsPropertyName,modelsPropertyType);
        }
        
        
    }
}

