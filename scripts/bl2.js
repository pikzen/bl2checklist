function ListGenerator(items, template) {
	var tmpl = document.querySelector(template)	;
	var owned = localStorage.getItem('owned') ? JSON.parse(localStorage.getItem('owned')) : {};

	var setData = function(element, name, flair, id) {
		element.querySelector('.item').setAttribute('data-weapon-id', id);
		element.querySelector('.item').setAttribute('data-weapon-name', name);
		element.querySelector('.item').setAttribute('data-weapon-owned', owned[id] ? owned[id] : false);
		element.querySelector('.item-name').textContent = name;
		element.querySelector('.item-flair').textContent = flair;
	};

	var addEvent = function(element, id) {
		(function(_element, _id) {
			element.querySelector('.got-it').addEventListener("click", function() {
				_element.setAttribute("data-weapon-owned", 
					                  !(_element.getAttribute("data-weapon-owned") == "true"));

				owned[_id] = !owned[_id]
				localStorage.setItem('owned', JSON.stringify(owned));
			});
		})(element.querySelector('.item'), id);
	}

	/*
	 * Fills the page using `template` and the data present in `items`
	 */
	this.fillPage = function() {
		// `items` has this layout
		//  root + --- + name 
		//       |     + items ----+--- item --- +--- name
		//       |                 |             +--- flair
		//       |                 |             +--- id
		//       |                 |
		//       |                 +--- item --- ...
		//       |
		//       + --- + name -----+ ...
		//       |
		//       +...

		// We first iterate on the root to get all the categories, and select the appropriate div to contain it
		// We then fill that div with copies of the template and item data.
		// Once we're done with that category, we go on to the next
		for (var key in items) {
			// Selecting the correct div
			var target = "#" + items[key].name + "-list";
			var domElement = document.querySelector(target);

			// Filling it with items
			for (var i in items[key].items) {
				var clone = document.importNode(tmpl.content, true);

				setData(clone,
						items[key].items[i].name,
						items[key].items[i].flair,
						items[key].items[i].id);

				addEvent(clone, items[key].items[i].id);

				domElement.appendChild(clone);
			}

		}
	};
}