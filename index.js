const fs = require("fs")
const path = require("path")



!(async () => {



        // Sureler
 for(let i = 1; i < 115 ; i++){
    const file = await  fs.readFileSync(`SURELER/${i}.json`, 'utf8')

    const obj = JSON.parse(file)

var surahPage =`+++
archetype = "sure"
title = "${obj.Name} Suresi"
weight = "${i}"
+++

`



for(let k = 1; k <= obj.TotalVerse; k++){
surahPage+= `- [${k}. Ayet](${k})\n`
}

var lowerCase = obj.Name.toLowerCase()

lowerCase = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);


await fs.mkdirSync(path.join(__dirname, `${lowerCase}-suresi`));

await fs.writeFileSync(`${lowerCase}-suresi/_index.md`, surahPage); 




        // Ayetler
    for(let u = 1; u< Object.keys(obj).length -1 ; u ++){

var frontMatter = `+++
archetype = "ayet"
title = "${obj.Name} Suresi ${u}. Ayet"
weight = "${u}"
`


var temp = `| Yazar | Meal |
|--------|-------------|
`




        // Mealler
    for(let p of Object.keys(obj[u])){


        if(p == "Arabic"){

            frontMatter += `arapca = "${obj[u][p]}"    
+++    
    
`

        }else{
            
            temp+= `| ${p} | ${obj[u][p].replace(/(\r\n|\n|\r)/gm, " ")} |\n`
        }
        
        
    }
    frontMatter += temp

    await fs.writeFileSync(`${lowerCase}-suresi/${u}.md`, frontMatter); 

    }

     if(i == 1) break

 }


})()