const cells = document.getElementsByClassName('cell');
const h2 = document.querySelector('h2');
let steps = 4;
for (const cell of cells) {
	cell.addEventListener('click', () => {
		if (cell.classList.contains('empty')) {
			cell.classList.add('x');
			cell.innerHTML = 'x';
			cell.classList.remove('empty');
			zeroStep();
			steps--;
			checkWin();
		}
	});
}

const restart = document.querySelector('.restart');
restart.addEventListener('click', () => {
	const arr = [...cells];
	arr.forEach((cell) => {
		cell.classList.add('empty');
		cell.classList.remove('x');
		cell.classList.remove('o');
		cell.classList.remove('bg');
		cell.innerHTML = '';
		h2.classList.add('game');
		h2.classList.remove('end');
		steps = 4;
		return;
	});
});

function zeroStep() {
	//special-case
	if (
		cells[3].classList.contains('empty') &&
		cells[0].classList.contains('x') &&
		cells[7].classList.contains('x') &&
		cells[4].classList.contains('o') &&
		cells[1].classList.contains('empty') &&
		cells[2].classList.contains('empty') &&
		cells[5].classList.contains('empty') &&
		cells[6].classList.contains('empty') &&
		cells[8].classList.contains('empty')
	) {
		cells[6].classList.remove('empty');
		cells[6].classList.add('o');
		cells[6].innerHTML = 'o';
		return;
	}

	if (
		cells[5].classList.contains('empty') &&
		cells[2].classList.contains('x') &&
		cells[7].classList.contains('x') &&
		cells[4].classList.contains('o') &&
		cells[0].classList.contains('empty') &&
		cells[1].classList.contains('empty') &&
		cells[3].classList.contains('empty') &&
		cells[6].classList.contains('empty') &&
		cells[8].classList.contains('empty')
	) {
		cells[8].classList.remove('empty');
		cells[8].classList.add('o');
		cells[8].innerHTML = 'o';
		return;
	}
	
	if (
		cells[0].classList.contains('o') &&
		cells[1].classList.contains('empty') &&
		cells[2].classList.contains('x') &&
		cells[3].classList.contains('empty') &&
		cells[4].classList.contains('o') &&
		cells[5].classList.contains('x') &&
		cells[6].classList.contains('x') &&
		cells[7].classList.contains('empty') &&
		cells[8].classList.contains('empty')
	) {
		cells[8].classList.remove('empty');
		cells[8].classList.add('o');
		cells[8].innerHTML = 'o';
		return;
	}

	if (
		cells[1].classList.contains('empty') &&
		cells[0].classList.contains('x') &&
		cells[4].classList.contains('o') &&
		cells[8].classList.contains('x')
	) {
		cells[1].classList.remove('empty');
		cells[1].classList.add('o');
		cells[1].innerHTML = 'o';
		return;
	}

	if (
		cells[1].classList.contains('empty') &&
		cells[2].classList.contains('x') &&
		cells[4].classList.contains('o') &&
		cells[6].classList.contains('x')
	) {
		cells[1].classList.remove('empty');
		cells[1].classList.add('o');
		cells[1].innerHTML = 'o';
		return;
	}

	//defend and can-win combinations
	const warning = [
		[0, 1, 2],
		[0, 2, 1],
		[1, 2, 0], // horizontal def
		[3, 4, 5],
		[3, 5, 4],
		[4, 5, 3], // horizontal def
		[6, 7, 8],
		[6, 8, 7],
		[7, 8, 6], // horizontal def
		[0, 3, 6],
		[0, 6, 3],
		[6, 3, 0], //vertical def
		[1, 4, 7],
		[1, 7, 4],
		[4, 7, 1], //vertical def
		[2, 5, 8],
		[2, 8, 5],
		[5, 8, 2], //vertical def
		[0, 4, 8],
		[0, 8, 4],
		[4, 8, 0], //diagonal def
		[2, 4, 6],
		[2, 6, 4],
		[4, 6, 2], //diagonal def
	];
	//can win
	for (const def of warning) {
		if (
			cells[def[0]].classList.contains('o') &&
			cells[def[1]].classList.contains('o') &&
			cells[def[2]].classList.contains('empty')
		) {
			cells[def[2]].classList.remove('empty');
			cells[def[2]].classList.add('o');
			cells[def[2]].innerHTML = 'o';
			cells[def[0]].classList.add('bg');
			cells[def[1]].classList.add('bg');
			cells[def[2]].classList.add('bg');
			return;
		}
	}
	//defend
	for (const def of warning) {
		if (
			cells[def[0]].classList.contains('x') &&
			cells[def[1]].classList.contains('x') &&
			cells[def[2]].classList.contains('empty')
		) {
			cells[def[2]].classList.remove('empty');
			cells[def[2]].classList.add('o');
			cells[def[2]].innerHTML = 'o';
			return;
		}
	}

	//not attack not defend step
	const bestSteps = [4, 0, 2, 6, 8, 1, 3, 5, 7];
	for (const bestStepsNumber of bestSteps) {
		if (cells[bestStepsNumber].classList.contains('empty')) {
			cells[bestStepsNumber].classList.remove('empty');
			cells[bestStepsNumber].classList.add('o');
			cells[bestStepsNumber].innerHTML = 'o';
			return;
		}
	}
}

function checkWin() {
	const winComb = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (const win of winComb) {
		if (
			cells[win[0]].innerHTML === 'o' &&
			cells[win[1]].innerHTML === 'o' &&
			cells[win[2]].innerHTML === 'o'
		) {
			const arr = [...cells];
			arr.forEach((element) => {
				element.classList.remove('empty');
			});
			h2.innerHTML = 'Нолик победил!';
			h2.classList.add('end');
			h2.classList.remove('game');
			return;
		}
		if (steps === 0) {
			h2.innerHTML = 'Ничья';
			h2.classList.add('end');
			h2.classList.remove('game');
			const arr = [...cells];
			arr.forEach((element) => {
				element.classList.remove('empty');
			});
		}
	}
}
