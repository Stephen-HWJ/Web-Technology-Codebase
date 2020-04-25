//
//  WeatherTableViewCell.swift
//  newsApp
//
//  Created by Stephen Huang on 4/18/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit
protocol WeatherDelegate {
    func loaded()
}

// LA: 34.022016, -118.285264
// SH: 31.265352, 121.534872

class WeatherTableViewCell: UITableViewCell {
    @IBOutlet weak var backgroundImage: UIImageView!
    @IBOutlet weak var cityLabel: UILabel!
    @IBOutlet weak var temperature: UILabel!
    @IBOutlet weak var weatherType: UILabel!
    @IBOutlet weak var stateLabel: UILabel!
    
    var weatherData: Weather?
    
    func updateWeather() {
        self.cityLabel.text = self.weatherData?.cityOfLocation
        self.temperature.text = "\(self.weatherData?.temperature ?? 15)°C"
        self.weatherType.text = self.weatherData?.weatherType
        self.stateLabel.text = self.weatherData?.stateOfLocation
        switch self.weatherData?.weatherType.lowercased() {
        case "clouds":
            self.backgroundImage.image = UIImage(named: "cloudy_weather")
        case "clear":
            self.backgroundImage.image = UIImage(named: "clear_weather")
        case "snow":
            self.backgroundImage.image = UIImage(named: "snowy_weather")
        case "rain":
            self.backgroundImage.image = UIImage(named: "rainy_weather")
        case "thunderstorm":
            self.backgroundImage.image = UIImage(named: "thunder_weather")
        default:
            self.backgroundImage.image = UIImage(named: "sunny_weather")
        }
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        backgroundImage.layer.cornerRadius = 8
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}

extension WeatherTableViewCell: WeatherDelegate {
    func loaded() {
        updateWeather()
    }
}
