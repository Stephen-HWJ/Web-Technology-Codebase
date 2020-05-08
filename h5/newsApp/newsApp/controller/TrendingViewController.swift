//
//  TrendingViewController.swift
//  newsApp
//
//  Created by Stephen Huang on 4/20/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit
import Charts
import Alamofire
import SwiftyJSON

class TrendingViewController: UIViewController, UITextFieldDelegate {
    @IBOutlet weak var textBox: UITextField!
    @IBOutlet weak var chtChart: LineChartView!
    
    var keyword: String = "Coronavirus"{
        didSet{
            self.updateData()
        }
    }
    
    var numbers: [Double] = []{
        didSet{
            self.updateGraph()
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        textBox.delegate = self
        updateData()
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */
    
    // MARK: - Text field delegate
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textBox.resignFirstResponder()
        keyword = textBox.text!
        return true
    }
    
    // MARK: Private methods for date and chart updated
    
    private func updateData(){
        let trendsApi = "https://weijihua-hw9-api.wl.r.appspot.com/trends/\(self.keyword)"
        let url = trendsApi.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
        Alamofire.request(url!, method: .get).validate().responseJSON(completionHandler: {response in
            switch response.result {
            case .success(let value):
                let json = JSON(value)
                self.numbers = json["response"].arrayValue.map {$0.doubleValue}
            case .failure(let error):
                print(error)
            }
        })
    }
    
    private func updateGraph(){
        var lineChartEntry  = [ChartDataEntry]() //this is the Array that will eventually be displayed on the graph.
        
        //here is the for loop
        for i in 0..<numbers.count {

            let value = ChartDataEntry(x: Double(i), y: numbers[i]) // here we set the X and Y status in a data chart entry
            lineChartEntry.append(value) // here we add it to the data set
        }

        let line1 = LineChartDataSet(entries: lineChartEntry, label: "Trending Chart for \(self.keyword)") //Here we convert lineChartEntry to a LineChartDataSet
        line1.colors = [UIColor.systemBlue] //Sets the colour to blue
        line1.circleColors = [UIColor.systemBlue]
        line1.circleHoleRadius = 0
        line1.circleRadius = 5.0

        let data = LineChartData() //This is the object that will be added to the chart
        data.addDataSet(line1) //Adds the line to the dataSet
        

        chtChart.data = data //finally - it adds the chart data to the chart and causes an update
//        chtChart.chartDescription?.text = "My awesome chart" // Here we set the description for the graph
    }

}
