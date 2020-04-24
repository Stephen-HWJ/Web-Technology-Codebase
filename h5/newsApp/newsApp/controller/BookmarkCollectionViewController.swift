//
//  BookmarkCollectionViewController.swift
//  newsApp
//
//  Created by Stephen Huang on 4/23/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit

private let reuseIdentifier = "bookmarkCell"

class BookmarkCollectionViewController: UICollectionViewController, UICollectionViewDelegateFlowLayout {
    
    var savedNewsID: [String]? = UserDefaults.standard.object(forKey: "id") as? [String]
    var newsArray: NewsCellArray = NewsCellArray()

    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Register cell classes
//        self.collectionView!.register(UICollectionViewCell.self, forCellWithReuseIdentifier: reuseIdentifier)

        // Do any additional setup after loading the view.
        reloadSavedNews()
        print(savedNewsID!)
    }
    
    func reloadSavedNews() {
        newsArray = NewsCellArray()
        collectionView.reloadData()
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using [segue destinationViewController].
        // Pass the selected object to the new view controller.
    }
    */

    // MARK: UICollectionViewDataSource

    override func numberOfSections(in collectionView: UICollectionView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }


    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of items
        return newsArray.getSize()
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: reuseIdentifier, for: indexPath)
//        cell?.textLabel.text = String(indexPath.row)
        if let cell = cell as? BookmarkCollectionViewCell {
            cell.layer.cornerRadius = 8
            cell.layer.borderColor = UIColor(red: 0.75, green: 0.75, blue: 0.75, alpha: 1.0).cgColor
            cell.layer.borderWidth = 1
            
            cell.newsData = newsArray.get(index: indexPath.row)
        }
        
    
        // Configure the cell
    
        return cell
    }

    // MARK: UICollectionViewDelegate

    /*
    // Uncomment this method to specify if the specified item should be highlighted during tracking
    override func collectionView(_ collectionView: UICollectionView, shouldHighlightItemAt indexPath: IndexPath) -> Bool {
        return true
    }
    */

    /*
    // Uncomment this method to specify if the specified item should be selected
    override func collectionView(_ collectionView: UICollectionView, shouldSelectItemAt indexPath: IndexPath) -> Bool {
        return true
    }
    */
    
    override func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let selectedNews = newsArray.get(index: indexPath.row)
        
        let viewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "ArticleViewController")
        if let articleView = viewController as? ArticleViewController {
            articleView.newsCellData = selectedNews
            self.navigationController?.pushViewController(articleView, animated: true)
        }
        
        collectionView.deselectItem(at: indexPath, animated: false)
//        tableView.deselectRow(at: indexPath, animated: false)
    }
    
      func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {

        if collectionView.numberOfItems(inSection: section) == 1 {
            let flowLayout = collectionViewLayout as! UICollectionViewFlowLayout
//            print(UIEdgeInsets(top: 0, left: 8, bottom: 0, right: collectionView.frame.width - flowLayout.itemSize.width - 8))
            return UIEdgeInsets(top: 0, left: 8, bottom: 0, right: collectionView.frame.width - flowLayout.itemSize.width - 8)
        }

        return UIEdgeInsets(top: 0, left: 8, bottom: 0, right: 8)

    }
}
