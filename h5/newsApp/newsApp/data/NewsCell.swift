//
//  NewsCell.swift
//  newsApp
//
//  Created by Stephen Huang on 4/18/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit

class NewsCell: Codable {
    var imageUrl: String
    var title: String
    var time: Date
    var source: String
    var tagged: Bool = false
    var id: String
    
    init(imageUrl: String, title: String, time: String, source: String, tagged: Bool, id: String) {
        self.imageUrl = imageUrl
        self.title = title
        self.source = source
        self.tagged = tagged
        
        let formatter = ISO8601DateFormatter()
        self.time = formatter.date(from: time)!
        self.id = id
        
//        print(self.title)
    }
    
//    required init(coder aDecoder: NSCoder) {
//        imageUrl = aDecoder.decodeObject(forKey: "imageUrl") as! String
//        title = aDecoder.decodeObject(forKey: "title") as! String
//        time = aDecoder.decodeObject(forKey: "time") as! Date
//        source = aDecoder.decodeObject(forKey: "source") as! String
//        tagged = aDecoder.decodeObject(forKey: "tagged") as! Bool
//        id = aDecoder.decodeObject(forKey: "tagged") as! String
//    }
//
//    func encode(with aCoder: NSCoder) {
//        aCoder.encode(imageUrl, forKey: "imageUrl")
//        aCoder.encode(title, forKey: "title")
//        aCoder.encode(time, forKey: "time")
//        aCoder.encode(source, forKey: "source")
//        aCoder.encode(tagged, forKey: "tagged")
//        aCoder.encode(id, forKey: "id")
//    }
    
    func save() {
        do {
            // Create JSON Encoder
            let encoder = JSONEncoder()

            // Encode Note
            let data = try encoder.encode(self)

            // Write/Set Data
            UserDefaults.standard.set(data, forKey: self.id)

        } catch {
            print("Unable to Encode NewsCell (\(error))")
        }
    }
    
    func remove() {
        UserDefaults.standard.removeObject(forKey: self.id)
    }
    
    func checkSaved() -> Bool{
        if UserDefaults.standard.data(forKey: self.id) != nil {
//            do {
//                // Create JSON Decoder
//                let decoder = JSONDecoder()
//
//                // Decode Note
//                let news = try decoder.decode(NewsCell.self, from: data)
////                print(news.id)
                return true
//
//            } catch {
//                print("Unable to Decode Note (\(error))")
//            }
        }
        
        return false
    }
}
