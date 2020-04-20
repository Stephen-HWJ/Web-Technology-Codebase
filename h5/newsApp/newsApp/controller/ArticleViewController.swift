//
//  ArticleViewController.swift
//  newsApp
//
//  Created by Stephen Huang on 4/18/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit
import SwiftSpinner
import SwiftyJSON
import Alamofire

class ArticleViewController: UIViewController {
    
    @IBOutlet weak var titleImage: UIImageView!
    @IBOutlet weak var content: UITextView!
    @IBOutlet weak var contentTitle: UILabel!
    @IBOutlet weak var section: UILabel!
    @IBOutlet weak var dateString: UILabel!
    
    var htmlTextString: String = ""
    
    var id: String? {
        didSet{
            getContent()
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    private func getContent() {
        SwiftSpinner.show("Loading Detailed article..")
        let weatherParams = "https://weijihua-hw9-api.wl.r.appspot.com/article/\(id!)"
        let url = weatherParams.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
        Alamofire.request(url!, method: .get).validate().responseJSON(completionHandler: {response in
            switch response.result {
            case .success(let value):
                let subJson = JSON(value)["response"]
                self.title = subJson["title"].string ?? ""
                self.contentTitle.text = subJson["title"].string ?? ""
                self.section.text = subJson["section"].string ?? ""
                
                // Date string
                let formatter = ISO8601DateFormatter()
                print(subJson["date"].string!)
                let newsDate = formatter.date(from: subJson["date"].string!)
                let newFormatter = DateFormatter()
                newFormatter.dateFormat = "dd MMMM yyyy"
                self.dateString.text = newFormatter.string(from: newsDate!)
                
                // Image
//                self.articleURL = subJson["articleURL"].string ?? ""
                if subJson["image"].string == "" || subJson["image"].string == nil {
                    self.titleImage.image = UIImage(named: "default-guardian")
                } else {
                    self.titleImage.downloadImage(from: URL(string: subJson["image"].string!)!)
                }
                
                // HTML String
                self.htmlTextString = subJson["description"].string ?? ""
                let htmlData = NSString(string: self.htmlTextString).data(using: String.Encoding.unicode.rawValue)
                let options = [NSAttributedString.DocumentReadingOptionKey.documentType: NSAttributedString.DocumentType.html]
                let attributedString = try! NSAttributedString(data: htmlData!, options: options, documentAttributes: nil)
                self.content.attributedText = attributedString
                
                SwiftSpinner.hide()
            case .failure(let error):
                print(error)
            }
        })
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
