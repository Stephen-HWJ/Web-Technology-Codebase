//
//  NewsTableViewCell.swift
//  newsApp
//
//  Created by Stephen Huang on 4/18/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit

extension UIImageView {
   func getData(from url: URL, completion: @escaping (Data?, URLResponse?, Error?) -> ()) {
      URLSession.shared.dataTask(with: url, completionHandler: completion).resume()
   }
   func downloadImage(from url: URL) {
      getData(from: url) {
         data, response, error in
         guard let data = data, error == nil else {
            return
         }
         DispatchQueue.main.async() {
            self.image = UIImage(data: data)
         }
      }
   }
}

class NewsTableViewCell: UITableViewCell, UIContextMenuInteractionDelegate {
//    @IBOutlet weak var background: UIImageView!
    @IBOutlet weak var background: UIView!
    @IBOutlet weak var newImage: UIImageView!
    @IBOutlet weak var newsTitle: UILabel!
    @IBOutlet weak var newsDate: UILabel!
    @IBOutlet weak var newsSrc: UILabel!
    @IBOutlet weak var tagged: UIImageView!
    
    var newsData: NewsCell? {
        didSet{
            getNewsInfo()
        }
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        background.layer.cornerRadius = 8
        background.layer.borderColor = UIColor(red: 0.75, green: 0.75, blue: 0.75, alpha: 1.0).cgColor
        background.layer.borderWidth = 1
        
        newImage.layer.cornerRadius = 8
        
        let interaction = UIContextMenuInteraction(delegate: self)
        self.addInteraction(interaction)
    }
    
    func getNewsInfo() {
        if let news = newsData {
            newImage.downloadImage(from: URL(string: news.imageUrl)!)
            newsTitle.text = news.title
            newsDate.text = news.time
            newsSrc.text = news.source
//            tagged = false
        }
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

    // MARK: - Delegate protocol implementation
    
    func contextMenuInteraction(_ interaction: UIContextMenuInteraction, configurationForMenuAtLocation location: CGPoint) -> UIContextMenuConfiguration? {
        return UIContextMenuConfiguration(identifier: nil, previewProvider: nil, actionProvider: { suggestedActions in

            return self.makeContextMenu()
        })
    }
    
    func makeContextMenu() -> UIMenu {

        // Create a UIAction for sharing
        let share = UIAction(title: "Share Pupper", image: UIImage(systemName: "square.and.arrow.up")) { action in
            // Show system share sheet
        }

        // Create and return a UIMenu with the share action
        return UIMenu(title: "Menu", children: [share])
    }
}
