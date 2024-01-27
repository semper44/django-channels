let processenv = "https://django-channels-byf5.onrender.com";
const topsearchButton = document.querySelector("#topsearchButton"),
    modal = document.querySelector("#modal"),
    submitButton = document.querySelector("#submit"),
    groupcancel = document.querySelector("#groupcancel"),
    creategroupmodalbase = document.querySelector("#creategroupmodal"),
    grouppagecreategroup = document.querySelector("#grouppagecreategroup"),
    topsearchmodal = document.querySelector("#searchmodal"),
    searchmodalparent = document.querySelector("#searchmodalparent"),
    searchmodalcancel = document.querySelector("#searchmodalcancel");
let baseresponseUrlKey = "https://django-channels-byf5.onrender.com",
    baseTypingTimer;
function mobilecreatepost() {
    (modal.style.display = "block"), document.querySelector("#id_content").focus();
}
function mobilecreatgroup() {
    creategroupmodalbase.style.display = "block";
}
function mobilecreatestatus() {
    (statusmodal.style.display = "block"), document.querySelector("#id_content").focus();
}
topsearchButton.addEventListener("input", (e) => {
    clearTimeout(baseTypingTimer),
        (typingTimer = setTimeout(async () => {
            e.preventDefault(), (searchmodalparent.style.display = "block");
            let t = new FormData(document.querySelector("#topsearchButtonform")),
                o = new URLSearchParams(t),
                n = "https://django-channels-byf5.onrender.comsearch?" + o.toString(),
                l = await fetch(n, { method: "GET", headers: { "X-CSRFToken": "{{ csrf_token }}" } }),
                s = await l.json();
            if (((topsearchmodal.innerHTML = ""), s.results.length >= 1)) {
                s.results.slice(0, 3).forEach((e) => {
                    let t = document.createElement("div"),
                        o = document.createElement("div"),
                        n = document.createElement("div"),
                        l = document.createElement("img"),
                        s = document.createElement("p"),
                        r = document.createElement("p"),
                        a = document.createElement("p");
                    document.createElement("p"),
                        (t.style.width = "80%"),
                        (t.style.padding = "1.5rem 0"),
                        (t.style.height = "fit-content"),
                        (t.style.position = "relative"),
                        (t.style.borderRadius = "10px"),
                        (t.style.minHeight = "108px"),
                        (l.style.width = "60px"),
                        (l.style.height = "60px"),
                        (l.style.borderRadius = "50%"),
                        (l.style.position = "absolute"),
                        (l.style.left = "4%"),
                        (l.style.zIndex = "20"),
                        (s.style.color = "limegreen"),
                        (s.style.width = "100%"),
                        (s.style.textAlign = "center"),
                        (r.style.color = "white"),
                        (r.style.width = "100%"),
                        (r.style.textAlign = "center"),
                        (a.style.height = "fit-content"),
                        (a.style.width = "fit-content"),
                        (a.style.padding = "5px"),
                        (a.style.color = "white"),
                        (a.style.borderRadius = "5px"),
                        (a.style.backgroundColor = "limegreen"),
                        (a.style.zIndex = "20"),
                        (a.style.marginTop = "8px"),
                        (a.style.cursor = "pointer"),
                        (a.innerHTML = "View"),
                        (n.style.display = "grid"),
                        (n.style.backgroundColor = "black"),
                        (n.style.opacity = "0.4"),
                        (n.style.backdropFilter = "blur(2px)"),
                        (n.style.position = "absolute"),
                        (n.style.bottom = "0"),
                        (n.style.width = "100%"),
                        (n.style.height = "50%"),
                        (n.style.borderRadius = "5px"),
                        (n.style.paddingBottom = "3x"),
                        (t.style.background = "white"),
                        e.prof_pics && e.username
                            ? ((r.innerHTML = e.bio),
                              (s.innerHTML = e.username),
                              (l.src = e.prof_pics),
                              t.append(l),
                              (a.onclick = function () {
                                  window.location.href = `${processenv}/profile/${e.username}/ `;
                              }))
                            : e.prof_pics && e.owner
                            ? ((s.innerHTML = e.content),
                              (a.onclick = function () {
                                  window.location.href = `${processenv}/comments/${e.slug}/ `;
                              }))
                            : ((s.innerHTML = e.name),
                              (l.src = e.photo),
                              t.append(l),
                              (a.onclick = function () {
                                  window.location.href = `${processenv}/group-view/${e.name}/ `;
                              })),
                        n.append(s),
                        n.append(r),
                        o.append(a),
                        (o.style.position = "absolute"),
                        (o.style.right = "4%"),
                        (o.style.top = "6%"),
                        (o.style.zIndex = "10"),
                        t.append(o),
                        t.append(n),
                        topsearchmodal.append(t);
                });
                let r = document.createElement("p");
                (r.innerHTML = "See all"),
                    (r.style.marginTop = "1rem"),
                    (r.style.width = "75%"),
                    (r.style.backgroundColor = "white"),
                    (r.style.color = "#0d2438"),
                    (r.style.textAlign = "center"),
                    (r.style.cursor = "pointer"),
                    (r.style.border = "1px solid #00cc66"),
                    (r.style.padding = "0.5rem 0"),
                    (r.style.borderRadius = "10px"),
                    (r.style.color = "#0d2438"),
                    topsearchmodal.append(r),
                    r.addEventListener("mouseenter", function () {
                        (r.style.backgroundColor = "#16a34a"), (r.style.color = "white");
                    }),
                    r.addEventListener("mouseleave", function () {
                        (r.style.backgroundColor = "white"), (r.style.color = "#0d2438");
                    }),
                    r.addEventListener("click", async (e) => {
                        o.toString(), (window.location.href = '{% url "search_view_template" %}?' + o.toString());
                    });
            } else topsearchmodal.innerHTML = "Search not found";
        }));
}),
    searchmodalcancel.addEventListener("click", (e) => {
        (topsearchmodal.innerHTML = ""), (searchmodalparent.style.display = "none");
    }),
    groupcancel.addEventListener("click", () => {
        creategroupmodalbase.style.display = "none";
    }),
    grouppagecreategroup &&
        grouppagecreategroup.addEventListener("click", () => {
            creategroupmodalbase.style.display = "block";
        });
const body = document.querySelector("body"),
    btn = document.querySelector("#ball"),
    btn2 = document.querySelector("#ball2"),
    left = document.querySelector("#leftnav"),
    savedMode = localStorage.getItem("mode");
