function portfolio(parentContainer, jsonPath) {

	var Icons = {
	  github: {
			name: 'GitHub',
			faClass: 'fab fa-github'
		},
	  gitlab: {
			name: 'GitLab',
			faClass: 'fab fa-gitlab'
		},
	  html: {
			name: 'HTML',
			faClass: 'fab fa-html5'
		},
	  css: {
			name: 'CSS',
			faClass: 'fab fa-css3-alt'
		},
	  js: {
			name: 'Javascript',
			faClass: 'fab fa-js'
		},
	  vue: {
			name: 'VueJS',
			faClass: 'fab fa-vuejs'
		},
	  node: {
			name: 'Node.js',
			faClass: 'fab fa-node-js'
		},
	  twitter: {
			name: 'Twitter',
			faClass: 'fab fa-twitter'
		},
		mysql: {
			name: 'MySQL',
			faClass: 'fas fa-database'
		},
	  linode: {
			name: 'Linode',
			faClass: 'fab fa-linode'
		},
	  linux: {
			name: 'Linux',
			faClass: 'fab fa-linux'
		},
		python: {
			name: 'Python',
			faClass: 'fab fa-python'
		},
		getName: function(i) {
			return this[i].name;
		},
		getClass: function(i) {
			return this[i].faClass;
		}
	}

	function createNode(element) {
		return document.createElement(element);
	}

	function append(parent, el) {
		return parent.appendChild(el);
	}

	var PortfolioSection = document.getElementById(parentContainer);

	fetch(jsonPath)
		.then(function(response) {
		    var contentType = response.headers.get("content-type");
		    if(contentType && contentType.includes("application/json")) {
		      return response.json();
		    }
		    throw new TypeError("Oops, we haven't got JSON!");
		 })
		 .then(function(Projects) {
				/* process your JSON further */
				Projects.map((proj) => {
					var column = createNode('div');
						column.className = 'column is-12-tablet is-4-desktop';
						append(PortfolioSection, column);

					var header = createNode('h2');
						header.className = 'title'
						header.textContent = proj.name;
						append(column, header);

					if (proj.subtitle !== '') {
						var subtitle = createNode('h3');
							subtitle.className = 'subtitle'
							subtitle.textContent = proj.subtitle;
							append(column, subtitle);
					} // endif


				  var card = createNode('div');
				    card.className = 'card portfolio-item';
				    // card.id = proj.projID;
				    append(column, card);

					var imgContainer = createNode('div');
						imgContainer.className = 'img-cont';
						append(card, imgContainer);

						var liveLink = createNode('a');
							liveLink.className = 'live-link';
							liveLink.target = '_blank';
							if (proj.liveUrl) liveLink.href = proj.liveUrl;
							else liveLink.href = proj.gitLink;
							append(imgContainer, liveLink);

						  var thumbnail = createNode('img');
						    thumbnail.className='card-thumbnail';
						    thumbnail.src = proj.image;
						    append(liveLink, thumbnail);
							var overlay = createNode('div');
								overlay.className = 'overlay';
								append(liveLink, overlay);
								var overlayTxt = createNode('div');
									overlayTxt.className = 'overlay-text';
									overlayTxt.textContent = 'View Project'
									append(overlay, overlayTxt);

					var detail = createNode('div');
						detail.className = 'card-detail';
						append(card, detail);

					var description = createNode('p');
						description.className = 'description';
				    description.textContent = proj.description;
				    append(detail, description);

				  var stack = createNode('div');
				    stack.className = 'stack';
				    proj.stack.forEach((tech) => {
							var icon = createNode('i');
								icon.className = Icons.getClass(tech);
								icon.title = Icons.getName(tech);
							stack.append(icon);
				    });
				    append(detail, stack);

				  var linkCell = createNode('a');
						linkCell.className = 'link-wrap';
						linkCell.target = '_blank';
						var gitLink = createNode('div');
							gitLink.className = 'button git-link';

					if (proj.publicSrc === true) {
							linkCell.href = proj.gitLink;
							linkCell.target = '_blank';
							var gitLinkIcon = createNode('i');
								gitLinkIcon.className = 'git-link-icon far fa-code-merge';
							var linkTxt = createNode('span');
								linkTxt.textContent = 'View the Code';
					}	else {
							linkCell.href = proj.liveUrl;
							gitLink.className += ' project';
							var gitLinkIcon = createNode('i');
								gitLinkIcon.className = 'git-link-icon fal fa-paper-plane';
							var linkTxt = createNode('span');
								linkTxt.textContent = 'View Project';
					} // endif;
						append(detail, linkCell);
				    	append(linkCell, gitLink);
								append(gitLink, gitLinkIcon);
								append(gitLink, linkTxt);
				});
			})  // end .then()
			.catch(function(error) {
				var column = createNode('div');
				column.className = 'column';
				column.style.marginTop = '0';
				column.style.paddingTop = '0';
				var Problem = createNode('p');
				Problem.style.color = 'red';
				Problem.style.fontWeight = 'bold';
				Problem.textContent = 'It looks like Jesse\'s site is having trouble grabbing his portfolio data. This can usually be fixed by using Google Chrome or Mozilla Firefox to visit his site, but feel free to contact him about it if you are feeling like the hero-type today.'
				append(PortfolioSection, column);
				append(column, Problem);
				// console.log(error);
			}); // end .catch
} // end portfolio()

portfolio('pf-container', './portfolio.json');
