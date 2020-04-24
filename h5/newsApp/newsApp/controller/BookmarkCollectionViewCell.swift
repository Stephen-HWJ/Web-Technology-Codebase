//
//  BookmarkCollectionViewCell.swift
//  newsApp
//
//  Created by Stephen Huang on 4/23/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit

class BookmarkCollectionViewCell: UICollectionViewCell {
    @IBOutlet weak var newsImage: UIImageView!
    @IBOutlet weak var newsTitle: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var sectionLabel: UILabel!
    @IBOutlet weak var tagButton: UIButton!
    
    var delegate: BookmarkDelegate?
    
    var newsData: NewsCell? {
        didSet {
            self.newsTitle.text = self.newsData?.title
//            self.dateLabel.text = self.newsData?.time
            self.sectionLabel.text = "| \(self.newsData?.source ?? "")" 
            self.newsImage.downloadImage(from: URL(string: self.newsData!.imageUrl)!)
            
            let formatter = DateFormatter()
            formatter.dateFormat = "dd MMM yy"
            if let newsDate = self.newsData?.time {
                 self.dateLabel.text = formatter.string(from: newsDate)
            } 
        }
    }
    
    @IBAction func bookmarkButtonTapped(_ sender: UIButton) {
        delegate?.unMark(news: self.newsData)
    }
    

}
