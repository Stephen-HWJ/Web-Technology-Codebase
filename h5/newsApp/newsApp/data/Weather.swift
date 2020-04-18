//
//  Weather.swift
//  newsApp
//
//  Created by Stephen Huang on 4/17/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON

struct WeatherAPI: Encodable {
    let q: String
    let units: String
    let appid: String
}

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
    
    func getWeather() {
        let weatherParams = "https://api.openweathermap.org/data/2.5/weather?q=\(cityOfLocation)&units=metric&appid=48d6ef9b8fe8d0a508261053d62dd362"
        let url = weatherParams.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
        Alamofire.request(url!, method: .get).validate().responseJSON(completionHandler: {response in
            switch response.result {
            case .success(let value):
                let json = JSON(value)
                print(json)
            case .failure(let error):
                print(error)
            }
        })
    }
}
