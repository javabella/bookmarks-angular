angular.module('bookmarksApp', [
		'categories',
		'categories.bookmarks'
	])
	.controller('MainCtrl', function() {
		var main = this;

		main.categories = [
		  {"id": 0, "name": "Development"},
		  {"id": 1, "name": "Design"},
		  {"id": 2, "name": "Exercise"},
		  {"id": 3, "name": "Humor"}
		];

		main.currentCategory = null;
		main.editedBookmark = null;
		main.isEditing = false;
		main.isCreating = false;
		main.newBookmark = {};

		main.setCurrentCategory = function(category) {
			main.currentCategory = category;
			main.cancelEditing();
			main.cancelCreating();
		};

		main.isCurrentCategory = function(category) {
			return (main.currentCategory === null && category === 'All')
			|| (main.currentCategory !== null && main.currentCategory.name === category.name);
		};

		main.bookmarks = [
			{"id": 10, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
			{"id": 11, "title": "Egghead.io", "url": "http://angularjs.org", "category": "Development" },
			{"id": 12, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
			{"id": 13, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
			{"id": 14, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
			{"id": 15, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
			{"id": 16, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
			{"id": 17, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
			{"id": 18, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
		];

		main.shouldShowCreating = function() {
			return main.currentCategory && !main.isEditing;
		}

		main.shouldShowEditing = function() {
			return main.isEditing && !main.isCreating;
		}

		main.startEditing = function(bookmark) {
			main.isEditing = true;
			main.isCreating = false;
			main.editedBookmark = angular.copy(bookmark);
		}

		main.cancelEditing = function() {
			main.isEditing = false;
			main.editedBookmark = null;
		}

		main.startCreating = function() {
			main.isCreating = true;
			main.isEditing = false;
		}

		main.cancelCreating = function() {
			main.isCreating = false;
			main.resetCreateForm();
		}

		main.updateBookmark = function(editedBookmark) {
			var index = null;
			for (var i = 0; i < main.bookmarks.length; i++) {
				if (main.bookmarks[i].id === editedBookmark.id) {
					index = i;
					break;
				}
			}

			main.bookmarks[i] = editedBookmark;
			main.isEditing = false;
			main.editedBookmark = null;
		}

		main.createBookmark = function(bookmark) {
			bookmark.id = +(new Date());
			bookmark.category = main.currentCategory.name;
			main.bookmarks.push(bookmark);

			main.resetCreateForm();
		}

		main.resetCreateForm = function() {
			main.newBookmark = {
				id: '',
				title: '',
				url: '',
				category: ''
			};
		}

		main.removeBookmark = function(bookmark) {
			var index = null;
			for (var i = 0; i < main.bookmarks.length; i++) {
				if (main.bookmarks[i].id === bookmark.id) {
					index = i;
					break;
				}
			}

			main.bookmarks.splice(index, 1);
		}
	});
