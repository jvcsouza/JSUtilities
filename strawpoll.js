const callPoll = async pollId => {
	try {
		if (pollId && pollId.includes('embed')) {
			pollId = '/' + pollId.split('/')[2];
		}
		const response = await fetch('https://api.strawpoll.com/v3/polls' + pollId);
		if (!response.ok) return [[], [], 0];
		const x = await response.json();
		const options = x.poll_options;
		const ordened = [...options].sort((a, b) => b['vote_count'] - a['vote_count']);
		const mapped = ordened.map(x => ({ id: x.id, value: x.value, votes: x['vote_count'] }));
		mapped.votes = mapped.reduce((acc, x) => acc + x.votes, 0);
		return [options, mapped, mapped.votes];
	} catch (err) {
		console.error(err);
		return [[], [], 0];
	}
};

async function init() {
	$(document).ready(async () => {
		const pollId = window.location.pathname;
		if (!pollId) return;
		const [_, ordened, __] = await callPoll(pollId);

		const form = $('.strawpoll-box form');
		const div = $('<div class="strawpoll-results-jsu"><h3>Ranking: </h3></div>');

		for (let i = 0; i < ordened.length; i++) {
			const op = ordened[i];
			const percent = Math.round((op.votes / ordened.votes) * 100, 2);
			div.append(`<span data-option-id='${op.id}'>${i + 1}º - ${op.value} - ${op.votes} (${percent}%)</span>`);
		}

		form.css({ position: 'relative' });

		const btn = $('<button class="strawpoll-btn-update-results-jsu">Atualizar</button>');
		btn.on('click', async ev => {
			ev.preventDefault();
			const [_, ordened, votes] = await callPoll(pollId);
			for (let i = 0; i < ordened.length; i++) {
				const op = ordened[i];
				const percent = Math.round((op.votes / votes) * 100, 2);
				$(`span[data-option-id="${op.id}"`).html(`${i + 1}º - ${op.value} - ${op.votes} (${percent}%)`);
			}
		});

		div.append(btn);

		const reflectDiv = div.clone();

		reflectDiv.addClass('reflect');

		form.append(div);
		form.append(reflectDiv);
	});
}

init();
