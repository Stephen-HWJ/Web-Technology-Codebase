//
//  ArticleViewController.swift
//  newsApp
//
//  Created by Stephen Huang on 4/18/20.
//  Copyright © 2020 Stephen Huang. All rights reserved.
//

import UIKit

class ArticleViewController: UIViewController {
    @IBOutlet weak var content: UITextView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        content.text = "The Australian government is planning to launch an app in a matter of weeks that will trace every person who has been in contact with a mobile phone owner who has tested positive for coronavirus in the previous few weeks, in a bid to automate coronavirus contact tracing, and allow the easing of restrictions. Here’s what we know about the app so far. How does the app work? Scott Morrison told reporters on Thursday that the app, currently being vetted by the Australian Signals Directorate, would be similar to or based on the Singapore TraceTogether app. That app works by using Bluetooth to record anyone you get close to who also has the app. The two apps exchange anonymised IDs, which are stored encrypted on phones and deleted after 21 days. If someone is infected with coronavirus, authorities can upload the list of anonymised IDs for the past 14 days for contact tracing.\nWhat personal data is collected? The Singapore version of the app collects mobile phone numbers which are not sent to every user, just to the owner of the app and the health department for contact tracing. The app also collects information about phone models and signal strength, and anonymised app analytics data. Can it trace my location? Deputy chief medical officer Paul Kelly said the app would not track location. The Singapore version of the app does not track location, either. Will it drain my battery? It depends on what the Australian version looks like. The Singapore version has many negative reviews on the app store, with users complaining about being forced to keep the app open in order for it to function. That would not only be inconvenient for people travelling around with their phone, but would drain the battery faster. Will it be mandatory? The prime minister has said consent would be key to the app, indicating it would not be mandatory, and people would share information through the app only if they consented to it. But on Friday he muddied the waters somewhat, indicating he would not entirely rule out making it mandatory. “My preference is not to do that, my preference is to give Australians the go of getting it right ... I don’t want to be drawn on that [making it mandatory], I want to give Australians the opportunity to get it right,” he told Triple M. “That is my objective, that is my Plan A and I really want Plan A to work.” On Saturday he tweeted that the app would not be mandatory.\nThe Singapore version of the app allows people to email the government to have their mobile phone and ID deleted from the server. "
        // Do any additional setup after loading the view.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