null !== savedMode
    ? (body.classList.add(savedMode), "light" === savedMode ? (btn.classList.add("balllight"), btn2.classList.add("balllight")) : (btn.classList.add("balldark"), btn2.classList.add("balldark")))
    : (btn.classList.add("balllight"), btn2.classList.add("balllight"));
const toggleDarkMode = () => {
    body.classList.toggle("dark");
    let e = body.classList.contains("dark") ? "dark" : "light";
    if ((localStorage.setItem("mode", e), "light" === e)) {
        btn.classList.remove("balldark"), btn.classList.add("balllight"), btn2.classList.remove("balldark"), btn2.classList.add("balllight");
        let t = document.querySelectorAll("#findfrienddivbg");
        for (let o of t) o.style.backgroundColor = "white";
        let n = document.querySelectorAll("#frienddivbg");
        for (let l of n) l.style.backgroundColor = "white";
    } else {
        btn.classList.remove("balllight"), btn.classList.add("balldark"), btn2.classList.remove("balllight"), btn2.classList.add("balldark");
        let s = document.querySelectorAll("#findfrienddivbg");
        for (let r of s) r.style.backgroundColor = "#1D2833";
        let a = document.querySelectorAll("#frienddivbg");
        for (let c of a) c.style.backgroundColor = "#1D2833";
    }
};
btn && (btn.addEventListener("click", toggleDarkMode), btn2.addEventListener("click", toggleDarkMode));
const protocol = "https:" === window.location.protocol ? "wss:" : "ws:",
    urls = `${protocol}//${window.location.host}/ws/home/`;
let messages = document.querySelector("#online"),
    onlinePeople = document.querySelector("#online-people");
const chatChat = document.querySelector("#chat-chat"),
    messageStore = document.querySelector("#messageStore"),
    img = document.querySelector("#img"),
    samePerson = document.querySelector("#baseuserid").innerHTML,
    chats = document.querySelector("#chat"),
    senddiv = document.querySelector("#sendiv"),
    online = document.querySelector("#online"),
    form = document.querySelector("form"),
    realtimemessgcontainer = document.querySelector("#realtimemessgcontainer"),
    realtimemessg = document.querySelector("#realtimemessg"),
    onlinechat = document.querySelector("#onlinechat"),
    backarrow = document.querySelector("#backarrow"),
    onlinechatbutton = document.querySelector("#onlinechatbutton"),
    logout = document.querySelector("#logout"),
    csrfToken2 = document.querySelector('[name="csrfmiddlewaretoken"]').value,
    onlineSocket = new WebSocket(urls),
    requestUser = document.querySelector("#baseuserid").getAttribute("data-id");
let addnotif;
addnotif = void 0 != localStorage.getItem("notificationadd") ? localStorage.getItem("notificationadd") : 0;
let bellicon2 = document.querySelector("#bellicon2");
const bell = document.querySelector("#bellicon");
bellicon2 && (bellicon2.style.display = "none"), bell && (bell.style.display = "none");
let increase = bell.innerHTML,
    dbnotif,
    logout_notification,
    message_logout_notification,
    messagenotifrightnav;
const savedCount = localStorage.getItem("count");
let messagenotif2 = document.querySelector("#messagenotif2"),
    count,
    notifTotal,
    profile_message = document.querySelector("#profile_message"),
    suggestions = document.querySelector("#suggestions"),
    xhrfriends = new XMLHttpRequest(),
    url = `${processenv}/findfriends/`;
