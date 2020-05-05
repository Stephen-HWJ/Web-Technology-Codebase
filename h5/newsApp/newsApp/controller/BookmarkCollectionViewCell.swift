//
//  BookmarkCollectionViewCell.swift
//  newsApp
//
//  Created by Stephen Huang on 4/23/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit

class BookmarkCollectionViewCell: UICollectionViewCell, UIContextMenuInteractionDelegate {
    @IBOutlet weak var newsImage: UIImageView!
    @IBOutlet weak var newsTitle: UILabel!
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var sectionLabel: UILabel!
    @IBOutlet weak var tagButton: UIButton!
    
    var delegate: BookmarkDelegate?
    
    override func awakeFromNib() {
        super.awakeFromNib()
        let interaction = UIContextMenuInteraction(delegate: self)
        self.addInteraction(interaction)
        
    }
    
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
        delegate?.unMark(news: self.newsData, reload: false)
    }
    
    // MARK: - Delegate protocol implementation
    
    func contextMenuInteraction(_ interaction: UIContextMenuInteraction, configurationForMenuAtLocation location: CGPoint) -> UIContextMenuConfiguration? {
        return UIContextMenuConfiguration(identifier: nil, previewProvider: nil, actionProvider: { suggestedActions in
            return self.makeContextMenu()
        })
    }
    
    func makeContextMenu() -> UIMenu {

        // Create a UIAction for sharing
        let share = UIAction(title: "Share with Twitter", image: UIImage(named: "twitter")) { action in
            // TODO: share with Twitter
            let tweetText = "Check out this Article! \(self.newsData?.articleUrl ?? "") #CSCI_571_NewsApp"
            let shareString = "https://twitter.com/intent/tweet?text=\(tweetText)"
            
            // encode a space to %20 for example
            let escapedShareString = shareString.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed)!

            // cast to an url
            let url = URL(string: escapedShareString)
            
            // open in safari
            UIApplication.shared.open(url!)
        }
        
        let bookmark = UIAction(title: "Unbookmark", image: UIImage(systemName: "bookmark.fill")) { action in
            // TODO: bookmark this cell if cell is unBookmarked
            self.delegate?.unMark(news: self.newsData, reload: false)
//            self.updateFlagged()
        }
        
//        if self.newsData?.checkSaved() ?? false {
//            bookmark = UIAction(title: "Unbookmark", image: UIImage(systemName: "bookmark.fill")) { action in
//                // TODO: bookmark this cell if cell is unBookmarked
//                self.delegate?.unMark(news: self.newsData, reload: false)
////                self.updateFlagged()
//            }
//        }

        // Create and return a UIMenu with the share action
        return UIMenu(title: "Menu", children: [share, bookmark])
    }
}
