//
//  Article.swift
//  newsApp
//
//  Created by Stephen Huang on 4/19/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit
import SwiftSpinner
import SwiftyJSON
import Alamofire

class Article {
    var imageURL: String = ""
    var title: String = ""
    var date: String = ""
    var section: String = ""
    var description: String = ""
    var articleURL: String = ""
    
    init(id: String) {
        SwiftSpinner.show("Loading Detailed article..")
        let weatherParams = "https://weijihua-hw9-api.wl.r.appspot.com/article/\(id)"
        let url = weatherParams.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
        Alamofire.request(url!, method: .get).validate().responseJSON(completionHandler: {response in
            switch response.result {
            case .success(let value):
                let subJson = JSON(value)["response"]
                self.title = subJson["title"].string ?? ""
                self.section = subJson["section"].string ?? ""
                self.description = subJson["description"].string ?? ""
                self.articleURL = subJson["articleURL"].string ?? ""
                self.imageURL = subJson["image"].string ?? ""
                
                let formatter = ISO8601DateFormatter()
                print(subJson["date"].string!)
                let newsDate = formatter.date(from: subJson["date"].string!)
                let newFormatter = DateFormatter()
                newFormatter.dateFormat = "dd MMMM yyyy"
                self.date = newFormatter.string(from: newsDate!)
                
                print(self.title)
                SwiftSpinner.hide()
            case .failure(let error):
                print(error)
            }
        })
    }
    
    
    
}
