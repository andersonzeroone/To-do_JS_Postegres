var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
 if (ev.target.tagName === 'LI') {
     ev.target.classList.toggle('checked');
    }
}, false);

const html = document.querySelector("html");
const checkbox = document.querySelector("#switch");

const getStyle = (element, style) => 
    window
        .getComputedStyle(element)
        .getPropertyValue(style) 

const initialColor = {
    bgg: getStyle(html, "--bgg"),
    bgTitle: getStyle(html, "--bg-title"),
    bgBnt: getStyle(html, "--bg-bnt"),
    bgBntcheck: getStyle(html, "--bg-bntcheck")   
}

const darkMode = {
    bgg: '#1d1c1c',
    bgTitle: '#EBEBEB',
    bgBnt:'#1d1c1c',    
    bgBntcheck:'#3664FF'
}

const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map( key =>
        html.style.setProperty(transformKey(key), colors[key])
    )
}

checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColor)
})