async function init() {
	$(document).ready(() => {
		setTimeout(
			() =>
				$(
					'img[src="https://virtualpiano.net/wp-content/uploads/2020/05/Virtual-Piano-Online-Piano-Keyboard-Black-300px.png"]'
				)
					.parent()
					.parent()
					.parent()
					.remove(),
			500
		);
	});
}

init();