xhrfriends.open("GET", url, !0),
    xhrfriends.setRequestHeader("Content-Type", "application/json"),
    (xhrfriends.onreadystatechange = function () {
        if (xhrfriends.readyState === XMLHttpRequest.DONE && 200 === xhrfriends.status) {
            let e = JSON.parse(xhrfriends.responseText);
            if (
                (e.find_friends.slice(0, 3).forEach((t) => {
                    if (e.sent.includes(t.username) || e.received.includes(t.username));
                    else if ("" !== t.username) {
                        let o = document.createElement("div"),
                            n = document.createElement("div"),
                            l = document.createElement("div"),
                            s = document.createElement("img"),
                            r = document.createElement("p"),
                            a = document.createElement("p"),
                            c = document.createElement("p"),
                            d = document.createElement("p");
                        (o.style.width = "80%"),
                            (o.style.padding = "1.5rem 0"),
                            (o.style.height = "fit-content"),
                            (o.style.position = "relative"),
                            (o.style.backgroundColor = "transparent"),
                            (o.style.border = "0.8px solid #635a5aab"),
                            (o.style.borderRadius = "10px"),
                            (o.style.minHeight = "108px"),
                            (s.src = t.pics),
                            (s.style.width = "60px"),
                            (s.style.height = "60px"),
                            (s.style.borderRadius = "50%"),
                            (s.style.position = "absolute"),
                            (s.style.left = "4%"),
                            (s.style.zIndex = "20"),
                            o.append(s),
                            (r.innerHTML = t.username),
                            (r.style.color = "white"),
                            (r.style.width = "100%"),
                            (r.style.textAlign = "center"),
                            (a.innerHTML = "item.bio"),
                            (a.style.color = "white"),
                            (a.style.width = "100%"),
                            (a.style.textAlign = "center"),
                            (d.innerHTML = "Add"),
                            (c.innerHTML = "View"),
                            (d.style.height = "fit-content"),
                            (d.style.width = "fit-content"),
                            (d.style.padding = "5px"),
                            (d.style.color = "white"),
                            (d.style.backgroundColor = "limegreen"),
                            (d.style.borderRadius = "5px"),
                            (d.style.cursor = "pointer"),
                            (c.style.height = "fit-content"),
                            (c.style.width = "fit-content"),
                            (c.style.padding = "5px"),
                            (c.style.color = "white"),
                            (c.style.borderRadius = "5px"),
                            (c.style.backgroundColor = "limegreen"),
                            (c.style.zIndex = "20"),
                            (c.style.marginTop = "8px"),
                            (c.style.cursor = "pointer"),
                            (c.onclick = function () {
                                window.location.href = `${baseresponseUrlKey}/profile/${t.username}/ `;
                            }),
                            (d.onclick = function () {
                                window.location.href = `${baseresponseUrlKey}/addfriends/${t.username}/ `;
                            }),
                            (l.style.display = "grid"),
                            (l.style.backgroundColor = "black"),
                            (l.style.opacity = "0.4"),
                            (l.style.backdropFilter = "blur(2px)"),
                            (l.style.position = "absolute"),
                            (l.style.bottom = "0"),
                            (l.style.width = "100%"),
                            (l.style.height = "50%"),
                            (l.style.borderRadius = "5px"),
                            (l.style.paddingBottom = "3x"),
                            l.append(r),
                            l.append(a),
                            n.append(d),
                            n.append(c),
                            (n.style.position = "absolute"),
                            (n.style.right = "4%"),
                            (n.style.top = "6%"),
                            (n.style.zIndex = "10"),
                            o.append(n),
                            o.append(l),
                            suggestions.append(o);
                    }
                }),
                (dbnotif = e.notif),
                (logout_notification = e.logout_notification),
                (message_logout_notification = e.logout_message_notification),
                (messagenotifrightnav = e.message_notif),
                (count = savedCount || 0) >= 1 || +messagenotifrightnav >= 1 || +message_logout_notification >= 1)
            ) {
                let t = document.querySelector("#messagenotif"),
                    o = +count + +messagenotifrightnav + +message_logout_notification;
                null !== t && ((t.innerHTML = o), (t.style.color = "white"), (t.style.display = "flex"), (t.style.justifyContent = "center"), (t.style.alignItems = "center"), localStorage.setItem("count", o)),
                    null !== messagenotif2 &&
                        ((messagenotif2.innerHTML = +count + +messagenotifrightnav),
                        (messagenotif2.style.color = "white"),
                        (messagenotif2.style.display = "flex"),
                        (messagenotif2.style.justifyContent = "center"),
                        (messagenotif2.style.alignItems = "center"));
            }
            if (null !== addnotif) (notifTotal = +addnotif + +dbnotif), localStorage.setItem("notificationadd", notifTotal), bell && (bell.innerHTML = notifTotal), bellicon2 && (bellicon2.innerHTML = notifTotal);
            else {
                let n = +logout_notification + +dbnotif;
                n > 0 && ((notifTotal = +n), bell && (bell.innerHTML = n), bellicon2 && (bellicon2.innerHTML = n)), localStorage.setItem("notificationadd", notifTotal);
            }
            notifTotal <= 0 ? (bell && (bell.style.display = "none"), bellicon2 && (bellicon2.style.display = "none")) : (bell && (bell.style.display = "flex"), bellicon2 && (bellicon2.style.display = "flex"));
            let l = new XMLHttpRequest();
            l.open("GET", `${processenv}/reset_notif/`, !0),
                l.setRequestHeader("Content-Type", "application/json"),
                (l.onreadystatechange = function () {
                    l.readyState === XMLHttpRequest.DONE && 200 === l.status && (response = JSON.parse(l.responseText));
                }),
                l.send();
            let s = document.querySelector("#bellicon2container");
            s &&
                (s.onclick = function () {
                    localStorage.removeItem("notificationadd"), (bellicon2.style.display = "none");
                });
            let r = document.querySelector("#belliconcontainer");
            r &&
                (r.onclick = function () {
                    localStorage.removeItem("notificationadd"), (bell.style.display = "none");
                });
        }
    }),
    xhrfriends.send();
let bgStatus;
function checksize() {
    let e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        t;
    backarrow && (t = backarrow.getAttribute("state")),
        realtimemessg &&
            onlinechat &&
            (e < 640 && null === t
                ? ((onlinechat.style.display = "block"), (realtimemessg.style.display = "none"))
                : e < 640 && "false" === t
                ? ((onlinechat.style.display = "block"), (realtimemessg.style.display = "none"))
                : ((onlinechat.style.display = "none"), (realtimemessg.style.display = "block"))),
        onlinechat && e > 640 && (onlinechat.style.display = "block");
}
function screenResize() {
    checksize();
}
function scrollToBottom() {
    messageStore.scrollTop = messageStore.scrollHeight;
}
(bgStatus = "dark" === localStorage.getItem("mode") ? "dark" : "light"),
    checksize(),
    window.addEventListener("resize", screenResize),
    backarrow &&
        (backarrow.onclick = function () {
            backarrow.setAttribute("state", "false"), (realtimemessg.style.display = "none"), (onlinechat.style.display = "block"), (onlinechatbutton.style.display = "flex");
        });
let socket = null;
chats &&
    ((chats.onmouseover = function () {
        chats.style.opacity = "0.4";
    }),
    (chats.onmouseout = function () {
        chats.style.opacity = "1";
    })),
    senddiv &&
        ((senddiv.onmouseover = function () {
            (senddiv.style.opacity = "0.4"), (senddiv.style.cursor = "pointer");
        }),
        (senddiv.onmouseout = function () {
            senddiv.style.opacity = "1";
        }));
