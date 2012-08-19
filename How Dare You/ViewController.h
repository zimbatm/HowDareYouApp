//
//  ViewController.h
//  How Dare You
//
//  Created by Jonas Pfenniger on 14/08/2012.
//  Copyright (c) 2012 Jonas Pfenniger. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AppDelegate.h"
#include <AudioToolbox/AudioToolbox.h>

@interface ViewController : UIViewController

- (void) playSound;
- (IBAction) playSystemSound: (id) sender;
- (IBAction) showPopup;

@end
