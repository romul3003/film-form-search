var form = document.getElementById('movieForm');
var genreSelect = form.elements.genre;
var table = document.getElementById('movieTable');
var fromInput = form.elements.from;
var toInput = form.elements.to;


data.genres.forEach(function(item, i) {
	var option = document.createElement('option');
	option.value = item;
	option.textContent = item;
	genreSelect.appendChild(option);
});

var findBtn = form.elements.findBtn;
var resetBtn = form.elements.resetBtn;

findBtn.addEventListener('click', function() {
	console.log('findBtn click');

	var filteredMovies;
	var eyarRangeFlag = (fromInput.value >= fromInput.min && fromInput.value <= fromInput.max) && 
		(toInput.value >= toInput.min && toInput.value <= toInput.max);

	var genre = getGenre(genreSelect);

	if (genre && eyarRangeFlag ) {

		filteredMovies = filterMoviesByGenre(data.movies, genre);
		filteredMovies = rangeByYear(filteredMovies, fromInput.value, toInput.value);

		addToTable(filteredMovies, table);

	} else if (genre) {
		filteredMovies = filterMoviesByGenre(data.movies, genre);
		
		addToTable(filteredMovies, table);

	} else if ( eyarRangeFlag ) {

		filteredMovies = rangeByYear(data.movies,fromInput.value, toInput.value);

		addToTable(filteredMovies, table);
	}
});

resetBtn.addEventListener('click', function() {
	console.log('resetBtn click');

	for (var i = 1; i < table.rows.length; i++) {
		table.rows[i].remove();
		--i;
	}
});

function rangeByYear(movies, from, to) {
	var filteredByYearRange = movies.filter(function(item) {
		if (item.year >= from && item.year <= to) {
			return item;
		}
	}).sort(function(a, b) {
		return a.year - b.year;
	});

	return filteredByYearRange;
}

function addToTable(movies, table) {
	movies.forEach(function(item) {
		var row = document.createElement('tr');

		var title = document.createElement('td');
			title.textContent = item.title;

		var genres = document.createElement('td');
			genres.textContent = item.genres;

		var year = document.createElement('td');
			year.textContent = item.year;

		row.append(title, genres, year);

		table.appendChild(row);
	});
}

function getGenre(select) {
	var selectedOpt;

	for (var i = 0; i < select.length; i++) {
		if (select[i].selected) {
			selectedOpt = select[i].value;
		}
	}

	if (!selectedOpt) {
		return false;
	}

	return selectedOpt;
}

function filterMoviesByGenre(movies, genre) {
	function isGenre(item) {
		return item === genre;
	}

	var filteredByGenre = movies.filter(function(item, i, arr) {
		return item.genres.some(isGenre);
	}).sort(function(a, b) {
		return a.year - b.year;
	});

	return filteredByGenre;
}