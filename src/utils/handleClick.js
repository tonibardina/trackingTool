import { CreateGraphic } from "../d3/CreateGraphic"
import { Store } from "../Store"

export const handleClick = (e) => {
    // log stored data
        console.log(Store)
    
        // create cookie for new users
        let CookieDate = new Date;
        CookieDate.setFullYear(CookieDate.getFullYear() +10);
        if(!/userstore/gi.test(document.cookie)) {
            document.cookie = `userstore=${e.timeStamp}; expires=${CookieDate.toUTCString()}`
        } 
        const cookie = /userstore/gi.exec(document.cookie).input.split('=')[1]
    
        if (Store.getState().length) {
            Store.updateState({
                    userID: cookie,                
                    clickMoment: new Date().getHours() + ':' + new Date().getMinutes(),
                    elementClicked: {
                        className: e.toElement.className,
                        textContent: e.toElement.textContent,
                        tagName: e.toElement.tagName
                    },
                    lastClick: store[store.length - 1].clickMoment
                })
        } else {
            Store.updateState({
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

        let graphic = new CreateGraphic()
        graphic.drawLine()
    }
    