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

class HomeTableViewController: UITableViewController, CLLocationManagerDelegate, IndicatorInfoProvider {
    
    var locationManager: CLLocationManager = CLLocationManager()
    var localWeather: Weather?
    var newsArrayData: NewsCellArray? {
        didSet {
            self.tableView.reloadData()
        }
    }
    
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
        }
    }
    
    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return IndicatorInfo(title: "Child 1")
    }

}