let typingStore;
function initialPersonalChat(e) {
    let t = new XMLHttpRequest();
    t.open("GET", `${baseresponseUrlKey}/chat/${e}`, !0),
        t.setRequestHeader("Content-Type", "application/json"),
        (t.onerror = function () {}),
        (t.onreadystatechange = function () {
            if (t.readyState === XMLHttpRequest.DONE && 200 === t.status) {
                let e = JSON.parse((response = JSON.parse(t.responseText)).context);
                if (response.context)
                    for (i of e) {
                        let o = Object.keys(i)[0],
                            n = i[o],
                            l = document.createElement("p");
                        (messageStore.style.opacity = "1"),
                            (l.style.width = "fit-content"),
                            (l.style.padding = "3px 10px"),
                            (l.style.marginTop = "1rem"),
                            (l.style.borderRadius = "10px"),
                            (l.innerHTML = n),
                            o === samePerson ? ((l.style.alignSelf = "flex-end"), (l.style.backgroundColor = "green"), (l.style.color = "white")) : ((l.style.color = "white"), (l.style.backgroundColor = "#597d35")),
                            messageStore.appendChild(l),
                            scrollToBottom();
                    }
            }
        }),
        t.send();
}
function sendAndRceiveMessage(e, t) {
    if ("chat_message" === e.type && e.receiver === samePerson) {
        let o = document.createElement("div"),
            n = document.createElement("p");
        (n.innerHTML = e.time), (n.style.color = "gray"), (n.style.display = "none"), (n.style.fontSize = "12px");
        let l = document.createElement("p");
        (l.style.width = "fit-content"),
            (l.style.padding = "3px 10px"),
            (l.style.marginTop = "1rem"),
            (l.style.borderRadius = "10px"),
            e.receiver === samePerson ? ((l.style.color = "white"), (l.style.backgroundColor = "#597d35"), (o.style.alignSelf = "flex-start"), o.appendChild(l), o.appendChild(n)) : (o.style.float = "right"),
            (l.onclick = () => {
                n.style.display = "block";
            }),
            (l.innerHTML = e.message),
            messageStore && (messageStore.appendChild(o), scrollToBottom());
    }
    if ("same_message" === e.type) {
        fetchData(e.online);
        let s = document.createElement("p"),
            r = document.createElement("div"),
            a = document.createElement("p");
        (a.innerHTML = e.time),
            (a.style.color = "gray"),
            (a.style.display = "none"),
            (a.style.fontSize = "12px"),
            (s.style.width = "fit-content"),
            (s.style.padding = "3px 10px"),
            (s.style.color = "black"),
            (s.style.marginTop = "1rem"),
            (s.style.borderRadius = "10px"),
            e.receiver !== samePerson && ((s.style.backgroundColor = "green"), (s.style.color = "white"), (s.style.alignSelf = "flex-end"), (s.style.float = "right"), r.appendChild(s), r.appendChild(a)),
            (s.onclick = () => {
                a.style.display = "block";
            }),
            (s.innerHTML = e.message),
            messageStore.appendChild(r),
            scrollToBottom();
    }
}
function chatting(e, t, o) {
    let n = document.querySelector("#leftnavusername"),
        l = document.querySelector("#realtimemessg"),
        s = document.querySelector("#onlinechat"),
        r = document.querySelector("#backarrow"),
        a = new Date(),
        c = a.getDate(),
        d = a.getMonth();
    a.getFullYear();
    let p = a.getHours(),
        u = a.getMinutes(),
        y = c + " " + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d] + " " + p + ":" + (u < 10 ? "0" : "") + u;
    null !== messageStore && (messageStore.style.opacity = "1");
    let g = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    profile_message ||
        (g <= 640 && null !== s && null !== r && null !== l
            ? ((s.style.display = "none"), (l.style.display = "block"), (l.style.width = "100%"), r.setAttribute("state", "true"))
            : ((s.style.display = "block"), r.setAttribute("state", "false"))),
        null !== socket && socket.readyState === WebSocket.OPEN && socket.close();
    let m = "https:" === window.location.protocol ? "wss:" : "ws:",
        f = `${m}//${window.location.host}+ /ws/messages/${t}/${o}/ `;
    if (
        (((socket = new WebSocket(f)).onmessage = function (e) {
            let t = JSON.parse(e.data);
            sendAndRceiveMessage(t, o);
        }),
        (socket.onclose = function (e) {
            alert("Chat socket closed unexpectedly");
        }),
        null !== document.querySelector("#message"))
    ) {
        document.querySelector("#message").focus(),
            (document.querySelector("#message").onkeyup = function (e) {
                "Enter" === e.key && document.querySelector("#chat-message-submit").click();
            }),
            (document.querySelector("#message").oninput = function (e) {
                socket.send(JSON.stringify({ message: "message", user: n.innerHTML, receiver: o, receiverProfile: i, type: "typing" }));
            });
        let h;
        document.querySelector("#message").onblur = function (e) {
            clearTimeout(h);
            let t = document.querySelector("#leftnavusername");
            socket.send(JSON.stringify({ message: "message", user: t.innerHTML, receiver: o, receiverProfile: i, type: "canceltyping" }));
        };
    }
    null !== document.querySelector("#chat-message-submit") &&
        (document.querySelector("#chat-message-submit").onclick = function (e) {
            let t = document.querySelector("#message"),
                n = document.querySelector("#leftnavusername"),
                l = t.value;
            socket.send(JSON.stringify({ message: l, user: n.innerHTML, receiver: o, receiverProfile: i, time: y, type: "instantmessage" })), (t.value = "");
        });
    let b = document.querySelector("#profilemessage");
    null !== b &&
        (b.focus(),
        (b.onkeyup = function (e) {
            "Enter" === e.key && document.querySelector("#profilechat-message-submit").click();
        })),
        null !== document.querySelector("#profilechat-message-submit") &&
            (document.querySelector("#profilechat-message-submit").onclick = function (e) {
                let t = b.value,
                    o = profile_message.getAttribute("sender"),
                    n = profile_message.getAttribute("receiver");
                socket.send(JSON.stringify({ message: t, user: o, receiver: n, receiverProfile: n, time: y, type: "instantmessage" })), (b.value = "");
            });
}
profile_message &&
    (profile_message.onclick = function (e, t, o) {
        let n = profile_message.getAttribute("sender"),
            l = profile_message.getAttribute("receiver");
        (document.querySelector("#profile_message_input").style.display = "block"), chatting(e, n, l);
    });
