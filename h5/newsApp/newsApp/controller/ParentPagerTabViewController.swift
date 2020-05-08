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

    let childrenViewControllers = [UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "HomeTableViewController") as! HomeTableViewController, UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "HomeTableViewController") as! HomeTableViewController, UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "HomeTableViewController") as! HomeTableViewController, UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "HomeTableViewController") as! HomeTableViewController, UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "HomeTableViewController") as! HomeTableViewController, UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "HomeTableViewController") as! HomeTableViewController]
    
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
        searchController.searchBar.placeholder = "Enter keyword.."
        searchController.searchBar.delegate = self // Monitor when the search button is tapped.
        
        // Place the search bar in the navigation bar.
        navigationItem.searchController = searchController
        definesPresentationContext = true
        
        super.viewDidLoad()
    }
    
    func reloadTables() {
        for tableVC in childrenViewControllers {
            if tableVC.isViewLoaded {
                tableVC.tableView.reloadData()
            }
        }
    }
    
    override func viewControllers(for pagerTabStripController: PagerTabStripViewController) -> [UIViewController] {
        
        let childInfos = [ "WORLD", "BUSINESS", "POLITICS", "SPORTS", "TECHNOLOGY", "SCIENCE"]
        for tableVCIndex in 0..<self.childrenViewControllers.count {
            childrenViewControllers[tableVCIndex].childInfo = childInfos[tableVCIndex]
        }

        return childrenViewControllers
    }
    
    
    func updateSearchResults(for searchController: UISearchController) {
        if let resultsController = searchController.searchResultsController as? ResultsTableController {
            if searchController.searchBar.text?.count ?? 0 < 3{
                return
            }
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
