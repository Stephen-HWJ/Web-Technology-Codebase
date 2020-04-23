//
//  ParentPagerTabViewController.swift
//  newsApp
//
//  Created by Stephen Huang on 4/19/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit
import XLPagerTabStrip

class ParentPagerTabViewController: ButtonBarPagerTabStripViewController {
    let purpleInspireColor = UIColor(red:0.13, green:0.03, blue:0.25, alpha:1.0)
    let redColor = UIColor(red: 221/255.0, green: 0/255.0, blue: 19/255.0, alpha: 1.0)
    let unselectedIconColor = UIColor(red: 73/255.0, green: 8/255.0, blue: 10/255.0, alpha: 1.0)
    override func viewDidLoad() {
        // change selected bar color
        settings.style.buttonBarBackgroundColor = .white
        settings.style.buttonBarItemBackgroundColor = .white
//        settings.style.selectedBarBackgroundColor = purpleInspireColor
        settings.style.buttonBarItemFont = .boldSystemFont(ofSize: 14)
        settings.style.selectedBarHeight = 3.0
        settings.style.selectedBarBackgroundColor = .systemBlue
        settings.style.buttonBarMinimumLineSpacing = 0
        settings.style.buttonBarItemTitleColor = .gray
//        settings.style.buttonBarItemsShouldFillAvailiableWidth = true
        settings.style.buttonBarLeftContentInset = 0
        settings.style.buttonBarRightContentInset = 0
        changeCurrentIndexProgressive = { [weak self] (oldCell: ButtonBarViewCell?, newCell: ButtonBarViewCell?, progressPercentage: CGFloat, changeCurrentIndex: Bool, animated: Bool) -> Void in
            guard changeCurrentIndex == true else { return }
            oldCell?.label.textColor = .lightGray
            newCell?.label.textColor = .systemBlue
        }
        super.viewDidLoad()
    }
    
    override func viewControllers(for pagerTabStripController: PagerTabStripViewController) -> [UIViewController] {
//        let child_1 = HomeTableViewController(style: .plain, childInfo: IndicatorInfo(title: "home"))
//        let child_2 = HomeTableViewController(style: .plain, childInfo: IndicatorInfo(title: "home"))
//        let child_3 = HomeTableViewController(style: .plain, childInfo: IndicatorInfo(title: "home"))
        let child_1 = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "HomeTableViewController") as! HomeTableViewController
        let child_2 = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "HomeTableViewController") as! HomeTableViewController
        let child_3 = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "HomeTableViewController") as! HomeTableViewController
        let child_4 = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "HomeTableViewController") as! HomeTableViewController
        let child_5 = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "HomeTableViewController") as! HomeTableViewController
        let child_6 = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "HomeTableViewController") as! HomeTableViewController
        child_1.childInfo = "WORLD"
        child_2.childInfo = "BUSINESS"
        child_3.childInfo = "POLITICS"
        child_4.childInfo = "SPORTS"
        child_5.childInfo = "TECHNOLOGY"
        child_6.childInfo = "SCIENCE"
//        let child_2 = HomeTableViewController(style: .plain, childInfo: "table view 2")
        return [child_1, child_2, child_3, child_4, child_5, child_6]
    }
}