let profilemessagecancel = document.querySelector("#profilemessagecancel");
function onlinecircle(e, t, o) {
    let n = document.createElement("div"),
        l = document.createElement("div"),
        s = document.createElement("p"),
        r = document.createElement("p");
    r.setAttribute("id", "messagebody");
    let a = document.createElement("img");
    if (
        (a.setAttribute("id", `${t}`),
        (s.style.opacity = "0.9"),
        (a.style.height = "50px"),
        (a.style.width = "50px"),
        (a.style.borderRadius = "50%"),
        (n.style.position = "relative"),
        n.classList.add(`biggerCircle-${t}`),
        (n.style.width = "fit-content"),
        (o.style.cursor = "pointer"),
        (o.style.height = "fit-content"),
        (o.style.width = "fit-content"),
        (o.style.width = "100%"),
        (o.style.display = "flex"),
        (o.style.marginTop = "1rem"),
        (o.style.gap = "20px"),
        (o.style.alignItems = "center"),
        e.includes(t))
    ) {
        let c = document.createElement("div"),
            d = document.createElement("div"),
            p = document.createElement("div");
        (c.style.width = "10px"),
            (c.style.height = "10px"),
            (c.style.borderRadius = "50%"),
            (c.style.backgroundColor = "lime"),
            d.classList.add(`container-${t}`),
            (d.style.width = "15px"),
            (d.style.height = "15px"),
            (d.style.borderRadius = "50%"),
            (d.style.backgroundColor = "black"),
            (d.style.display = "flex"),
            (d.style.justifyContent = "center"),
            (d.style.alignItems = "center"),
            (p.style.position = "absolute"),
            (p.style.right = "-6%"),
            (p.style.top = "50%"),
            (p.style.transform = "translate(50%, -50%)"),
            d.appendChild(c),
            p.appendChild(d),
            n.appendChild(p);
    }
    (s.innerHTML = t),
        (r.innerHTML = i.message),
        (typingStore = i.message),
        (a.src = i.pics),
        n.append(a),
        o.append(n),
        l.append(s),
        l.append(r),
        o.append(n),
        o.append(l),
        (o.onmouseover = function () {
            o.style.opacity = "0.4";
        }),
        (o.onmouseout = function () {
            o.style.opacity = "1";
        });
}
function fetchData(e) {
    let t;
    chatChat && (chatChat.innerHTML = "");
    let o = new XMLHttpRequest();
    o.open("GET", `${processenv}/selfmessages/`, !0),
        o.setRequestHeader("Content-Type", "application/json"),
        (o.onreadystatechange = function () {
            if (o.readyState === XMLHttpRequest.DONE && 200 === o.status) {
                try {
                    t = JSON.parse(o.responseText);
                } catch {
                    t = Jxhr.responseText;
                }
                for (i of t.messages) {
                    let n,
                        l = document.querySelector("#baseuserid").innerHTML;
                    n = i.username === l ? i.sender : i.username;
                    let s = document.createElement("div");
                    onlinecircle(e, n, s),
                        chatChat && chatChat.append(s),
                        (s.onclick = (e) => {
                            (messageStore.innerHTML = ""), initialPersonalChat(n), chatting(e, l, n);
                        });
                }
            }
        }),
        o.send();
}
profilemessagecancel &&
    ((profilemessagecancel.style.marginRight = "6%"),
    (profilemessagecancel.style.cursor = "pointer"),
    (profilemessagecancel.onclick = function () {
        document.querySelector("#profile_message_input").style.display = "none";
    })),
    (onlineSocket.onmessage = function (e) {
        let t = JSON.parse(e.data);
        if ("send_like_message" === t.type) {
            increase++,
                null !== bellicon && (document.querySelector("#bellicon").innerHTML = increase),
                null !== bellicon2 && ((bellicon2.innerHTML = increase), (bellicon2.style.display = "flex")),
                (document.querySelector("#bellicon").style.display = "flex");
            let o = localStorage.getItem("notificationadd");
            if (null === o) {
                let n = 0;
                n++, localStorage.setItem("notificationadd", n);
            } else (o = +o + 1), localStorage.setItem("notificationadd", o);
        }
        if ("send_add_message" === t.type) {
            let l = document.querySelector("#bellicon").innerHTML;
            l++, (document.querySelector("#bellicon").innerHTML = l), (bellicon2.innerHTML = l), (document.querySelector("#bellicon").style.display = "flex");
            let s = localStorage.getItem("notificationadd");
            if (null === s) {
                let r = 0;
                r++, localStorage.setItem("notificationadd", r);
            } else (s = +s + 1), localStorage.setItem("notificationadd", s);
        }
        function a(e, t, o) {
            let n = document.querySelector("#baseuserid").innerHTML,
                l = document.createElement("div"),
                s = document.createElement("div"),
                r = document.createElement("p");
            r.classList.add("onlineusernames"), (r.innerHTML = t);
            let a = document.createElement("img");
            (a.src = o), (r.style.opacity = "0.9"), (a.style.height = "50px"), (a.style.width = "50px"), (a.style.borderRadius = "50%"), (s.style.position = "relative");
            let c = document.createElement("div");
            (c.style.width = "10px"), (c.style.height = "10px"), (c.style.borderRadius = "50%"), (c.style.backgroundColor = "lime");
            let d = document.createElement("div");
            (d.style.width = "15px"),
                (d.style.height = "15px"),
                (d.style.borderRadius = "50%"),
                (d.style.backgroundColor = "white"),
                (d.style.position = "absolute"),
                (d.style.right = "-6%"),
                (d.style.top = "50%"),
                (d.style.display = "flex"),
                (d.style.justifyContent = "center"),
                (d.style.alignItems = "center"),
                d.append(c),
                s.append(d),
                (l.style.cursor = "pointer"),
                (l.style.height = "fit-content"),
                (l.style.width = "100%"),
                (l.style.display = "flex"),
                (l.style.gap = "18px"),
                (l.style.alignItems = "center"),
                s.append(a),
                l.append(s),
                l.append(r),
                onlinePeople.append(l),
                (l.onmouseover = function () {
                    l.style.opacity = "0.4";
                }),
                (l.onmouseout = function () {
                    l.style.opacity = "1";
                }),
                (l.onclick = function (e) {
                    (messageStore.innerHTML = ""), initialPersonalChat(t), chatting(e, n, t);
                });
        }
        if (onlinePeople && "online" === t.type) {
            for (i of ((onlinePeople.innerHTML = ""), t.message))
                if (t.friends.includes(i.username)) {
                    let c = i.username;
                    a(e, c, i.pics);
                }
        }
        if ("send_logout" === t.type) {
            let d = document.querySelectorAll(".onlineusernames");
            for (i of ((document.querySelector(`.container-${t.sender}`).style.display = "none"), d))
                if (i.innerHTML === t.sender) {
                    let p = i.parentElement;
                    i.parentElement.parentElement.removeChild(p);
                }
        }
        if (onlinePeople && "send_online" === t.type) {
            onlinePeople.innerHTML = "";
            let u = t.name,
                y = t.pics;
            document.querySelector("#baseuserid").innerHTML, document.querySelector(`#${u}`);
            let g = document.querySelector(`.biggerCircle-${u}`),
                m = document.querySelector(`.container-${u}`);
            if (null === m) {
                let f = document.createElement("div");
                f.style.width = "10px";
                let h = document.createElement("div");
                (f.style.height = "10px"),
                    (f.style.borderRadius = "50%"),
                    (f.style.backgroundColor = "lime"),
                    (h.style.width = "15px"),
                    (h.style.height = "15px"),
                    (h.style.borderRadius = "50%"),
                    (h.style.backgroundColor = "black"),
                    (h.style.position = "absolute"),
                    (h.style.right = "-6%"),
                    (h.style.top = "50%"),
                    (h.style.display = "flex"),
                    (h.style.justifyContent = "center"),
                    (h.style.alignItems = "center"),
                    h.append(f),
                    h.classList.add(`container-${u}`),
                    g.append(h);
            } else m.style.display = "flex";
            a(e, u, y);
        }
    }),
    (logout.onclick = async () => {
        let e = localStorage.getItem("notificationadd"),
            t = localStorage.getItem("count"),
            o = new FormData();
        (null !== t || void 0 !== t) && o.append("offlinemessageNotification", t), o.append("offlineNotification", e);
        let n = await fetch(`${processenv}/logout/`, { method: "POST", body: o, headers: { "X-CSRFToken": csrfToken2 } });
        n.ok &&
            (window.localStorage.clear(), (window.location.href = `${processenv}/login`), onlineSocket.send(JSON.stringify({ message: `${samePerson} just liked your photo`, receiver: samePerson, type: "loggedout", sender: samePerson })));
    });
