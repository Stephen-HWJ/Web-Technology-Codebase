//
//  HomeTableViewController.swift
//  newsApp
//
//  Created by Stephen Huang on 4/17/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit
import CoreLocation

class HomeTableViewController: UITableViewController, CLLocationManagerDelegate {
    
    var locationManager: CLLocationManager = CLLocationManager()
    var localWeather: Weather?
    
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
        
    }

    @objc func sortArray() {
        print("refreshed")
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
    
    // MARK: - Table view delegate

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return 5
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
//        guard let cell = tableView.dequeueReusableCell(withIdentifier: "HomeCell", for: indexPath) as? WeatherTableViewCell else {
//            fatalError("The first cell is not an intance of WeatherTableViewCell.")
//        }
//        if let localWeather = localWeather {
//            cell.cityOfLocation.text = localWeather.cityOfLocation
//        }
        
        var cell: UITableViewCell
        if indexPath.row == 0 {
            cell = tableView.dequeueReusableCell(withIdentifier: "HomeCell", for: indexPath)
        } else {
            cell = tableView.dequeueReusableCell(withIdentifier: "NewsCell", for: indexPath)
            let news = NewsCell(imageUrl: "https://media.guim.co.uk/5b2b3cb838cad4b2f84035d497623223b2625798/0_88_3500_2100/master/3500.jpg", title: "Coronavirus US live: White House holds daily briefing amid stay-at-home protests", time: "3h ago", source: "world", tagged: false)
            if let cell = cell as? NewsTableViewCell {
                cell.newsData = news
            }
        }
//        cell.stateOfLocation.text = localWeather?.stateOfLocation
//        cell.weatherType.text = localWeather?.weatherType
//        if let t = localWeather?.temperature {
//            cell.temperature.text = String(t)
//        }
//        cell.temperature.text = String( localWeather?.temperature )
        

        return cell
    }

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
