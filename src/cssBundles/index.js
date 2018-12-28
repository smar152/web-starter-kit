// import '../scss/bootstrapImports.scss';
import '../scss/themesImplementation.scss';

// simple buttons to demo themes

window.onload = function(){
    const lightButton = document.getElementById("lightButton");
    const darkButton = document.getElementById("darkButton");

    lightButton.addEventListener("click", makeBodyTheme.bind(document, "light"));
    darkButton.addEventListener("click", makeBodyTheme.bind(document, "dark"));
};

function makeBodyTheme(themeName){
    [...document.body.classList].forEach(className => {
        if(/^theme-/.test(className)){
            document.body.classList.remove(className);
        }
    });
    document.body.classList.add(`theme-${themeName}`)
}