const logout2 = document.querySelector("#logout2");
null !== logout2 &&
    (logout2.onclick = async () => {
        let e = localStorage.getItem("notificationadd"),
            t = localStorage.getItem("count"),
            o = new FormData();
        (null !== t || void 0 !== t) && o.append("offlinemessageNotification", t), o.append("offlineNotification", e);
        let n = await fetch(`${processenv}/logout/`, { method: "POST", body: o, headers: { "X-CSRFToken": "{{ csrf_token }}" } });
        n.ok &&
            (window.localStorage.clear(), (window.location.href = `${processenv}/login`), onlineSocket.send(JSON.stringify({ message: `${samePerson} just liked your photo`, receiver: samePerson, type: "loggedout", sender: samePerson })));
    }),
    $("#myButton").click(function () {
        $(".dataparent").empty();
        let e = `${processenv}/findfriends/`;
        $.ajax({
            url: e,
            type: "GET",
            dataType: "json",
            success: function (e) {
                $("#loadingsequence2").hide();
                let t = $(".dataparent");
                if (e.find_friends.length < 1) {
                    let o = $("<p>").text("No suggestion to fetch"),
                        n = $(".dataparent2"),
                        l = $("<div>");
                    l.css({ width: "100%", "text-align": "center" }), l.append(o), t.hide(), n.empty(), l.appendTo(n), n.show();
                } else
                    e.find_friends.forEach(function (o) {
                        let n = localStorage.getItem("mode");
                        if (o.username) {
                            let l = $("<div>");
                            l.attr("id", "findfrienddivbg");
                            let s = $("<div>"),
                                r;
                            if (
                                (n && (r = "light" !== n),
                                l.css({
                                    width: "100%",
                                    height: "80%",
                                    padding: "1rem",
                                    display: "flex",
                                    gap: "5px",
                                    "justify-content": "center",
                                    "align-content": "center",
                                    "background-color": `${r ? "#1D2833" : "white"} `,
                                    "box-shadow": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                    "border-radius": "10px",
                                    "margin-top": "1rem",
                                    "margin-bottom": "1rem",
                                    "margin-left": "1rem",
                                    "margin-right": "1rem",
                                    "transform-origin": "center",
                                    "transition-property": "transform",
                                    "transition-duration": "300ms",
                                }),
                                l.hover(
                                    function () {
                                        $(this).css({ "box-shadow": "var(--box-shadow-xl)", transform: "scale(1.05)" });
                                    },
                                    function () {
                                        $(this).css({ "box-shadow": "var(--box-shadow-lg)", transform: "scale(1)" });
                                    }
                                ),
                                e.sent.includes(o.username) || e.received.includes(o.username))
                            );
                            else {
                                t.show(), $(".dataparent2").hide();
                                let a = $("<p>").text("Add friend");
                                a.css({ width: "fit", height: "fit", padding: "6", "border-radius": "5px", "background-color": "rgb(22 163 74)", color: "rgb(209 213 219)", cursor: "pointer" });
                                let c = $("<p>").text(o.username);
                                "light" === n || null === n ? c.css({ "font-size": "bold", color: "limegreen" }) : c.css({ "font-size": "bold", color: "white" });
                                let d = $("<p>").text(o.bio),
                                    p = $("<img>");
                                p.attr("src", o.pics),
                                    p.attr("alt", "Profile Picture"),
                                    p.addClass("w-[80px] h-[80px]"),
                                    p.attr("height", "60px !important"),
                                    p.css("border-radius", "50%"),
                                    s.css({ display: "grid", gap: "5px" }),
                                    s.append(c),
                                    s.append(d),
                                    s.append(a),
                                    l.append(p),
                                    l.append(s),
                                    l.appendTo(t);
                                let u = document.querySelector('[name="csrfmiddlewaretoken"]').value;
                                a.click(function () {
                                    $.ajax({
                                        url: `${processenv}/addfriends/${o.username}/`,
                                        type: "POST",
                                        dataType: "json",
                                        beforeSend: function (e, t) {
                                            e.setRequestHeader("X-CSRFToken", u);
                                        },
                                        success: function (e) {
                                            "ok" == e.success
                                                ? (Toastify({
                                                      text: "Request sent",
                                                      duration: 3e3,
                                                      newWindow: !0,
                                                      gravity: "top",
                                                      position: "right",
                                                      stopOnFocus: !0,
                                                      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
                                                  }).showToast(),
                                                  a.text("Request sent"),
                                                  onlineSocket.send(JSON.stringify({ message: `${o.username} sent you a friend request`, receiver: o.username, sender: requestUser, type: "friendrequest" })))
                                                : Toastify({
                                                      text: "Request not sent! try again later",
                                                      duration: 3e3,
                                                      newWindow: !0,
                                                      close: !0,
                                                      gravity: "top",
                                                      position: "right",
                                                      stopOnFocus: !0,
                                                      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
                                                  }).showToast();
                                        },
                                    });
                                });
                            }
                        }
                    });
            },
            error: function (e) {},
        });
    });
const uploadPreview = document.getElementById("uploadPreview"),
    parentmodalpreview = document.getElementById("parentmodalpreview"),
    groupfileinputcontainer = document.querySelector(".group-file-input-container"),
    modalpreview = document.getElementById("modalpreview"),
    uploadpreviewImage = document.getElementById("uploadPreviewImage"),
    uploadsubmitButton = document.getElementById("uploadsubmitButton"),
    uploadCancelButton = document.getElementById("uploadcancelButton");
