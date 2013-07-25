let pageMod = require("sdk/page-mod");
let self = require("sdk/self");

pageMod.PageMod({
	attachTo: ["existing", "top"],
	include: "https://mail.google.com/mail/*",
	contentScriptFile: self.data.url("title.js")
});
