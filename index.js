'use strict';

const fs = require('fs');
const path = require('path');

let rawdata = fs.readFileSync('./swagger.json');
let swagger = JSON.parse(rawdata);

if (swagger && swagger.components && swagger.components.schemas) {

    let obj = swagger.components.schemas;
    for (const key of Object.keys(obj)) {


        let modelName = key;
        let fileContent =`export default interface ${modelName} {\n`;

        const model = obj[key];
        let propDetails = '';
        for (const key of Object.keys(model.properties)) {
            let modelsPropertyName =key;
            let modelsPropertyType =model.properties[key].type;
            if(modelsPropertyType == undefined)
            {
                modelsPropertyType = model.properties[key].$ref;
                if(modelsPropertyType.includes('#/components/schemas/'))
                {
                    modelsPropertyType = modelsPropertyType.replace('#/components/schemas/','');
                }
            }
                propDetails +=`\t${modelsPropertyName} : ${modelsPropertyType};\n`;
            
        }
        
        fileContent +=propDetails+'\n}';
        
        //console.log(fileContent);
        //console.log('\n============================================');

    
        let folderPath = path.join(__dirname,'../swagger-model-gen/models');
        if (!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath);
        }

        console.log(folderPath);

        fs.writeFile(`./models/${modelName}.ts`, fileContent, function(err) {
            if(err) {
                return console.log(err);
            }
            //console.log(`The file ${modelName} was saved!`);
        }); 
    }
}