function previewFn(e, t, o, n, l, s, r, a, c) {
    let d = new FileReader(),
        p = e.target.files[0],
        u = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    p &&
        ((d.onload = function (e) {
            (t.src = e.target.result), (n.style.display = "block"), (u.style.display = "none");
        }),
        d.readAsDataURL(p)),
        (l.onclick = function (e) {
            (t.value = ""), (n.style.display = "none");
        }),
        (o.onclick = function (e) {
            (r.value = ""), (c.style.display = "none"), (a.style.display = "block");
        }),
        (s.onclick = function (e) {
            (n.style.display = "none"), (u.style.display = "block"), (r.style.display = "block");
            let t = URL.createObjectURL(p);
            (a.style.display = "flex"), (a.style.justifyContent = "center"), (a.style.gap = "1rem"), (c.style.display = "block"), (r.src = t);
        });
}
function previewFn2(e, t, o, n, l, s, r, a, c) {
    let d = new FileReader(),
        p = e.target.files[0],
        u = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    p &&
        ((d.onload = function (e) {
            (t.src = e.target.result), (n.style.display = "block"), (u.style.display = "none");
        }),
        d.readAsDataURL(p)),
        (l.onclick = function (e) {
            (t.value = ""), (n.style.display = "none");
        }),
        (s.onclick = function (e) {
            (n.style.display = "none"), (u.style.display = "block"), (r.style.display = "block");
            let t = URL.createObjectURL(p);
            (a.style.display = "flex"), (a.style.justifyContent = "center"), (a.style.gap = "1rem"), (c.style.display = "block"), (r.src = t);
        }),
        (o.onclick = function (e) {
            (r.value = ""), (c.style.display = "none"), (a.style.display = "block");
        });
}
$(document).ready(function () {
    let e = $("#groupcreate"),
        t = document.querySelector("#groupmodalpost"),
        o = document.querySelector("#grouppostsubmit"),
        n = document.getElementById("groupPost-preview-cancel"),
        l = $("#groupclose"),
        s = document.querySelector(".groupPostfile-input-container"),
        r = document.querySelector("#groupPostparentmodalpreview"),
        a = document.querySelector("#groupPostmodalpreview");
    $("#home").click(function () {
        $("#sidebar").toggleClass("visible");
    }),
        $("#sidebarCancel").click(function () {
            $("#sidebar").toggleClass("visible");
        }),
        e.click(function () {
            (t.style.display = "block"), document.querySelector("#id_insidegroupcontent").focus();
        }),
        l.click(function () {
            t.style.display = "none";
        }),
        null !== document.querySelector("#groupcreate_id_post_file") &&
            document.querySelector("#groupcreate_id_post_file").addEventListener("change", (e) => {
                previewFn(e, uploadpreviewImage, n, uploadPreview, uploadCancelButton, uploadsubmitButton, a, s, r);
            });
    let c = document.querySelector("#group-preview-cancel"),
        d = document.querySelector("#modalpreview"),
        p = document.querySelector("#parentmodalpreview");
    document.querySelector("#group_id_file").addEventListener("change", (e) => {
        previewFn(e, uploadpreviewImage, c, uploadPreview, uploadCancelButton, uploadsubmitButton, d, groupfileinputcontainer, p);
    }),
        $("#groupsubmit").on("click", function () {
            let e = $("#id_name").val(),
                t = $("#id_description").val(),
                o = new FormData();
            o.append("csrfmiddlewaretoken", csrfToken2),
                o.append("name", e),
                o.append("description", t),
                $("#group_id_file")[0] && o.append("cover_photo", $("#group_id_file")[0].files[0]),
                $.ajax({
                    method: "POST",
                    url: `${processenv}/create-group/`,
                    data: o,
                    processData: !1,
                    contentType: !1,
                    success: function (e) {
                        !1 === e.success
                            ? Toastify({
                                  text: "Group creation failed",
                                  duration: 3e3,
                                  newWindow: !0,
                                  close: !0,
                                  gravity: "top",
                                  position: "right",
                                  stopOnFocus: !0,
                                  style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
                              }).showToast()
                            : (window.location.reload(),
                              Toastify({
                                  text: "Group creation successfull",
                                  duration: 3e3,
                                  newWindow: !0,
                                  gravity: "top",
                                  position: "right",
                                  stopOnFocus: !0,
                                  style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
                              }).showToast());
                    },
                    error: function (e) {},
                });
        }),
        null !== n &&
            (n.onclick = function (e) {
                (a.value = ""), (r.style.display = "none"), (groupfileinputcontainer.style.display = "block");
            }),
        null !== o &&
            o.addEventListener("click", async (e) => {
                e.preventDefault();
                let o = document.querySelector("#groupcreate_id_post_file"),
                    n = document.querySelector("#id_insidegroupcontent").value,
                    l = new FormData();
                null !== n && l.append("text", n), o.files.length > 0 && l.append("file", o.files[0]);
                let s = await fetch(`${baseresponseUrlKey}/post-on-group/${groupname}/`, { method: "POST", body: l, headers: { "X-CSRFToken": csrfToken2 } });
                s.ok
                    ? ((t.style.display = "none"),
                      201 === s.status
                          ? (Toastify({ text: "Post successfull ", duration: 3e3, newWindow: !0, gravity: "top", position: "right", stopOnFocus: !0, style: { background: "linear-gradient(to right, #00b09b, #96c93d)" } }).showToast(),
                            window.location.reload())
                          : Toastify({
                                text: "Post successfull, waiting for approval ",
                                duration: 3e3,
                                newWindow: !0,
                                gravity: "top",
                                position: "right",
                                stopOnFocus: !0,
                                style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
                            }).showToast(),
                      (document.querySelector("#id_insidegroupcontent").value = ""),
                      (document.querySelector("#groupcreate_id_post_file").value = ""))
                    : Toastify({
                          text: "Post unsuccessfull, please try again later ",
                          duration: 3e3,
                          newWindow: !0,
                          close: !0,
                          gravity: "top",
                          position: "right",
                          stopOnFocus: !0,
                          style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
                      }).showToast();
            });
}),
    $(document).ready(function () {
        let e = $(".likeholder");
        $.ajaxSetup({ headers: { "X-CSRFToken": csrfToken2 } }),
            $(".like-button").on("click", function () {
                let t = $(this).data("post-id"),
                    o = $(this);
                $.ajax({
                    url: `${processenv}/like_post/`,
                    method: "POST",
                    data: { post_id: t },
                    dataType: "json",
                    success: function (n) {
                        if ((n.like_count > 1 && e.text(n.like_count), "like" === n.status))
                            o.css("color", "rgb(220, 38, 38)"), onlineSocket.send(JSON.stringify({ message: `${samePerson} just liked your photo`, receiver: n.receiver, postId: t, sender: samePerson, type: "likepost" }));
                        else {
                            let l = localStorage.getItem("mode");
                            "light" === l ? o.css("color", "#0d2438") : o.css("color", "white");
                        }
                    },
                    error: function () {
                        alert("Error occurred while processing your request.");
                    },
                });
            }),
            $(".group-like-button").on("click", function () {
                let t = $(this).data("post-id"),
                    o = $(this);
                $.ajax({
                    url: `${processenv}/group_like_post/`,
                    method: "POST",
                    data: { post_id: t },
                    dataType: "json",
                    success: function (t) {
                        if ((t.like_count > 1 && e.text(t.like_count), "like" === t.status)) o.css("color", "rgb(220, 38, 38)");
                        else {
                            let n = localStorage.getItem("mode");
                            "light" === n ? o.css("color", "#0d2438") : o.css("color", "white");
                        }
                    },
                    error: function () {
                        alert("Error occurred while processing your request.");
                    },
                });
            });
    });
