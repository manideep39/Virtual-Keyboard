// Learnt Closure, in a practical way from Arjun K Prasad. The usage of closures idea is taken from him. 
// Some parts of the code is learnt from. 

const textInfo = keyboard()

window.addEventListener("load", function(params) {
    let display = document.getElementById("keys")
    display.addEventListener("click", () => {

        if (event.path[3].id == "symbols" && event.path[2].id != "del") {

            if (textInfo.getShiftStatus()) {
                let symbols = textInfo.getSymbols()
                textInfo.displayText(symbols)
                textInfo.shiftOn()
            
            } else {
                let number = textInfo.getNumbers()
                textInfo.displayText(number)
            }

        } else {
            let text = textInfo.getText()

            if (text !== undefined) { // pressing caps key, shift key return undefined, to tackle that
             
                if (textInfo.getCapStatus()) {
                    let lowerText = textInfo.toggleCase(text)
                    textInfo.displayText(lowerText)
                } else {
                    textInfo.displayText(text)
                }
            }
        }
    })

    let caps = document.getElementById("caps")
    caps.addEventListener("click", ()=> {
        textInfo.capsOn();
    })

    const shift = document.getElementById("shift")
    shift.addEventListener("click", () => {
        textInfo.shiftOn();
    })

    const passwd = document.getElementById("passwd")
    passwd.addEventListener("click", () => {
        textInfo.passwdOn();
        // this helps mask and demask the display instantly
        if (textInfo.getPasswdStatus()) {
            textInfo.displayText("")
        } else {
            textInfo.displayText("")
        }
    })

    const rev = document.getElementById("rev")
    rev.addEventListener("click", () => {
        textInfo.revOn();

        if (textInfo.getRevStatus()) {
            textInfo.revText(textInfo.getCurrentDisp())
        } else {
            textInfo.displayText("")
        }

    })

    const del = document.getElementById("del")
    del.addEventListener("click", () => {
        textInfo.delText()
    })

    const clean = document.getElementById("clean")
    clean.addEventListener("click", () => {
        textInfo.cleanOn();

        if (textInfo.getCleanStatus()) {
            textInfo.clean()
        } else {
            textInfo.displayText("")
        }
         
    })

})

function keyboard() {
    let [ flagCaps, flagShift, flagPasswd, flagRev, flagClean, currentDisp ] = [ true, false, false, false, false, "" ]
    
    function capsOn() {
        flagCaps = !flagCaps
        let caps = document.getElementById("caps")
        if (!flagCaps) {
            caps.style.backgroundColor = "white"
            caps.style.borderRadius = "50px"
        } else {
            caps.style.backgroundColor = ""
        }

    }

    function shiftOn() {
        flagShift = !flagShift
        const shift = document.getElementById("shift")
        if (flagShift) {
            shift.style.backgroundColor = "white"
            shift.style.borderRadius = "50px"
        } else {
            shift.style.backgroundColor = ""
        }
    }

    function passwdOn() {
        flagPasswd = !flagPasswd
        const passwd = document.getElementById("passwd")
        if (flagPasswd) {
            passwd.style.backgroundColor = "white"
            passwd.style.borderRadius = "50px"
        } else {
            passwd.style.backgroundColor = ""
        }
    }

    function revOn() {
        flagRev = !flagRev
        const rev = document.getElementById("rev")
        if (flagRev) {
            rev.style.backgroundColor = "white"
            rev.style.borderRadius = "50px"
        } else {
            rev.style.backgroundColor = ""
        }
    }

    function cleanOn() {
        flagClean = !flagClean
        const clean = document.getElementById("clean")
        if (flagClean) {
            clean.style.backgroundColor = "white"
            clean.style.borderRadius = "50px"
        } else {
            clean.style.backgroundColor = ""
        }
    }

    function getCapStatus() {
        return flagCaps
    }

    function getShiftStatus() {
        return flagShift
    }

    function getCurrentDisp() {
        return currentDisp
    }

    function getPasswdStatus() {
        return flagPasswd
    }

    function getRevStatus() {
        return flagRev
    }

    function getCleanStatus() {
        return flagClean
    }

    function toggleCase(text) {
        return text.toLowerCase()
    }

    function getText() {

        if (event.target.nodeName == "H1" || event.target.nodeName == "H6" || event.target.nodeName == "H3") {
            return event.target.innerText
        } else if (event.target.nodeName == "DIV" && (event.target.children[0].nodeName == "H1" || event.target.children[0].nodeName == "H6" || event.target.children[0].nodeName == "H3")) {
            return event.target.children[0].textContent
        } else {
            return 
        }

    }

    function maskText(currentDisp) {
        let displayText = document.getElementById("display-text")
        let len = currentDisp.length
        if (len != 0) {
            let mask = new Array(len-1).fill("*").join("")
            displayText.innerText = mask + currentDisp[currentDisp.length - 1]
        }
    }

    function revText(currentDisp) {
        let displayText = document.getElementById("display-text")
        let string = currentDisp.split("").reverse().join("")
        displayText.innerText = ""
        displayText.innerText = string
    }

    function delText(text) {
        let display = document.getElementById("display-text")
        display.innerText = ""
        let str = currentDisp.split("")
        str.pop()
        currentDisp = str.join("")
        display.innerText = currentDisp
    }

    function displayText(text) {
        let displayText = document.getElementById("display-text")
        displayText.innerText = ""
        currentDisp += text 
        
        if (getPasswdStatus()) {
            maskText(currentDisp)
        } else {
            displayText.innerText = currentDisp
        }
    } 

    function getNumbers() {
        return event.path[1].children[1].textContent
    }

    function getSymbols() {
        return event.path[1].children[0].textContent
    }

    function clean() {
        // cursWords taken from Arjun K Prasad's keyboard code
        const cursWords = ['erotic', 'eroticism', 'escort', 'faggot', 'feltch', 'hooker', 'hardcore', 'intercourse', 'sex', 'fuck']
        let displayText = document.getElementById("display-text")
        for (let i = 0; i < cursWords.length; i++) {
            if (currentDisp.includes(cursWords[i])) {

                let stInd = currentDisp.indexOf(cursWords[i])
                let endInd = stInd + cursWords[i].length
                let clean = currentDisp.split("")
                for (j = stInd + 1; j < endInd - 1; j++) {
                    clean[j] = "*"
                }
                displayText.innerText = ""
                displayText.innerText = clean.join("")

            }
        }
    }

    return { capsOn, toggleCase, displayText, getText, getCapStatus, getNumbers, getShiftStatus, getSymbols, shiftOn, passwdOn, getPasswdStatus, getRevStatus, getCurrentDisp, revOn, revText, delText, cleanOn, clean, getCleanStatus }
}











