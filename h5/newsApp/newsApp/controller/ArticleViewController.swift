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
        let htmlString = "<p>Over on the commercial network breakfast shows, the treasurer <strong>Josh Frydenberg</strong> is also talking apps, saying the Covid-19 tracing app would “trace the so-called digital handshake”.</p> <p>“Of course we have looked very closely at the privacy issues, the security aspects of it,” Frydenberg told Seven’s Sunrise.</p><p><strong>Stuart Robert</strong>, still doing the rounds, was just on RN Breakfast repeating a lot of the same lines about Australians downloading the Covid-19 tracing app because we “want to get back to the footy and want to get back to the beach”.</p> <p>Fran Kelly pushed Robert on whether the app would be effective if it failed to meet that 40% take-up threshold the government has been talking about. Robert said effectiveness “is a scale”. </p> <p>“Any digital take-up to assist current manual tracing effort is of great value,” he said.</p><p>Roughly <strong>100,000 students are expected to attend schools across Queensland</strong> on Monday amid closures due to the coronavirus pandemic. </p> <p>Authorities estimate about 10 to 15% of students enrolled across the state will attend school for the first day of term two. </p> <p>That figure would be spread across the whole state as schools open only for the children of essential workers and vulnerable children as part of the response to the coronavirus outbreak, <strong>e</strong><strong>ducation minister Grace Grace</strong> says.</p> <p>“We’re expecting somewhere around 10 maybe 15%,” Grace told media on Sunday. </p> <p>“We really don’t know but whatever happens we’ll be able to accommodate.”</p> <p>All other students will be required to learn remotely, based on medical advice. <br>But parents who have children at home with them are not required to take any classes, Grace said. </p> <p>That’s a job for teachers and teacher aides employed across the state who will help children learn via digital devices and hard copies of the curriculum.</p> <p>“This is remote learning,” Grace said. “No parent is required to be a teacher.”</p><p>The government services minister, <strong>Stuart Robert</strong>, has been on the ABC this morning defending<a href=\"https://www.theguardian.com/world/2020/apr/17/australias-coronavirus-contact-tracing-app-what-we-know-so-far\"> the government’s proposed Covid-19 tracing app.</a> The app hasn’t been released yet, but is already facing pushback. Within the government, former Nationals leader <strong>Barnaby Joyce</strong> is among a few who have publicly said they won’t download it because of privacy concerns.</p>"
        
        let htmlData = NSString(string: htmlString).data(using: String.Encoding.unicode.rawValue)

        let options = [NSAttributedString.DocumentReadingOptionKey.documentType: NSAttributedString.DocumentType.html]

        let attributedString = try! NSAttributedString(data: htmlData!, options: options, documentAttributes: nil)

        content.attributedText = attributedString
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