const leftnav = document.querySelector("#leftnavmessage"),
    topmessageNav = document.querySelector("#topmessagenav"),
    baserooms = document.querySelector("#baseuserid").innerHTML,
    initialprotocol = "https:" === window.location.protocol ? "wss:" : "ws:",
    srcs = `${initialprotocol}//${window.location.host}/ws/chat/${baserooms}/ `,
    messagesocket = new WebSocket(srcs);
(messagesocket.onmessage = function (e) {
    let t = JSON.parse(e.data);
    if (("initialmessage" === t.type && "/messages/" === window.location.pathname && fetchData(t.online), "chat_message" === t.type)) {
        if ((fetchData(t.online), "/messages/" === window.location.pathname)) localStorage.removeItem("count");
        else if (("" !== t.message && (count++, localStorage.setItem("count", count)), count >= 1)) {
            let o = document.querySelector("#messagenotif"),
                n = document.querySelector("#messagenotif2");
            null !== o && ((o.innerHTML = count), (o.style.display = "flex"), (o.style.color = "white"), (o.style.justifyContent = "center"), (o.style.alignItems = "center")),
                null !== n && ((n.innerHTML = count), (n.style.color = "white"), (n.style.display = "flex"), (n.style.justifyContent = "center"), (n.style.alignItems = "center"));
        }
    }
    if ("typing" === t.type) {
        let l = document.querySelector("#messagebody");
        null !== l && ((l.innerHTML = "Typing..."), (l.style.color = "green"));
    }
    if ("canceltyping" === t.type) {
        let s = document.querySelector("#messagebody");
        null !== s && ((s.innerHTML = typingStore), (s.style.color = "#0D2438"));
    }
}),
    leftnav &&
        (leftnav.onclick = () => {
            localStorage.removeItem("count"), fetchData();
        }),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.querySelector("#modal"),
            t = document.querySelector("#submit"),
            o = document.querySelector("#statussubmit"),
            n = document.querySelector("#statusmodal"),
            l = document.querySelector("#status"),
            s = document.querySelector("#button"),
            r = document.querySelector("#statusbutton"),
            a = document.querySelector("#id_filepost"),
            c = document.querySelector("#id_filestatus"),
            d = document.getElementById("postparentmodalpreview"),
            p = document.querySelector(".file-input-container"),
            u = document.getElementById("postmodalpreview"),
            y = document.getElementById("post-preview-cancel"),
            g = document.getElementById("statusparentmodalpreview"),
            m = document.querySelector(".status-file-input-container"),
            f = document.getElementById("statusmodalpreview"),
            h = document.getElementById("status-preview-cancel");
        s.addEventListener("click", () => {
            e.style.display = "none";
        }),
            r.addEventListener("click", () => {
                n.style.display = "none";
            }),
            a.addEventListener("change", (e) => previewFn2(e, uploadpreviewImage, y, uploadPreview, uploadCancelButton, uploadsubmitButton, u, p, d)),
            t.addEventListener("click", async (e) => {
                e.preventDefault();
                let t = new FormData(document.querySelector("#postform"));
                a.files.length > 0 && t.append("file", a.files[0]);
                let o = await fetch(`${processenv}/create_post/`, { method: "POST", body: t, headers: { "X-CSRFToken": "{{ csrf_token }}" } });
                o.ok
                    ? (Toastify({ text: "Post successfull", duration: 3e3, newWindow: !0, gravity: "top", position: "right", stopOnFocus: !0, style: { background: "linear-gradient(to right, #00b09b, #96c93d)" } }).showToast(),
                      window.location.reload())
                    : Toastify({
                          text: "Post unsuccessfull, please try again later ",
                          duration: 3e3,
                          newWindow: !0,
                          close: !0,
                          gravity: "top",
                          position: "right",
                          stopOnFocus: !0,
                          style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
                      }).showToast();
            }),
            l &&
                l.addEventListener("click", function () {
                    (n.style.display = "block"), document.querySelector("#status_content").focus();
                }),
            c.addEventListener("change", (e) => previewFn2(e, uploadpreviewImage, h, uploadPreview, uploadCancelButton, uploadsubmitButton, f, m, g)),
            o &&
                o.addEventListener("click", async (e) => {
                    e.preventDefault();
                    let t = new FormData(document.querySelector("#statusform"));
                    c.files.length > 0 && t.append("file", c.files[0]);
                    let o = await fetch(`${processenv}/create_status/`, { method: "POST", body: t, headers: { "X-CSRFToken": "{{ csrf_token }}" } });
                    o.ok
                        ? (window.location.reload(),
                          Toastify({ text: "Status created", duration: 3e3, newWindow: !0, gravity: "top", position: "right", stopOnFocus: !0, style: { background: "linear-gradient(to right, #00b09b, #96c93d)" } }).showToast())
                        : (Toastify({
                              text: "An error occured! try again later",
                              duration: 3e3,
                              newWindow: !0,
                              close: !0,
                              gravity: "top",
                              position: "right",
                              stopOnFocus: !0,
                              style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
                          }).showToast(),
                          (n.style.display = "none"));
                });
    }),
    window.addEventListener("load", function () {
        document.querySelector("#loadingmodal").style.display = "none";
    });
