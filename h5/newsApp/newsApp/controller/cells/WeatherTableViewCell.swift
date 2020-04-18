//
//  WeatherTableViewCell.swift
//  newsApp
//
//  Created by Stephen Huang on 4/17/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit

class WeatherTableViewCell: UITableViewCell {
    @IBOutlet weak var backgroundImage: UIImageView!
    @IBOutlet weak var cityOfLocation: UILabel!
    
    
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
