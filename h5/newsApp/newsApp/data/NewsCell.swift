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
    var time: String
    var source: String
    var tagged: Bool = false
    
    init(imageUrl: String, title: String, time: String, source: String, tagged: Bool) {
        self.imageUrl = imageUrl
        self.title = title
        self.time = time
        self.source = source
        self.tagged = tagged
        print(self.title)
    }
    
}
