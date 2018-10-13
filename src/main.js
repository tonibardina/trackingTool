import { Store } from "./Store"
import {CreateGraphic} from "./d3/CreateGraphic"

let webPageHaveIframes = document.querySelectorAll('iframe').length;
let iframes = Array.from(webPageHaveIframes)
let trackStore = new Store()
let graphic = new CreateGraphic()

const handleClick = (e) => {
    // log stored data
        console.log(trackStore)
    
        // create cookie for new users
        let CookieDate = new Date;
        CookieDate.setFullYear(CookieDate.getFullYear() +10);
        if(!/userstore/gi.test(document.cookie)) {
            document.cookie = `userstore=${e.timeStamp}; expires=${CookieDate.toUTCString()}`
        } 
        const cookie = /userstore/gi.exec(document.cookie).input.split('=')[1]
    
        if (trackStore.getState().length) {
            trackStore.updateState({
                    userID: cookie,                
                    clickMoment: new Date().getHours() + ':' + new Date().getMinutes(),
                    elementClicked: {
                        className: e.toElement.className,
                        textContent: e.toElement.textContent,
                        tagName: e.toElement.tagName
                    },
                    lastClick: trackStore.getState()
                })
        } else {
            trackStore.updateState({
                userID: cookie,                
                clickMoment: new Date().getHours() + ':' + new Date().getMinutes(),
                elementClicked: {
                    className: e.toElement.className,
                    textContent: e.toElement.textContent,
                    tagName: e.toElement.tagName
                },
                lastClick: 'firstClick'
            })
        }

        graphic.drawLine()
    }
    
if (webPageHaveIframes) {
    iframes.forEach(iframe => {
        iframe.contentDocument.find('body').addEventListener('click', handleClick)
    })
    document.querySelector('body').addEventListener('click', handleClick)
} else {
    document.querySelector('body').addEventListener('click', handleClick)
}

