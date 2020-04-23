//
//  ResultsTableController.swift
//  newsApp
//
//  Created by Stephen Huang on 4/20/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit

class ResultsTableController: UITableViewController {
    
    var searchResults: [String]?
    var navVC: UINavigationController?

    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return searchResults?.count ?? 0
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "searchResultCell", for: indexPath)

        // Configure the cell...
        cell.textLabel?.text = searchResults?[indexPath.row]
        
        return cell
    }

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let selectedKeyword = searchResults?[indexPath.row]

        let viewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "HomeTableViewController")
        if let resultView = viewController as? HomeTableViewController {
            resultView.childInfo = selectedKeyword!
            navVC!.pushViewController(resultView, animated: true)
        }
        
        
        
        tableView.deselectRow(at: indexPath, animated: false)
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
