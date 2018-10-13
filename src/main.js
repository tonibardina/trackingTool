import { handleClick } from "./utils/handleClick";

let webPageHaveIframes = document.querySelectorAll('iframe').length;
let iframes = Array.from(webPageHaveIframes)


if (webPageHaveIframes) {
    iframes.forEach(iframe => {
        iframe.contentDocument.find('body').addEventListener('click', handleClick)
    })
    document.querySelector('body').addEventListener('click', handleClick)
} else {
    document.querySelector('body').addEventListener('click', handleClick)
}

