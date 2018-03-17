# imReveal
A bit of js to show the "before and after" of two images

![imReveal demo](https://i.iamfabulous.de/i/eq1ln68)


## Usage
Simply include the imReveal js and css files into your page. Your two image should be wrapped by a container. Then simply create a new imReveal object by passing it the wrapper HTMLElement.
```html
<script src="imReveal.min.js"></script>
<link rel="stylesheet" href="imReveal.css"/>
...
<div id="myCustomId">
  <img src="path/to/left/image.jpg"/>
  <img src="path/to/right/image.jpg"/>
</div>

<script> document.onload.addEventListener(()=>{
  var ir = new imReveal(window.myCustomId);
  });
</script>
```
## Demo
A live demo can be found [here](file:///home/oliver/programming-projekte/imReveal/demo.html)


## Troubleshooting
imReveal should pick up layout changes on the page and update accordingly. However if it doesn't you can manually refresh it by calling `reinit()` on the imReveal object.

## License
imReveal is licensed under the MIT license.
