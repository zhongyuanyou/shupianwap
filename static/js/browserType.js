
var Browser;
export function BT(){
    if (process.client) {
        // 在客户端做判断
        const explorer = navigator.userAgent;
        console.log(explorer)
        // IE  判断浏览器是否支持ActiveX控件，如果浏览器支持ActiveX控件可以利用,
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            Browser = 'ie';
            console.log("当前浏览器为：IE");
        }
        //IE  documentMode是一个IE的私有属性，在IE8+中被支持。
        if (window.document.documentMode) {
            Browser = 'ie';
        }
        //firefox 
        else if (explorer.indexOf("Firefox") >= 0) {
            Browser = 'Firefox';
        }
        //Chrome
        else if (explorer.indexOf("Chrome") >= 0) {
            Browser = 'Chrome';
            //微信
            if(explorer.indexOf("MicroMessenger") >= 0) {
                Browser = 'weixin';
            }
            //QQ
            if(explorer.indexOf("QQBrowser") >= 0) {
                Browser = 'qq';
            }
            //UC
            if(explorer.indexOf("UCBrowser") >= 0) {
                Browser = 'uc';
            }
            //baidu
            if(explorer.indexOf("Baidu") >= 0) {
                Browser = 'baidu';
            }
            //猎豹
            if(explorer.indexOf("LieBaoFast") >= 0) {
                Browser = 'liebao';
            }
        }
        //Opera
        else if (explorer.indexOf("Opera") >= 0) {
            Browser = 'Opera';
        }
        //Safari
        else if (explorer.indexOf("Safari") >= 0) {
            Browser = 'Safari';
        }
        //Netscape
        else if (explorer.indexOf("Netscape") >= 0) {
            Browser = 'Netscape';
        }
        
    }else{
        const explorer = ''
        const Browser = ''
    }
    
    return Browser
}   