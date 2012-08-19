//
//  AppDelegate.h
//  How Dare You
//
//  Created by Jonas Pfenniger on 14/08/2012.
//  Copyright (c) 2012 Jonas Pfenniger. All rights reserved.
//

#import <UIKit/UIKit.h>
#include <AudioToolbox/AudioToolbox.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate> {
    SystemSoundID	soundFileObject;
}

@property (strong, nonatomic) UIWindow *window;
@property (readonly)	SystemSoundID	soundFileObject;


- (void) playSound;

@end
