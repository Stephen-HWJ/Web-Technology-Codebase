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

class HomeTableViewController: UITableViewController, CLLocationManagerDelegate, IndicatorInfoProvider, UISearchResultsUpdating {
    
    var locationManager: CLLocationManager = CLLocationManager()
    var localWeather: Weather?
    var newsArrayData: NewsCellArray? {
        didSet {
            self.tableView.reloadData()
        }
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
        newsArrayData = NewsCellArray(tab: "home", tableViewController: self)
        
        resultsTableController =
            self.storyboard?.instantiateViewController(withIdentifier: "ResultsTableController") as? ResultsTableController
        // This view controller is interested in table view row selections.
        resultsTableController.tableView.delegate = self
        
        searchController = UISearchController(searchResultsController: resultsTableController)
        searchController.delegate = self
        searchController.searchResultsUpdater = self
        searchController.searchBar.autocapitalizationType = .none
//        searchController.dimsBackgroundDuringPresentation = false
        searchController.searchBar.delegate = self // Monitor when the search button is tapped.
        
        // Place the search bar in the navigation bar.
        navigationItem.searchController = searchController
        
        // Make the search bar always visible.
        //navigationItem.hidesSearchBarWhenScrolling = false
        
        /** Search presents a view controller by applying normal view controller presentation semantics.
            This means that the presentation moves up the view controller hierarchy until it finds the root
            view controller or one that defines a presentation context.
        */
        
        /** Specify that this view controller determines how the search controller is presented.
            The search controller should be presented modally and match the physical size of this view controller.
        */
        definesPresentationContext = true
    }
    

    // MARK: - Pull down to refresh function
    
    @objc func sortArray() {
        print("refreshed")
        newsArrayData = NewsCellArray(tab: "home", tableViewController: self)
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
        return max(1, (newsArrayData?.getSize())!)
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell: UITableViewCell
        if indexPath.row == 0 {
            cell = tableView.dequeueReusableCell(withIdentifier: "HomeCell", for: indexPath)
        } else {
            cell = tableView.dequeueReusableCell(withIdentifier: "NewsCell", for: indexPath)
            let news = newsArrayData?.get(index: indexPath.row)
            if let cell = cell as? NewsTableViewCell {
                cell.newsData = news
                cell.parentTableView = self
            }
        }

        return cell
    }
    
    // MARK: - Search update
    
    func updateSearchResults(for searchController: UISearchController) {
        // TODO: ,,,
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
        
        let id = newsCell.newsData?.id
        print(segue.identifier!)
        if let articleViewController = segue.destination as? ArticleViewController {
            print("in segue")
            articleViewController.id = id
//            articleViewController.articleURL = newsCell.newsData
        }
    }
    
    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return IndicatorInfo(title: "Child 1")
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
