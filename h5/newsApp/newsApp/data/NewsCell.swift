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
    }
    
    func save() {
        do {
            // Create JSON Encoder
            let encoder = JSONEncoder()

            // Encode Note
            let data = try encoder.encode(self)

            // Write/Set Data
            UserDefaults.standard.set(data, forKey: self.id)
            
            if let idArray = UserDefaults.standard.object(forKey: "id") as? [String] {
                UserDefaults.standard.set(idArray + [self.id], forKey: "id")
            } else {
                UserDefaults.standard.set([self.id], forKey: "id")
            }
//            print(UserDefaults.standard.object(forKey: "id")!)

        } catch {
            print("Unable to Encode NewsCell (\(error))")
        }
    }
    
    func remove() {
        UserDefaults.standard.removeObject(forKey: self.id)
        if let idArray = UserDefaults.standard.object(forKey: "id") as? [String] {
            UserDefaults.standard.set(idArray.filter(){$0 != self.id}, forKey: "id")
        }
//        print(UserDefaults.standard.object(forKey: "id")!)
    }
    
    func checkSaved() -> Bool{
        return UserDefaults.standard.data(forKey: self.id) != nil 
    }
}
