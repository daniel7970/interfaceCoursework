
## HTML

Screenshot:
	![[Pasted image 20250515025819.png]]
Changes made (All made in style/stylesheet.css)
	Changed header (line 10) and footer (line 41) background colour to darker colour
	Changed colour of heading in header to white (line 51)
	Changed colour of links in navigation to beige to differentiate from other text and contrast background (line 85)
	Set footer text to white (line 45)
	Set text with id "message" padding to 10px (line 62)
	Set padding for text with id "results" and "owner-results" to 10px (line 71)
	Set label margin to 10px (line 76)
	Set margin of list elements in navigation to 10px (line 81)
	Set input margin to 10px (line 89)
	Set button margin to 10px (line 93)

## CSS

Screenshot:
	![[Pasted image 20250515032145.png]]
Changes made (all made in style/stylesheet.css)
	added @media rule that, when site has screen width under 500px (line 107)
		main section spans both grid columns (line 108)
		aside section sits in 3rd grid row (line 109)
		footer spans only 2nd grid column (line 110)
	added @media rule that, when site has screen size has screen width 500px and above (line 113)
		navigation bar is displayed as a flexbox (line 114)
		list items inside navigation bar has a flex of 1 (line 115)

## JavaScript Playwright tests

I did not create any new playwright tests