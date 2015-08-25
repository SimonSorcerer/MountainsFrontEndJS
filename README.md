# Mountains
My first try of **React.js** driven web page/application.
App displays a timeline with mountains (supposedly ascended by the user) and user can add/remove mountains to/from timeline.
App uses *Azure mobile services* for storing data and authentication (using *Facebook* oAuth).

I did not write any unit tests for this, as I was expecting it to be small prototype only (unexpectedly it grew a bit bigger).
With react though it's quite easy to modularize the application into small pieces and keep the maintanability on good level. However for any bigger further improvements I'd probably introduce unit tests (would be interesting to see how it works with react).

Some pictures:

![Hovering over timeline item](/../screenshots/screenshots/mountains1.png?raw=true "Hovering over timeline item")
![Adding new mountain](/../screenshots/screenshots/mountains2.png?raw=true "Adding new mountain")
