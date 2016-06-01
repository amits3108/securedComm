function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function register() {
        function callBack(e) {
            e.success ? alert(JSON.stringify(e)) : Ti.API.info(JSON.stringify(e));
        }
        var requestData = {
            email: $.emailAddress.value,
            mobile: $.phoneNo.value,
            name: $.name.value,
            user_type: "student",
            password: $.password.value
        };
        network.postRequest({
            type: "POST",
            url: "api.tutme.in/user/register",
            requestData: requestData,
            requestHeaders: {
                "public-key": "c8a1ad1332716aa15752422360e739a5",
                token: "bd879c74e91e49b623f6ea02435e2725"
            },
            callBack: callBack
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "authenctication/signUp";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.signUpWin = Ti.UI.createWindow({
        layout: "vertical",
        fullscreen: true,
        id: "signUpWin",
        backgroundColor: "white"
    });
    $.__views.signUpWin && $.addTopLevelView($.__views.signUpWin);
    $.__views.__alloyId3 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId3"
    });
    $.__views.signUpWin.add($.__views.__alloyId3);
    $.__views.tutme = Ti.UI.createImageView({
        height: 50,
        top: 30,
        id: "tutme",
        image: "/images/logo.png"
    });
    $.__views.__alloyId3.add($.__views.tutme);
    $.__views.name = Ti.UI.createTextField({
        hintText: "Name",
        width: "80%",
        top: 50,
        id: "name"
    });
    $.__views.__alloyId3.add($.__views.name);
    $.__views.phoneNo = Ti.UI.createTextField({
        hintText: "Phone No",
        width: "80%",
        top: 20,
        id: "phoneNo"
    });
    $.__views.__alloyId3.add($.__views.phoneNo);
    $.__views.emailAddress = Ti.UI.createTextField({
        hintText: "Email Address",
        width: "80%",
        top: 20,
        keyboardType: Titanium.UI.KEYBOARD_TYPE_EMAIL,
        id: "emailAddress"
    });
    $.__views.__alloyId3.add($.__views.emailAddress);
    $.__views.password = Ti.UI.createTextField({
        hintText: "Password",
        width: "80%",
        top: 20,
        passwordMask: true,
        id: "password"
    });
    $.__views.__alloyId3.add($.__views.password);
    $.__views.register = Ti.UI.createButton({
        title: "Register",
        height: 50,
        top: 30,
        width: 100,
        backgroundColor: "#6299FF",
        id: "register"
    });
    $.__views.__alloyId3.add($.__views.register);
    register ? $.addListener($.__views.register, "click", register) : __defers["$.__views.register!click!register"] = true;
    $.__views.linkedIn = Ti.UI.createImageView({
        id: "linkedIn",
        image: "/images/LinkedIn.png",
        top: "20dp"
    });
    $.__views.__alloyId3.add($.__views.linkedIn);
    $.__views.bottomView = Ti.UI.createView({
        height: 70,
        width: Titanium.UI.FILL,
        left: 20,
        right: 20,
        top: 30,
        id: "bottomView"
    });
    $.__views.__alloyId3.add($.__views.bottomView);
    $.__views.login = Ti.UI.createLabel({
        text: "Login",
        left: 0,
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        color: "black",
        id: "login"
    });
    $.__views.bottomView.add($.__views.login);
    $.__views.forgotPassword = Ti.UI.createLabel({
        text: "Forgot\nPassword",
        right: 0,
        textAlign: "center",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        color: "black",
        id: "forgotPassword"
    });
    $.__views.bottomView.add($.__views.forgotPassword);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    var social = require("social");
    require("utils");
    var network = require("network");
    $.signUpWin.addEventListener("open", function() {
        var params = params || {};
        Ti.API.info("========Params===============" + JSON.stringify(params));
    });
    var linkedin = social.create({
        consumerSecret: "s7ZV7hViil2DaqPp",
        consumerKey: "75c5prnmkejwoe",
        site: "linkedin"
    });
    $.linkedIn.addEventListener("click", function() {
        linkedin.getProfileLinkedin({
            message: "messageContent",
            success: function(e) {
                response = JSON.stringify(e);
                Ti.API.info(response.siteStandardProfileRequest + "****" + e.firstName + "response" + JSON.stringify(e));
            },
            error: function(e) {
                Ti.API.info("Error while posting" + JSON.stringify(e));
            }
        });
    });
    $.login.addEventListener("click", function() {
        var win = Alloy.createController("authenctication/login").getView();
        win.open();
    });
    __defers["$.__views.register!click!register"] && $.addListener($.__views.register, "click", register);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;