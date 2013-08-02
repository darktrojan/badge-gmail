let title;
let badge = 0;
let lastSet = "";
let mutationOptions = { childList: true };

function checkAtom() {
	let cookies = document.cookie.split("; ");
	if (!cookies.some(function(c) { return /^SID=/.test(c) })) {
		clearInterval(interval);
		return;
	}

	let xhr = new XMLHttpRequest();
	xhr.open("get", "https://mail.google.com/mail/feed/atom");
	xhr.onload = function() {
		badge = parseInt(xhr.responseXML.documentElement.querySelector("fullcount").textContent, 10);
		setTitle();
	}
	xhr.send();
}

function getTitle() {
	title = document.title.replace(/\s+\(\d+\)/, "");
}

function setTitle() {
	if (badge)
		lastSet = document.title = title + " (" + badge + ")";
	else
		lastSet = document.title = title;

	observer.takeRecords();
}

let observer = new MutationObserver(function(aRecords, aObserver) {
	if (document.title == lastSet)
		return;

	getTitle();
	setTitle();
});

observer.observe(document.querySelector("title"), mutationOptions);

getTitle();
checkAtom();
let interval = setInterval(checkAtom, 30000);

self.on("detach", function() {
	observer.disconnect();
	clearInterval(interval);
});
