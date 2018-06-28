/**
 * Service worker controller
 * Registers, installs and monitors service worker states
 * */

function sw_controller() {
	// do
}


sw_controller.prototype.register = () => {
	if ('serviceWorker' in navigator) {
		// register service worker when page loads
		self.addEventListener("load", () => {
			// register service worker
			navigator.serviceWorker.register("sw.bundle.js")
				.then((registration) => {

					let serviceWorker;
					if (registration.installing) {
						serviceWorker = registration.installing;
					} else if (registration.waiting) {
						serviceWorker = registration.waiting;
					} else if (registration.active) {
						serviceWorker = registration.active;

					}

					if (serviceWorker) {

						console.log("ServiceWorker phase 1:", serviceWorker.state);

						serviceWorker.addEventListener('statechange', function (e) {
							console.log("ServiceWorker phase 2:", e.target.state);
						});
					}

				}
			).catch(r => console.log(r));
		});

		self.addEventListener("activate", (evt) => {
			console.log("1",evt);
		})
	}

}


export default new sw_controller;