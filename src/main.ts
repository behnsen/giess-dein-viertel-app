// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "@nativescript/angular/platform";

import { AppModule } from "./app/app.module";
import { connectionType, getConnectionType, startMonitoring, stopMonitoring }from "tns-core-modules/connectivity";
import { android, AndroidApplication, AndroidActivityBundleEventData, AndroidActivityEventData, AndroidActivityResultEventData, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { on as applicationOn, launchEvent, suspendEvent, resumeEvent, exitEvent, lowMemoryEvent, uncaughtErrorEvent, ApplicationEventData } from "tns-core-modules/application";

import {exit} from 'nativescript-exit';

// Android activity events
if (android) {
    android.on(AndroidApplication.activityCreatedEvent, function (args: AndroidActivityBundleEventData) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity + ", Bundle: " + args.bundle);
    });

    android.on(AndroidApplication.activityDestroyedEvent, function (args: AndroidActivityEventData) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
        console.log(android);
        exit();
    });

    android.on(AndroidApplication.activityStartedEvent, function (args: AndroidActivityEventData) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });

    android.on(AndroidApplication.activityPausedEvent, function (args: AndroidActivityEventData) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });

    android.on(AndroidApplication.activityResumedEvent, function (args: AndroidActivityEventData) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });

    android.on(AndroidApplication.activityStoppedEvent, function (args: AndroidActivityEventData) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity);
    });

    android.on(AndroidApplication.saveActivityStateEvent, function (args: AndroidActivityBundleEventData) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity + ", Bundle: " + args.bundle);
    });

    android.on(AndroidApplication.activityResultEvent, function (args: AndroidActivityResultEventData) {
        console.log("Event: " + args.eventName + ", Activity: " + args.activity +
            ", requestCode: " + args.requestCode + ", resultCode: " + args.resultCode + ", Intent: " + args.intent);
    });

    android.on(AndroidApplication.activityBackPressedEvent, (args: any) => { args.cancel = true;
        android.foregroundActivity.finish();
    });

}


applicationOn(launchEvent, (args: ApplicationEventData) => {
    if (args.android) {
        // For Android applications, args.android is an android.content.Intent class.
        console.log("Launched Android application with the following intent: " + args.android + ".");
    } else if (args.ios !== undefined) {
        // For iOS applications, args.ios is NSDictionary (launchOptions).
        console.log("Launched iOS application with options: " + args.ios);
    }
});

applicationOn(suspendEvent, (args: ApplicationEventData) => {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("Activity: " + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios);
    }
});

applicationOn(resumeEvent, (args: ApplicationEventData) => {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("Activity: " + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios);
    }
});

applicationOn(exitEvent, (args: ApplicationEventData) => {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("Activity: " + args.android);
        if (args.android.isFinishing()) {
            console.log("Activity: " + args.android + " is exiting");
        } else {
            console.log("Activity: " + args.android + " is restarting");
        }
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios);
    }
});

applicationOn(lowMemoryEvent, (args: ApplicationEventData) => {
    if (args.android) {
        // For Android applications, args.android is an android activity class.
        console.log("Activity: " + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is UIApplication.
        console.log("UIApplication: " + args.ios);
    }
});

applicationOn(uncaughtErrorEvent, (args: ApplicationEventData) => {
    if (args.android) {
        // For Android applications, args.android is an NativeScriptError.
        console.log("NativeScriptError: " + args.android);
    } else if (args.ios) {
        // For iOS applications, args.ios is NativeScriptError.
        console.log("NativeScriptError: " + args.ios);
    }
});






// A traditional NativeScript application starts by initializing global objects,
// setting up global CSS rules, creating, and navigating to the main page.
// Angular applications need to take care of their own initialization:
// modules, components, directives, routes, DI providers.
// A NativeScript Angular app needs to make both paradigms work together,
// so we provide a wrapper platform object, platformNativeScriptDynamic,
// that sets up a NativeScript application and can bootstrap the Angular framework.
platformNativeScriptDynamic().bootstrapModule(AppModule);

export function onNavigatedTo(args) {
    const page = args.object;
    let connectionTypeString;

    const type = getConnectionType();

    switch (type) {
        case connectionType.none:
            console.log("No connection");
            connectionTypeString = "No Internet connectivity!";
            break;
        case connectionType.wifi:
            console.log("WiFi connection");
            connectionTypeString = "WiFI connectivity!";
            break;
        case connectionType.mobile:
            console.log("Mobile connection");
            connectionTypeString = "Mobile connectivity!";
            break;
        case connectionType.ethernet:
            console.log("Ethernet connection");
            connectionTypeString = "Ethernet connectivity!";
            break;
        case connectionType.bluetooth:
            console.log("Bluetooth connection");
            connectionTypeString = "Bluetooth connectivity!";
            break;
        default:
            break;
    }

    startMonitoring((newConnectionType) => {
        switch (newConnectionType) {
            case connectionType.none:
                console.log("Connection type changed to none.");
                break;
            case connectionType.wifi:
                console.log("Connection type changed to WiFi.");
                break;
            case connectionType.mobile:
                console.log("Connection type changed to mobile.");
                break;
            case connectionType.ethernet:
                console.log("Connection type changed to ethernet.");
                break;
            case connectionType.bluetooth:
                console.log("Connection type changed to bluetooth.");
                break;
            default:
                break;
        }
    });

    // Stoping the connection monitoring
    stopMonitoring();

    page.bindingContext = { connectionType: connectionTypeString };
}
