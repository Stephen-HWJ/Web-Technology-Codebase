//
//  ParentPagerTabViewController.swift
//  newsApp
//
//  Created by Stephen Huang on 4/19/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit
import XLPagerTabStrip
import Alamofire
import SwiftyJSON

class ParentPagerTabViewController: ButtonBarPagerTabStripViewController, UISearchResultsUpdating {
    let purpleInspireColor = UIColor(red:0.13, green:0.03, blue:0.25, alpha:1.0)
    let redColor = UIColor(red: 221/255.0, green: 0/255.0, blue: 19/255.0, alpha: 1.0)
    let unselectedIconColor = UIColor(red: 73/255.0, green: 8/255.0, blue: 10/255.0, alpha: 1.0)
    
    /// Search controller to help us with filtering items in the table view.
    var searchController: UISearchController!
    
    /// Search results table view.
    private var resultsTableController: ResultsTableController!
    
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
        
        resultsTableController = self.storyboard?.instantiateViewController(withIdentifier: "ResultsTableController") as? ResultsTableController
        // This view controller is interested in table view row selections.
        resultsTableController.tableView.delegate = resultsTableController
        resultsTableController.navVC = self.navigationController
        
        searchController = UISearchController(searchResultsController: resultsTableController)
        searchController.delegate = self
        searchController.searchResultsUpdater = self
        searchController.searchBar.autocapitalizationType = .none
        searchController.searchBar.delegate = self // Monitor when the search button is tapped.
        
        // Place the search bar in the navigation bar.
        navigationItem.searchController = searchController
        definesPresentationContext = true
        
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
        return [child_1, child_2, child_3, child_4, child_5, child_6]
    }
    
    
    func updateSearchResults(for searchController: UISearchController) {
        if let resultsController = searchController.searchResultsController as? ResultsTableController {
            let suggestApi = "https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=\(searchController.searchBar.text!)"
            let url = suggestApi.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
            let headers: HTTPHeaders = ["Ocp-Apim-Subscription-Key": "fa5edb60ea4a419da391b8968bbfa824"]
            
            Alamofire.request(url!, headers: headers).responseJSON(completionHandler: {response in
                switch response.result {
                case .success(let value):
                    let json = JSON(value)
                    let resultArray = json["suggestionGroups"].arrayValue[0]["searchSuggestions"].arrayValue.map({$0["displayText"].stringValue})
                    resultsController.searchResults = resultArray
                    resultsController.tableView.reloadData()
                case .failure(let error):
                    print(error)
                }
            })
            
        }
    }
}


// MARK: - UISearchBarDelegate

extension ParentPagerTabViewController: UISearchBarDelegate {
    
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        searchBar.resignFirstResponder()
    }
    
    func searchBar(_ searchBar: UISearchBar, selectedScopeButtonIndexDidChange selectedScope: Int) {
//        updateSearchResults(for: searchController)
    }
    
}

// MARK: - UISearchControllerDelegate

// Use these delegate functions for additional control over the search controller.

extension ParentPagerTabViewController: UISearchControllerDelegate {
    
    func presentSearchController(_ searchController: UISearchController) {
        //Swift.debugPrint("UISearchControllerDelegate invoked method: \(#function).")
    }
    
    func willPresentSearchController(_ searchController: UISearchController) {
        //Swift.debugPrint("UISearchControllerDelegate invoked method: \(#function).")
    }
    
    func didPresentSearchController(_ searchController: UISearchController) {
        //Swift.debugPrint("UISearchControllerDelegate invoked method: \(#function).")
    }
    
    func willDismissSearchController(_ searchController: UISearchController) {
        //Swift.debugPrint("UISearchControllerDelegate invoked method: \(#function).")
    }
    
    func didDismissSearchController(_ searchController: UISearchController) {
        //Swift.debugPrint("UISearchControllerDelegate invoked method: \(#function).")
    }
    
}
