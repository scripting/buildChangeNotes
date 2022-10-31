var myProductName = "buildChanges"; myVersion = "0.4.0";    

const utils = require ("daveutils");
const oldschool = require ("oldschoolblog");
const opml = require ("opml");

const blogName = "changenotes";
const urlBlogOpml = "http://scripting.com/publicfolder/feedland/changenotes/changes.opml";
const basePath = "/data.feedland.org/changenotes/";
const baseUrl = "http://data.feedland.org/changenotes/";

const whenstart = new Date ();
var config = {
	flHttpEnabled: true,
	blogs: {
		changenotes: {
			title: "FeedLand Change Notes",
			description: "Features and fixes in the FeedLand system.",
			link: "http://data.feedland.org/changenotes/",
			urlOpml: urlBlogOpml,
			basePath,
			basePathItems: basePath + "items/",
			baseUrl,
			
			language: "en-us",
			docs: "http://cyber.law.harvard.edu/rss/rss.html",
			docsForJsonFeed: "https://github.com/scripting/Scripting-News/blob/master/rss-in-json/README.md",
			twitterScreenName: "davewiner",
			facebookPageName: "dave.winer.12",
			maxFeedItems: 50,
			appDomain: "data.feedland.org",
			flRssCloudEnabled: true,
			rssCloudDomain: "rpc.rsscloud.io",
			rssCloudPort: 5337,
			rssCloudPath: "/pleaseNotify",
			rssPingPath: "/ping",
			rssCloudRegisterProcedure: "",
			rssCloudProtocol: "http-post",
			customPages: new Array (),
			maxDaysOnHomePage: 25,
			flUploadItemsToS3: true, 
			urlHeaderImage: "http://scripting.com/2016/10/31/auroraBridge.png",
			flIncludeImageInMetadata: false,
			urlGlossaryOpml: "http://electricserver.scripting.com/users/davewiner/electric/glossary.opml",
			flGoogleAnalytics: false,
			idGoogleAccount: "UA-39531990-1"
			}
		}
	}
oldschool.init (config, function () { 
	opml.readOutline (urlBlogOpml, function (err, theOutline) {
		if (err) {
			console.log (err.message);
			}
		else {
			oldschool.publishBlog (theOutline.opml, {blogName}, function (blogConfig, eventLog) {
				const data = {
					baseUrl: blogConfig.baseUrl,
					ctSecs: utils.secondsSince (whenstart),
					oldSchoolVersion: oldschool.getVersionInfo ().myVersion,
					eventLog, //11/2/21 by DW
					headLevelAtts: theOutline.opml.head
					};
				console.log (utils.jsonStringify (data));
				});
			}
		});
	});
