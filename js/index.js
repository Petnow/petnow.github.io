const gTodayPopupCallCookie = 'todayPopupCall=';
const gTodayPopupCallCookieValue = 'Y';

window.onload = function() {
    if (checkCallPopupToday()) {
        document.getElementById('popupWrapper').style.display = 'flex';
    }

    document.getElementById('btnAppStore').addEventListener('click', function() {
        location.href = 'https://apps.apple.com/us/app/%ED%8E%AB%EB%82%98%EC%9A%B0/id1504831008?l=ko&ls=1'
    });
    document.getElementById('btnPlayStore').addEventListener('click', function() {
        location.href = 'https://play.google.com/store/apps/details?id=io.petnow.id';
    });

    document.getElementById('callTodayWrapper').addEventListener('click', closePopupAndNotCallToday);

    document.getElementById('btnClose').addEventListener('click', closePopup);
}

function closePopupAndNotCallToday() {
    notCallPopupToday();
    closePopup();
}

function closePopup(event) {// }
    document.getElementById('popupWrapper').style.display = 'none';
}

function notCallPopupToday() {
    const expireDate = new Date();
    //내일 설정
    expireDate.setDate(expireDate.getDate() + 1);
    //0시 0분에 만료
    expireDate.setHours(0, 0, 0, 0);
    document.cookie = `${gTodayPopupCallCookie}${escape(gTodayPopupCallCookieValue)}; expires=${expireDate.toUTCString()}`;
}

//return true : call
function checkCallPopupToday() {
    const cookieData = document.cookie;
    let startIndex = cookieData.indexOf(gTodayPopupCallCookie);
    let cookieValue = '';

    if (startIndex > -1){
        startIndex += gTodayPopupCallCookie.length;
        let endIndex = cookieData.indexOf(';', startIndex);

        if (endIndex == -1) {
            endIndex = cookieData.length;
        }

        cookieValue = cookieData.substring(startIndex, endIndex);
    }

    return unescape(cookieValue) != gTodayPopupCallCookieValue;
}