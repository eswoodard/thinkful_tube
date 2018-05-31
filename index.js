//user inputs search term
//user clicks submit button
//event listener listens for submit and sends query to YouTube API
//API returns search results
//results are rendered in the DOM

const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi (searchTerm, callback){
	const query = {
		key: 'AIzaSyDjuwzuBuJAjl-OJQLx8v-ape62xhu_LjI',
		part: 'snippet',
		type: 'video',
		q: `${searchTerm} in:name`,
		
	}
	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
	return`
		<div class = "results">
			<div class= "results-info">
				<h3 class= 'js-result-title'>${result.snippet.title}</h3>
			</div>
			<div class="results-video">
				<a href="https://www.youtube.com/watch?v=${result.id.videoId}"> <img class = 'js-result-thumbnail' src = "${result.snippet.thumbnails.medium.url}"></a>
			</div>
		</div>`;
}

function displayYouTubeSearchData(data){
	const  results = data.items.map((item, index) => 
	renderResult(item));
	$('.js-search-results').html(results);
	
}

function watchSubmit() {
	$('.js-search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		const query = queryTarget.val();
		queryTarget.val("");
		getDataFromApi(query, displayYouTubeSearchData);
		
		
	});
}

$(watchSubmit);