function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openSignUpScreen(params) {
        var win = Alloy.createController("authenctication/signUp", {
            params: params
        }).getView();
        win.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "authenctication/login";
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
    $.__views.login = Ti.UI.createWindow({
        layout: "vertical",
        fullscreen: true,
        backgroundColor: "white",
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    $.__views.__alloyId2 = Ti.UI.createScrollView({
        layout: "vertical",
        id: "__alloyId2"
    });
    $.__views.login.add($.__views.__alloyId2);
    $.__views.tutme = Ti.UI.createImageView({
        image: "/images/logo.png",
        height: 50,
        top: 30,
        id: "tutme"
    });
    $.__views.__alloyId2.add($.__views.tutme);
    $.__views.emailAddress = Ti.UI.createTextField({
        hintText: "Email Address",
        width: "80%",
        top: 50,
        keyboardType: Titanium.UI.KEYBOARD_TYPE_EMAIL,
        id: "emailAddress"
    });
    $.__views.__alloyId2.add($.__views.emailAddress);
    $.__views.password = Ti.UI.createTextField({
        hintText: "Password",
        width: "80%",
        top: 20,
        passwordMask: true,
        id: "password"
    });
    $.__views.__alloyId2.add($.__views.password);
    $.__views.Login = Ti.UI.createButton({
        title: "Login",
        height: 50,
        top: 30,
        width: 100,
        backgroundColor: "#6299FF",
        id: "Login"
    });
    $.__views.__alloyId2.add($.__views.Login);
    $.__views.bottomView = Ti.UI.createView({
        height: 70,
        width: Titanium.UI.FILL,
        left: 20,
        right: 20,
        top: 30,
        id: "bottomView"
    });
    $.__views.__alloyId2.add($.__views.bottomView);
    $.__views.registerNow = Ti.UI.createLabel({
        text: "Register",
        left: 0,
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        color: "black",
        id: "registerNow"
    });
    $.__views.bottomView.add($.__views.registerNow);
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
    require("network");
    var dialog, dialog2, dialog3;
    $.registerNow.addEventListener("click", function() {
        Ti.API.info("**************");
        var opts = {
            cancel: 3,
            options: [ "Student", "Tutor", "Organisation", "Cancel" ],
            selectedIndex: 3,
            destructive: 0,
            title: "Register As"
        };
        dialog = Ti.UI.createOptionDialog(opts).show();
    });
    var opts3 = {
        cancel: 2,
        options: [ "Self Institute", "Organisational Institue", "Cancel" ],
        selectedIndex: 2,
        destructive: 0,
        title: "Register As"
    };
    dialog3 = Ti.UI.createOptionDialog(opts3);
    dialog.addEventListener("click", function(e) {
        if (0 == e.index) {
            params = {
                student: "student"
            };
            openSignUpScreen();
        } else if (1 == e.index) {
            var opts2 = {
                cancel: 2,
                options: [ "Tutor Home", "Home Tutor", "Cancel" ],
                selectedIndex: 2,
                destructive: 0,
                title: "Register As"
            };
            dialog2 = Ti.UI.createOptionDialog(opts2);
            dialog2.show();
        } else 2 == e.index && dialog3.show();
    });
    dialog2.addEventListener("click", function(e) {
        0 == e.index ? params = {
            homeTutor: "homeTutor"
        } : 1 == e.index && (params = {
            tutorHome: "tutorHome"
        });
        openSignUpScreen();
    });
    dialog3.addEventListener("click", function(e) {
        0 == e.index ? params = {
            selfInstitute: "selfInstitute"
        } : 1 == e.index && (params = {
            organisationalInstitue: "organisationalInstitue"
        });
        openSignUpScreen();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;