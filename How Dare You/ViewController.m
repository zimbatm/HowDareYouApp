//
//  ViewController.m
//  How Dare You
//
//  Created by Jonas Pfenniger on 14/08/2012.
//  Copyright (c) 2012 Jonas Pfenniger. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
        return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
    } else {
        return YES;
    }
}
//
//-(BOOL)canBecomeFirstResponder {
//    return YES;
//}
//
//-(void)viewDidAppear:(BOOL)animated {
//    [super viewDidAppear:animated];
//    [self becomeFirstResponder];
//}
//
//- (void)viewWillDisappear:(BOOL)animated {
//    [self resignFirstResponder];
//    [super viewWillDisappear:animated];
//}
- (void) playSound {
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [appDelegate playSound];
}

// Respond to a tap on the System Sound button.
- (IBAction) playSystemSound: (id) sender {
    [self playSound];
}

- (IBAction) showPopup {
    NSLog(@"Incoming popup");
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle: @"About" message: @"This app is really just for fun but I hope you enjoy it\n\nDo you like it ?" delegate: self cancelButtonTitle:@"No" otherButtonTitles: @"Yes", nil];
    [alert show];
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
    if (buttonIndex == 0) {
        [self playSound];
    } else {
        NSLog(@"Rate");
        NSURL *url = [NSURL URLWithString: @"http://df.ru"];
        [[UIApplication sharedApplication] openURL:url];
    }
}

- (void)motionEnded:(UIEventSubtype)motion withEvent:(UIEvent *)event {
    if (motion == UIEventSubtypeMotionShake ) {
        NSLog(@"Shake it baby");
        [self playSound];
    }
}

@end
