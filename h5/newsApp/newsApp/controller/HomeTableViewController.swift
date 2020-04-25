//
//  HomeTableViewController.swift
//  newsApp
//
//  Created by Stephen Huang on 4/17/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit
import CoreLocation
import XLPagerTabStrip
import Alamofire
import SwiftyJSON
import Toast_Swift

class HomeTableViewController: UITableViewController, CLLocationManagerDelegate, IndicatorInfoProvider, UISearchResultsUpdating {
    
    var locationManager: CLLocationManager = CLLocationManager()
    var localWeather: Weather? {
       didSet{
           tableView.reloadData()
       }
   }
    
    var newsArrayData: NewsCellArray? {
        didSet{
            tableView.reloadData()
        }
    }
    
    var childInfo = "home"
    
    init(style: UITableView.Style, childInfo: String) {
        self.childInfo = childInfo
        super.init(style: style)
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
//        fatalError("init(coder:) has not been implemented")
    }
    
    /// Search controller to help us with filtering items in the table view.
    var searchController: UISearchController!
    
    /// Search results table view.
    private var resultsTableController: ResultsTableController!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
        
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingLocation()
        
        let refreshControl = UIRefreshControl()
        refreshControl.addTarget(self, action:  #selector(sortArray), for: .valueChanged)
        self.refreshControl = refreshControl
        newsArrayData = NewsCellArray(tab: self.childInfo, tableViewController: self)
                
        if ["world", "business", "politics", "sport", "technology", "science", "home"].contains(self.childInfo.lowercased()) {
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
        } else {
            self.navigationItem.title = "Search Results"
        }
    }
    

    // MARK: - Pull down to refresh function
    
    @objc func sortArray() {
        newsArrayData = NewsCellArray(tab: self.childInfo, tableViewController: self, animated: false)
        refreshControl?.endRefreshing()
    }
    
    // MARK: - Location manager delegate
    
    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        switch status {
        case .restricted,.denied,.notDetermined:
            // report error, do something
            print("error")
        default:
            // location si allowed, start monitoring
            manager.startUpdatingLocation()
        }
    }
    
    func processGeocoderResponse(withPlacemarks placemarks: [CLPlacemark]?, error: Error?){
        if let error = error {
            print("Unable to Reverse Geocode Location (\(error))")
        } else {
            if let placemarks = placemarks, let placemark = placemarks.first {
                localWeather = Weather(cityOfLocation: placemark.locality!, stateOfLocation: placemark.administrativeArea!)
            } else {
                print("No Matching Addresses Found")
            }
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let location = locations.last {
            let geoCoder = CLGeocoder()
            
            geoCoder.reverseGeocodeLocation(location, completionHandler: {(placemarks, error) in
                self.processGeocoderResponse(withPlacemarks: placemarks, error: error)
            })
        }
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        if self.childInfo.lowercased() == "home" {
            return (newsArrayData?.getSize() ?? 0) + 1
        }
        return newsArrayData?.getSize() ?? 0
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var rowIndex = indexPath.row
        
        if self.childInfo.lowercased() == "home" && rowIndex == 0 {
            if let cell = tableView.dequeueReusableCell(withIdentifier: "HomeCell", for: indexPath) as? WeatherTableViewCell {
                cell.weatherData = self.localWeather
                localWeather?.delegate = cell.self
                return cell
            }
        }
        if self.childInfo.lowercased() == "home" {
            rowIndex -= 1
        }
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "NewsCell", for: indexPath)
        let news = newsArrayData?.get(index: rowIndex)
        if let cell = cell as? NewsTableViewCell {
            cell.newsData = news
            cell.parentTableView = self
            cell.delegate = self
        }

        return cell
    }
    
    // MARK: - Search update
    
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

    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
        super.prepare(for: segue, sender: sender)
        
        guard let newsCell = sender as? NewsTableViewCell else {
            fatalError("User tapped not on NewsTableViewCell")
        }

        if let articleViewController = segue.destination as? ArticleViewController {
            articleViewController.newsCellData = newsCell.newsData
            articleViewController.delegate = self
        }
    }
    
    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return IndicatorInfo(title: self.childInfo)
    }

}


// MARK: - UISearchBarDelegate

extension HomeTableViewController: UISearchBarDelegate {
    
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        searchBar.resignFirstResponder()
    }
    
    func searchBar(_ searchBar: UISearchBar, selectedScopeButtonIndexDidChange selectedScope: Int) {
//        updateSearchResults(for: searchController)
    }
    
}

// MARK: - UISearchControllerDelegate

// Use these delegate functions for additional control over the search controller.

extension HomeTableViewController: UISearchControllerDelegate {
    
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

// MARK: - Implement bookmark delegate

extension HomeTableViewController: BookmarkDelegate {
    func mark(news: NewsCell?, reload: Bool) {
        news?.save()
        
        if reload {
            tableView.reloadData()
            
            let tbc = self.navigationController?.tabBarController
            let pageVC = tbc?.viewControllers?[1] as! UINavigationController
            let pageVC_root = pageVC.viewControllers[0] as! ParentPagerTabViewController
            pageVC_root.reloadTables()
        }

        
        let tbc = self.navigationController?.tabBarController
        let bvc = tbc?.viewControllers?[3] as! UINavigationController
        let bvc_root = bvc.viewControllers[0] as! BookmarkCollectionViewController
        bvc_root.reloadSavedNews()
                
        self.navigationController?.view.makeToast("Article Bookmarked. Check out the Bookmarks tab to view")
    }
    
    func unMark(news: NewsCell?, reload: Bool) {
        news?.remove()
        
        if reload {
            let tbc = self.navigationController?.tabBarController
            let pageVC = tbc?.viewControllers?[1] as! UINavigationController
            let pageVC_root = pageVC.viewControllers[0] as! ParentPagerTabViewController
            pageVC_root.reloadTables()
            
            tableView.reloadData()
            

        }

        let tbc = self.navigationController?.tabBarController
        let bvc = tbc?.viewControllers?[3] as! UINavigationController
        let bvc_root = bvc.viewControllers[0] as! BookmarkCollectionViewController
        bvc_root.reloadSavedNews()
        
        self.navigationController?.view.makeToast("Article removed from Bookmarks")
    }
}
