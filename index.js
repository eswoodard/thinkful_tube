//user inputs search term
//user clicks submit button
//event listener listens for submit and sends query to YouTube API
//API returns search results
//results are rendered in the DOM

const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi (searchTerm, callback, newPageToken){
	const query = {
		key: 'AIzaSyDjuwzuBuJAjl-OJQLx8v-ape62xhu_LjI',
		part: 'snippet',
		q: `${searchTerm} in:name`,

		
	}
	if (newPageToken) {
		query.pageToken = newPageToken;
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
				 <a class = "video" href="https://www.youtube.com/watch?v=${result.id.videoId}"><img alt = "video" class = 'js-result-thumbnail lightbox-trigger' src = "${result.snippet.thumbnails.medium.url}"></a>
				<br><a href= "https://www.youtube.com/channel/${result.snippet.channelId}">More from ${result.snippet.channelTitle}</a></
			</div>
		</div>`;
}

/*function openLightbox() {
	$('.lightbox-trigger').on('click', event => {
		console.log("openLightbox ran");
		event.preventDefault();
		/*let video_href = $(this).attr("href");
		if ($('.lightbox').length > 0) {
		$('.content').html('<a "' + video_href + '"/>');
	}
		else {
		
			let lightbox = 
				`<div id="lightbox">
					<div id="content">
						<a class = "video" href="https://www.youtube.com/watch?v=${result.id.videoId}"></a>
					</div>
				</div>`;

			$('body').append(lightbox);
		
		});

	$('.lightbox').live('click', function () {
		$('.lightbox').hide();
	});

}*/


function displayYouTubeSearchData(data){
	const  results = data.items.map((item, index) => 
	renderResult(item));
	$('.js-search-results').html(results);
	let link = [];
	if(data.prevPageToken){
		link.push(renderPreviousLink(data.prevPageToken));
		console.log("renderPreviousLink ran")};
	link.push(renderNextLink(data.nextPageToken));
	
	let totalResults = data.pageInfo.totalResults;
	console.log(totalResults);
	
	/*$('.js-TotalResults').html(`
	<div class = "totalResults">
		<ul>
			<li>Total Results: ${totalResults}</li>
		</ul>
	</div>`);*/	
	
	
	displayLink(link);
	
	
}




/*function displayTotalResults(data) {

	let totalResults = data.pageInfo.totalResults;
	console.log(totalResults);

	$('.js-TotalResults').html(`
	<div class = "totalResults">
		<ul>
			<li>Total Results: ${totalResults}</li>
		</ul>
	</div>`);

}*/


function renderPreviousLink(token) {
	return`
	
		<div class = 'js-prev-link'>
			<a href="#" class="previous" token="${token}">< Previous</a>
		</div>
	`

}

function renderNextLink(token) {
	return`
		
		<div class = 'js-next-link'>
			<a href="#" class="next" token="${token}">Next ></a>
		</div>
	`
}



function displayLink(link) {
	console.log("displayLink Ran");
	$('.js-search-results').append(link);
	console.log(link);

}

function handleNextLink() {
	console.log('handleNextLink ran');
	$('.js-search-results').on('click', '.next', event => {
		event.preventDefault();
		const queryTarget = $('.js-query');
		const query = queryTarget.val();
		const token = $(".next").attr('token')
		getDataFromApi(query, displayYouTubeSearchData, token);
		console.log();
	});

}

function handlePrevLink() {
	console.log('handlePrevLink ran');
	$('.js-search-results').on('click', '.previous', event => {
		event.preventDefault();
		const queryTarget = $('.js-query');
		const query = queryTarget.val();
		const token = $(".previous").attr('token')
		getDataFromApi(query, displayYouTubeSearchData, token);
		console.log();
	});

}


function watchSubmit() {
	$('.js-search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		const query = queryTarget.val();
		getDataFromApi(query, displayYouTubeSearchData);
		//queryTarget.val("");

		
		
	});

	handleNextLink();
	handlePrevLink();
	//openLightbox();
	
}

watchSubmit();

//


