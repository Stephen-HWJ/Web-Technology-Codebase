//
//  Weather.swift
//  newsApp
//
//  Created by Stephen Huang on 4/17/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit

class Weather {
    
    // MARK: Properties
    
    var cityOfLocation: String = ""
    var stateOfLocation: String = ""
//    var temperature: Int?
//    var weatherType: String?
    
    init(cityOfLocation: String, stateOfLocation: String) {
        self.cityOfLocation = cityOfLocation
        self.stateOfLocation = stateOfLocation
    }
    
    func printInfo() {
        print(self.cityOfLocation)
        print(self.stateOfLocation)
    }
}
