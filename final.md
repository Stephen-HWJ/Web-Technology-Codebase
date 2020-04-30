# Final revision with sample questions

## Cookies & Privacy
- set and read cookies
- types of cookies
	- Session & Persistent
	- Server-side & client-side
	- simple and array
	- thirty-party
	- secure
	- conversion tracking cookie 
- 4 key players: 
	- advertisers
	- website owners
	- ad network
	- visitors
- opt out
	- do not track
	- opt-out cookies
	- cookie management tools
	- delete by you
	- check preference on sites
	- browser add-ons
- fields:
	- domain
	- path
	- name/value pair
	- expriration date
	- secure
	- httpOnly

## Web Security
- Common ways for websites infected
	- XSS
	- SQL Injection
	- SE Redirection
	- backend virtual hosting
	- social networks
	- web-server / forum-hosting
- JSON array is vulnerable to JavaScript Hijacking
- Bypassing the same-origin policy
	- CORS
	- IFRAME?
	- AJAX Proxy
	- JSONP
	- JSON and the dynamic SCRIPT tag
	- Browser extension
- VPN + TOR -> Anonymizing
- Authentication Attacks
	- Brute Force: account lockout policy
	- Insufficient Authentication
	- Weak recovery validation
		- Information Verification
		- passwd hints
		- secret q. & a.
- Client Side
	- XSS: Nonpersistent, persistent
		- contextual output encoding/escaping.
		- HttpOnlyFlag & IP address tie 
	- Plugin Vulnerabilities
	- Clickjacking
- Injection attack
	- SQL/LDAP/XPATH/SOAP/JSON Injection
	- search worm
	- Bypassing the Same-Origin policy

## Hign-Performance
1. Make fewer HTTP requests
2. Use a CDN
3. Add an Expires header
4. Gzip components
5. Put stylesheets at the top
6. Move scripts to the bottom
7. Avoid CSS expressions
8. Make JS and CSS external
9. Reduce DNS lookups
10. Minify JS
11. Avoid redirects
12. Remove duplicate scripts
13. Configure Etags
14. Make AJAX cacheable
15. Avoid empty src or href
16. Use GET for AJAX requests
17. Reduce the number of DOM elements
18. Avoid HTTP 404 (Not Found) error
19. Reduce cookie size
20. Use cookie-free domains
21. Do not scale images in HTML
22. Make favicon small and cacheable
- CA roles
	- verify organization
	- verify identity
	- issue digital certificates
	- sign certificates

## HTML5
- News elements
	- header, footer, article, section, nav, aside, video, audio
	- canvas, svg
	- geolocation
	- localStorage, sessionStorage
	- offline web app
	- improvement to forms
	- microdata
	- css3
- Removed elements
	- basefont, big, center, font, s, strike, tt, u
	- frame , frameset, noframes
	- applet, acronym, isindex, dir...
- Video container files
	- mp4 / m4v
	- mov, flv, ogv, VP8/VP9 WebM, avi
- Audio: MP3, AAC, Vorbis, FLAC

## jQuery
- Basic Selectors: all selector, class~, elem~, ID~, multiple~
- selector categories: attr, basic, basic filter, child filter, content filter, form
- Simplifies:
	- HTML Traversing
	- Event handling
	- Animating
	- AJAX interactiion (XMLHTTPRequest})
	- No HTTP header!

## Firebase
- cross platform set of tools
- authentication
- serverless: AWS Lambda, GCP Functions, Azure Functions, IBM OpenWhisk

## Serverless
- VM properties: Expensive & predict instance size
- Serverless Properties: 
	- No compute resource to manage
	- provision & scaling by service
	- write code, envrin by service
	- core functionality is provided
- Container properties
	- Virtualization at OS level
	- based on Linux kernel features(cgroups, namespace)
	- concept has been a while
	- Dock brought to mainstream
	- lighteright & Portable(key)
	- Package app of all dependencies
	- efficient sharing of resources
- Docker issue
	- security
	- less flexibility
	- management in production is challenge
- IoT/Stream analytics: Stream FaaS, Data Store, AI
- Microservices: API, FAAS, Data Store

## RWD
- Not using .mob
	- hinder/annoy search engines
	- Redirects take lots of time
	- what about for iPad...
	- for people on laptops
	- Philosophical
- adapt viewing environ: fluid grids, flex img, css3 media queries
- usability guidelines:
	- reduce amount of content
	- single columns
	- change nav
	- minimize text entry
	- touchscreens
	- take adv of built-in apps
- fluid: relative, adaptive: pixel
- fluid properties:
	- relative-based dimensions
	- gride divided into columns
	- each grid is proportional to w/h not pixels
- Bootstrap 3 components: JS, CSS, Fonts

## AJAX
- Common characteristics of AJAX
	- smooth, continuous interaction
	- provide live content
	- visual effects
	- animations and dynamic icons
	- custom selectors and buttons
	- drag-and-drop
	- double-click implement

## REST
- Design Pattern: client, servers, resources
- HTTP Methods: PUT, GET, POST, DELETE
- simplicity over others
- represented as documents


## Web Performance
- Selecting: Capacity, Cost, Maintenance, Security, Development support
- Estimate: #of clients, #of bytes to server, # bytes to clients
- Why forward Proxy server
	- prevent access to restricted sites
	- control access ...
	- enhance security
	- cache -> performance
	- modify content
	- anonymizer
- Apache improvement
	- More RAM
	- Load only required
	- Use Nginx as reverse-proxy
	- Use fast modules
	- Use direct modules
	- Tune minspareservers and max...


## JSFrameworks
- AngularJS:
	- a module defines an app
	- module is a container for controllers
	- controllers belong to a module
	- ng-repeat works like a for loop
	- $http hold HTTP Request handler