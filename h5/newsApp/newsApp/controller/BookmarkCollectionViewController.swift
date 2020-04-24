//
//  BookmarkCollectionViewController.swift
//  newsApp
//
//  Created by Stephen Huang on 4/23/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit

extension UICollectionView {

    func setEmptyMessage(_ message: String) {
        let messageLabel = UILabel(frame: CGRect(x: 0, y: 0, width: self.bounds.size.width, height: self.bounds.size.height))
        messageLabel.text = message
        messageLabel.textColor = .black
        messageLabel.numberOfLines = 0;
        messageLabel.textAlignment = .center;
//        messageLabel.font = UIFont(name: "TrebuchetMS", size: 15)
        messageLabel.sizeToFit()

        self.backgroundView = messageLabel;
    }

    func restore() {
        self.backgroundView = nil
    }
}

private let reuseIdentifier = "bookmarkCell"

class BookmarkCollectionViewController: UICollectionViewController, UICollectionViewDelegateFlowLayout {
    
    var savedNewsID: [String]? = UserDefaults.standard.object(forKey: "id") as? [String]
    var newsArray: NewsCellArray = NewsCellArray()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        reloadSavedNews()
        print(savedNewsID)
    }
    
    
    func reloadSavedNews() {
        newsArray = NewsCellArray()
        print("News marked count: \(newsArray.size)")
        collectionView.reloadData()
    }

    // MARK: UICollectionViewDataSource

    override func numberOfSections(in collectionView: UICollectionView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }


    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of items
        if newsArray.getSize() == 0 {
            self.collectionView.setEmptyMessage("No bookmarks added.")
        } else {
            self.collectionView.restore()
        }
        
        return newsArray.getSize()
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: reuseIdentifier, for: indexPath)
//        cell?.textLabel.text = String(indexPath.row)
        if let cell = cell as? BookmarkCollectionViewCell {
            cell.layer.cornerRadius = 8
            cell.layer.borderColor = UIColor(red: 0.75, green: 0.75, blue: 0.75, alpha: 1.0).cgColor
            cell.layer.borderWidth = 1
            cell.delegate = self
            cell.newsData = newsArray.get(index: indexPath.row)
        }
        
    
        // Configure the cell
    
        return cell
    }

    // MARK: UICollectionViewDelegate
    override func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let selectedNews = newsArray.get(index: indexPath.row)
        
        let viewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "ArticleViewController")
        if let articleView = viewController as? ArticleViewController {
            articleView.newsCellData = selectedNews
            articleView.delegate = self
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

extension BookmarkCollectionViewController: BookmarkDelegate {
    func mark(news: NewsCell?) {
        news?.save()
        
        let tbc = self.navigationController?.tabBarController
        let bvc = tbc?.viewControllers?[0] as! UINavigationController
        let bvc_root = bvc.viewControllers[0] as! HomeTableViewController
        bvc_root.tableView.reloadData()
        
        let pageVC = tbc?.viewControllers?[1] as! UINavigationController
        let pageVC_root = pageVC.viewControllers[0] as! ParentPagerTabViewController
        pageVC_root.reloadTables()
        
        self.navigationController?.view.makeToast("Article Bookmarked. Check out the Bookmarks tab to view")
        self.reloadSavedNews()
    }

    func unMark(news: NewsCell?) {
        news?.remove()

        let tbc = self.navigationController?.tabBarController
        let bvc = tbc?.viewControllers?[0] as! UINavigationController
        let bvc_root = bvc.viewControllers[0] as! HomeTableViewController
        bvc_root.tableView.reloadData()
        
        let pageVC = tbc?.viewControllers?[1] as! UINavigationController
        let pageVC_root = pageVC.viewControllers[0] as! ParentPagerTabViewController
        pageVC_root.reloadTables()

        self.navigationController?.view.makeToast("Article removed from Bookmarks")
        self.reloadSavedNews()
    }
}
