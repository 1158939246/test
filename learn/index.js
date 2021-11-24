let button={}

// let str=''

for (let str=''; str !== '555'; str+='5') {
    button[str]={}
    button[str].onclick = () => { console.log(str) }
    // str+='5'
}

button['5'].onclick()