//
//  NewsCell.swift
//  newsApp
//
//  Created by Stephen Huang on 4/18/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit

class NewsCell {
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
    
}
